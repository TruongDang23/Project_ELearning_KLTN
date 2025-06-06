/* eslint-disable no-async-promise-executor */
import catchAsync from '../utils/catchAsync.js'
import mongoose from 'mongoose'
import User from '../models/user.js'
import { formatDate, formatDateTime } from '../utils/dateTimeHandler.js'
import connectMysql from '../config/connMySql.js'
import { switchCourseStatus, getFullInfoMySQL as getInforCourse } from './courseController.js'
import axios from 'axios'
import { attachFile } from './googleCloudController.js'
import EmbeddedList from '../models/embedded_course.js'
import { checkEmailExists } from '../utils/validationData.js'
import Email from './emailController.js'

const getFullInfoMySQL = (connection, userID) => {
  return new Promise(async (resolve, reject) => {
    let query = 'SELECT userID, avatar, fullname, mail, date_of_birth, street, province, country, language\
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
                    mail = ?,
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
          inf.mail,
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

  const isMailExist = await checkEmailExists(newInfo.mail, newInfo.userID)
  // If email already exists, return an error
  if (isMailExist)
    return next({ status: 400, message: 'Email already exists' })

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
  const mysqlTransaction = connectMysql.promise()
  const emailController = new Email()
  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  try {
    await switchCourseStatus(courseID, "published", "send_mornitor", "published_course", time)
    const courseData = await getInforCourse(mysqlTransaction, courseID)
    await mysqlTransaction.query("COMMIT")
    if (courseData[0]?.mail)
      await emailController.publishCourse(courseID, courseData[0].title, courseData[0].mail)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to publish course' })
  }
})

const republishCourse = catchAsync(async (req, res, next) => {
  const courseID = req.params.id
  const time = formatDateTime(new Date())
  const mysqlTransaction = connectMysql.promise()
  const emailController = new Email()
  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  try {
    await switchCourseStatus(courseID, "published", "terminated_course", "published_course", time)
    const courseData = await getInforCourse(mysqlTransaction, courseID)
    await mysqlTransaction.query("COMMIT")
    if (courseData[0]?.mail)
      await emailController.publishCourse(courseID, courseData[0].title, courseData[0].mail)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to re-publish course' })
  }
})

// Từ chối xét duyệt khóa học dựa vào courseID
const rejectCourse = catchAsync(async (req, res, next) => {
  const courseID = req.params.id
  const reason = req.body.reason
  const time = formatDateTime(new Date())
  const mysqlTransaction = connectMysql.promise()
  const emailController = new Email()
  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  try {
    await switchCourseStatus(courseID, "created", "send_mornitor", "created_course", time)
    const courseData = await getInforCourse(mysqlTransaction, courseID)
    await mysqlTransaction.query("COMMIT")
    if (courseData[0]?.mail)
      await emailController.rejectCourse(courseID, courseData[0].title, courseData[0].mail, reason)
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
  const reason = req.body.reason
  const emailController = new Email()
  const mysqlTransaction = connectMysql.promise()

  let updReason = "UPDATE terminated_course SET reason = ? WHERE courseID = ?"
  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  try {
    await switchCourseStatus(courseID, "terminated", "published_course", "terminated_course", timeRange)
    const [rows_upd] = await mysqlTransaction.query(updReason, [reason, courseID])
    if (rows_upd.affectedRows > 0) {
      const courseData = await getInforCourse(mysqlTransaction, courseID)
      if (courseData[0]?.mail)
        await emailController.terminatedCourse(courseID, courseData[0].title, courseData[0].mail, reason)
    }

    await mysqlTransaction.query("COMMIT")
    res.status(200).send()
  }
  catch {
    await mysqlTransaction.query("ROLLBACK")
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
  let query = `UPDATE account SET activity_status = 'locked' WHERE userID = ?`
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

// Mở khóa tài khoản
const unLockUser = catchAsync(async (req, res, next) => {
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

const embeddedCourse = catchAsync(async (req, res, next) => {
  try {
    //"https://n8n.techskillup.online/webhook/summary-lecture"
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${process.env.API_N8N}/webhook/embedding-data`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res.status(200).send(response.data.output)
  } catch (error) {
    next(error)
  }
})

const addFileToEmbedded = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next({ status: 400, message: 'No file uploaded!' })
  }

  const file = req.files[0] // Lấy file đầu tiên (nếu có nhiều file)

  // Gọi hàm để upload file lên GCS
  // eslint-disable-next-line no-undef
  const bucketName = process.env.GCS_EMBEDDED_BUCKET
  const destName = file.originalname

  try {
    const fileUrl = await attachFile(bucketName, 'knowledge', file, destName)

    await EmbeddedList.create({
      url: fileUrl,
      type: 'file',
      is_embedded: false
    })
    res.status(201).send(fileUrl)
  } catch (err) {
    return next({ status: 500, message: 'Failed to upload file' })
  }
})
export default {
  getByID,
  update,
  approveCourse,
  rejectCourse,
  terminateCourse,
  lockUser,
  unLockUser,
  republishCourse,
  embeddedCourse,
  addFileToEmbedded
}
