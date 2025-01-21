/* eslint-disable no-async-promise-executor */
import catchAsync from '../utils/catchAsync.js'
import mongoose from 'mongoose'
import User from '../models/user.js'
import { formatDate, formatDateTime } from '../utils/dateTimeHandler.js'
import connectMysql from '../config/connMySql.js'
import { attachFile } from './googleCloudController.js'
import { switchCourseStatus } from './courseController.js'

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

const updateInfoMySQL = (connection, inf) => {
  return new Promise(async (resolve, reject) => {
    let query = `UPDATE user 
                SET avatar = ?,
                    fullname = ?,
                    date_of_birth = ?,
                    street = ?,
                    province = ?,
                    country = ?,
                    language = ?
                WHERE userID = ?`
    try {
      const [rowsInfo] = await connection.query(query,
        [
          inf.avatar,
          inf.fullname,
          inf.date_of_birth,
          inf.street,
          inf.province,
          inf.country,
          inf.language,
          inf.userID
        ])

      if (rowsInfo.affectedRows !== 0) {
        resolve(rowsInfo)
      }
      else {
        reject("Failed to update data in mysql")
      }
    }
    catch (error) {
      reject(error)
    }
  })
}


const updateInfoMongoDB = async (session, inf) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.collection.updateOne(
        { userID: inf.userID }, // Filter condition
        { $set: { social_networks: inf.social_network } }, // Update operation
        { session: session } // Attach the session
      )
      if (result)
        resolve(result)
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
  const newInfo = req.body.data
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()

  try {
    // Run both functions asynchronously
    await Promise.all([
      updateInfoMySQL(mysqlTransaction, newInfo), // Fetch MySQL data
      updateInfoMongoDB(mongoTransaction, newInfo) // Fetch MongoDB data
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
  res.status(200).send('Update Successfully')
})

// Xét duyệt khóa học dựa vào courseID
const approveCourse = catchAsync(async (req, res, next) => {
  const courseID = req.params.id
  const time = formatDateTime(new Date())
  try {
    await switchCourseStatus(courseID, "published", "send_mornitor", "published_course", time)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to publish course' })
  }
})

const republishCourse = catchAsync(async (req, res, next) => {
  const courseID = req.params.id
  const time = formatDateTime(new Date())
  try {
    await switchCourseStatus(courseID, "published", "terminated_course", "published_course", time)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to re-publish course' })
  }
})

// Từ chối xét duyệt khóa học dựa vào courseID
const rejectCourse = catchAsync(async (req, res, next) => {
  const courseID = req.params.id
  const time = formatDateTime(new Date())
  try {
    await switchCourseStatus(courseID, "created", "send_mornitor", "created_course", time)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to reject course' })
  }
})

// Khóa khóa học dựa vào courseID
const terminateCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const courseID = req.params.id
  const timeRange = req.body.time
  try {
    await switchCourseStatus(courseID, "terminated", "published_course", "terminated_course", timeRange)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to terminated course' })
  }
})

// KHóa tài khoản
const lockUser = catchAsync(async (req, res, next) => {
  // Implement here'
  const userID = req.params.id
  const mysqlTransaction = connectMysql.promise()

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  let query = `UPDATE account SET activity_status = 'active' WHERE userID = ?`
  try {
    const [rowsInfo] = await mysqlTransaction.query(query,
      [
        userID
      ])

    await mysqlTransaction.query("COMMIT")
    if (rowsInfo.affectedRows !== 0) {
      res.status(200).send()
    }
    else {
      res.status(404).send('UserID not exist')
    }
  } catch (error) {
    // Rollback Transactions in case of an error
    await mysqlTransaction.query("ROLLBACK")
    next(error) // Pass the error to the next middleware
  }
})

export default {
  getByID,
  update,
  approveCourse,
  rejectCourse,
  terminateCourse,
  lockUser,
  republishCourse
}
