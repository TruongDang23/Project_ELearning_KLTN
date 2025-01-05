import Course from '../models/courseInfo.js'
import catchAsync from '../utils/catchAsync.js'
import mongoose from 'mongoose'
import User from '../models/user.js'
import { formatDate } from '../utils/dateTimeHandler.js'
import connectMysql from '../connMySql.js'

const getAllCourses = catchAsync(async (req, res, next) => {
  // Implement here
})

const getCourseById = catchAsync(async (req, res, next) => {
  // Implement here
  const courseID = req.params.id
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()

  let info_mysql, info_mongo

  try {
    // Run both functions asynchronously
    [info_mysql, info_mongo] = await Promise.all([
      getFullInfoMySQL(mysqlTransaction, courseID), // Fetch MySQL data
      getFullInfoMongo(courseID), // Fetch MongoDB data
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

// Tìm kiếm khóa học
const searchCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Thông tin truy cập vào khóa học
const accessCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Tạo mới khóa học
const createCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// cập nhật thông tin khóa học
const updateCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

export default {
  getAllCourses,
  getCourseById,
  searchCourse,
  accessCourse,
  createCourse,
  updateCourse
}
