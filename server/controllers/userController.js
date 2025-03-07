//That controller contains same function of admin, instructor, student
import Course from '../models/courseInfo.js'
import catchAsync from '../utils/catchAsync.js'
import connectMysql from "../config/connMySql.js"
import { attachFile } from './googleCloudController.js'
import mongoose from 'mongoose'
import { createNotification } from './notificationController.js'
import { socketFunction } from '../app.js'


import { convertToAssignmentObject, convertToQuizObject } from './xlsxController.js'
import xlsx from 'xlsx'

const newQnA = catchAsync(async (req, res, next) => {
  // Implement here
  const { id, lectureID } = req.params
  const { data, url } = req.body
  const lectureIDInt = parseInt(lectureID, 10)
  const mongoTransaction = await mongoose.startSession()
  mongoTransaction.startTransaction()
  try {
    if (data.length > 0) {
      await Course.findOneAndUpdate(
        {
          courseID: id,
          'chapters.lectures.id': lectureIDInt
        },
        {
          $set: {
            'chapters.$[].lectures.$[lecture].QnA': data
          }
        },
        {
          arrayFilters: [{ 'lecture.id': lectureIDInt }],
          new: true, // Return the updated document
          session: mongoTransaction
        }
      )
      await mongoTransaction.commitTransaction()
      await createNotification('course', id, req.userID, url, 'QnA')
      socketFunction.increaseUnreadNotify(id)
      res.status(201).send()
    }
  }
  catch (error) {
    await mongoTransaction.abortTransaction()
    next(error)
  }
  finally {
    mongoTransaction.endSession()
  }
})

const updateAvatar = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next({ status: 400, message: 'No file uploaded!' })
  }

  const file = req.files[0]; // Lấy file đầu tiên (nếu có nhiều file)

  // Gọi hàm để upload file lên GCS
  // eslint-disable-next-line no-undef
  const bucketName = process.env.GCS_USER_BUCKET
  const userID = req.params.id // Sử dụng ID từ URL
  const destName = file.originalname

  try {
    const fileUrl = await attachFile(bucketName, userID, file, destName);

    res.status(201).send(fileUrl)
  } catch (err) {
    return next({ status: 500, message: 'Failed to upload avatar' })
  }
})

const countUserOfRole = (role) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }

      let query =
        'SELECT count(*) AS count FROM account WHERE LEFT(userID, 1) = ?'
      connection.query(query, [role], (error, results) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error)
          return
        }
        resolve(results[0].count)
      })
    })
  })
}

const getUserByEmail = (mail) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }
      let query = 'SELECT * FROM user WHERE mail = ?'
      connection.query(query, [mail], (error, results) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error)
          return
        }
        if (results.length == 0) resolve('null')
        else resolve(results[0])
      })
    })
  })
}

const getUserByID = async (userid) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        //Get information from mysql
        let query = `SELECT * from user WHERE userID = ?`
        connection.query(query, [userid], async (error, inf) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(error)
          }
          resolve(inf[0])
        })
      }
    })
  })
}

const getListEmailAdmin = async () => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        //Get information from mysql
        let query = `SELECT DISTINCT mail FROM user WHERE role = 'Admin' AND mail IS NOT NULL`
        connection.query(query, async (error, inf) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(error)
          }
          resolve(inf)
        })
      }
    })
  })
}

const test = catchAsync(async (req, res, next) => {
  const filePath = `../server/uploads/assignment.xlsx`
  const workbook = xlsx.readFile(filePath)
  const quizObject = convertToAssignmentObject(workbook)
  res.status(200).send(quizObject)
})

export default { newQnA, updateAvatar, test }

export {
  getUserByEmail,
  getUserByID,
  countUserOfRole,
  getListEmailAdmin
}
