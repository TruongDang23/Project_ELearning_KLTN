/* eslint-disable no-async-promise-executor */
import catchAsync from '../utils/catchAsync.js'
import mongoose from 'mongoose'
import User from '../models/user.js'
import { formatDate, formatDateTime } from '../utils/dateTimeHandler.js'
import connectMysql from '../config/connMySql.js'
import { getListInforPublish, switchCourseStatus } from './courseController.js'
import { checkEmailExists } from '../utils/validationData.js'

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
        {
          $set:
          {
            social_networks: inf.social_network,
            self_introduce: inf.self_introduce,
            expertise: inf.expertise,
            degrees: inf.degrees,
            projects: inf.projects,
            working_history: inf.working_history
          }
        }, // Update operation
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
  const userID = req.params.id
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()
  let published

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

    //Get information of list course published
    published = await getListInforPublish(mysqlTransaction, info_mongo.course_published)

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
      self_introduce: info_mongo.self_introduce,
      expertise: info_mongo.expertise,
      degrees: info_mongo.degrees,
      projects: info_mongo.projects,
      working_history: info_mongo.working_history,
      course_published: published
    }
  })

  res.status(200).send(mergeData[0])
})

const getAll = catchAsync(async (req, res, next) => {
  // Implement here
  const mysqlTransaction = connectMysql.promise()

  await mysqlTransaction.query("START TRANSACTION")
  let queryActive = `SELECT 
              u.userID,
              avatar,
              fullname,
              date_of_birth,
              created_time,
              street,
              province,
              country,
              role,
              activity_status
            FROM user AS u
            INNER JOIN account AS a ON u.userID = a.userID
            WHERE LEFT(u.userID, 1) = 'I'
            AND a.activity_status = 'active'`

  let queryLocked = `SELECT 
            u.userID,
            avatar,
            fullname,
            date_of_birth,
            created_time,
            street,
            province,
            country,
            role,
            activity_status
          FROM user AS u
          INNER JOIN account AS a ON u.userID = a.userID
          WHERE LEFT(u.userID, 1) = 'I'
          AND a.activity_status = 'locked'`
  try {
    const [rowsActive] = await mysqlTransaction.query(queryActive)
    const [rowsLocked] = await mysqlTransaction.query(queryLocked)
    await mysqlTransaction.query("COMMIT")
    if (rowsActive.affectedRows !== 0 && rowsLocked.affectedRows !== 0) {
      res.status(200).json({
        active: rowsActive,
        locked: rowsLocked
      })
    }
    else {
      res.status(200).json({
        active: [],
        locked: []
      })
    }
  }
  catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    next(error)
  }
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

// Gửi xét duyệt khóa học
const sendApproveCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const { courseID } = req.params
  const time = formatDateTime(new Date())
  try {
    await switchCourseStatus(courseID, "mornitor", "created_course", "send_mornitor", time)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to send approval' })
  }
})

// Hủy gửi xét duyệt khóa học
const cancelApproveCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const { courseID } = req.params
  const time = formatDateTime(new Date())
  try {
    await switchCourseStatus(courseID, "created", "send_mornitor", "created_course", time)
    res.status(200).send()
  }
  catch {
    next({ status: 500, message: 'Failed to send approval' })
  }
})

export default { getByID, getAll, update, sendApproveCourse, cancelApproveCourse }
