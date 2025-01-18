//That controller contains same function of admin, instructor, student
import User from '../models/user.js'
import catchAsync from '../utils/catchAsync.js'
import connectMysql from "../config/connMySql.js"
import { attachFile } from './googleCloudController.js'

const updateUser = catchAsync(async (req, res, next) => {
  // Implement here
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

export default { updateUser, updateAvatar }

export {
  getUserByEmail,
  getUserByID,
  countUserOfRole
}
