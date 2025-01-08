/* eslint-disable no-async-promise-executor */
import catchAsync from '../utils/catchAsync.js'
import mongoose from 'mongoose'
import User from '../models/user.js'
import { formatDate } from '../utils/dateTimeHandler.js'
import connectMysql from '../config/connMySql.js'

const getFullInfoMySQL = (connection, userID) => {
  return new Promise(async (resolve, reject) => {
    let query = 'SELECT userID, avatar, fullname, date_of_birth, street, province, country, language\
                 from user where userID = ?'
    try {
      const [rowsInfo] = await connection.query(query,
        [
          userID
        ])

      if (rowsInfo.affectedRows !== 0) {
        resolve(rowsInfo)
      }
      else {
        reject("User does not contain data")
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getFullInfoMongo = async (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mongoData = await User.findOne({ userID: userID }).select()
      if (mongoData)
        resolve(mongoData)
    }
    catch (error) {
      reject(error)
    }
  })
}

const getByID = catchAsync(async (req, res, next) => {
  // Implement here
  const userID = req.userID
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()

  let info_mysql, info_mongo

  try {
    // Run both functions asynchronously
    [info_mysql, info_mongo] = await Promise.all([
      getFullInfoMySQL(mysqlTransaction, userID), // Fetch MySQL data
      getFullInfoMongo(userID) // Fetch MongoDB data
    ])

    // Commit Transactions
    await mysqlTransaction.query("COMMIT")
    await mongoTransaction.commitTransaction()
  } catch (error) {
    // Rollback Transactions in case of an error
    await mysqlTransaction.query("ROLLBACK")
    await mongoTransaction.abortTransaction()
    next(error) // Pass the error to the next middleware
  } finally {
    // End the MongoDB session
    await mongoTransaction.endSession()
  }

  // Merge data
  const mergeData = info_mysql.map(inf => {
    return {
      ...inf,
      date_of_birth: formatDate(inf.date_of_birth),

      //Câu query không có lấy activity_status. Tuy nhiên login thành công <=> activity_status = active
      activity_status: 'active',

      //Vì chưa có data về activities Admin trên MongoDB nên phải tạo mô phỏng
      social_network: info_mongo.social_networks,
      activities: []
    }
  })

  res.status(200).send(mergeData[0])
})

const update = catchAsync(async (req, res, next) => {
  // Implement here
})

// Xét duyệt khóa học dựa vào courseID
const approveCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Từ chối xét duyệt khóa học dựa vào courseID
const rejectCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Khóa khóa học dựa vào courseID
const terminateCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Q&A khóa học
const getQnA = catchAsync(async (req, res, next) => {
  // Implement here
})

// KHóa tài khoản
const blockUser = catchAsync(async (req, res, next) => {
  // Implement here
})

export default {
  getByID,
  update,
  approveCourse,
  rejectCourse,
  terminateCourse,
  getQnA,
  blockUser
}
