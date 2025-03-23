/* eslint-disable no-async-promise-executor */
import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'
import mongoose from 'mongoose'
import { formatDate, formatDateTime } from '../utils/dateTimeHandler.js'
import User from '../models/user.js'
import PaymentList from '../models/logPay.js'
import { getInstructorOfCourse, getListInforEnroll, getProgress } from './courseController.js'
import { isEnrolled } from '../utils/precheckAccess.js'
import { createPayment } from './paymentController.js'
import { getFullInfoMySQL as getFullInfoMySQLCourse } from './courseController.js'
import { getUserByID } from './userController.js'
import Email from './emailController.js'

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

const buyCourseMySQL = async(connection, userID, courseID) => {
  return new Promise(async (resolve, reject) => {
    let query = "INSERT INTO enroll (courseID, userID, time) VALUES (?, ?, ?)"
    const time = formatDateTime(new Date())
    try {
      const [rowsInfo] = await connection.query(query,
        [
          courseID,
          userID,
          time
        ])

      if (rowsInfo.affectedRows !== 0) {
        resolve()
      }
      else {
        reject('Failed to buy course')
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const addEnrollCourse = async(mongoSession, userID, courseID) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findOneAndUpdate(
        { userID: userID }, // Tìm user trong MongoDB theo userID
        { $addToSet: { course_enrolled: courseID } }, // Thêm courseID vào mảng course_enrolled (tránh trùng lặp)
        { new: true, session: mongoSession } // Tùy chọn để trả về document sau khi cập nhật
      )
      resolve()
    } catch (mongoError) {
      reject(mongoError)
    }
  })
}

const addLogPayment = async(dataLog) => {
  return new Promise(async(resolve, reject) => {
    try {
      await PaymentList.create({ log: dataLog })
      resolve()
    }
    catch (error) {
      reject(error)
    }
  })
}
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
            WHERE LEFT(u.userID, 1) = 'S'
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
          WHERE LEFT(u.userID, 1) = 'S'
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

const getByID = catchAsync(async (req, res, next) => {
  // Implement here
  const userID = req.userID
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()
  let enrolled = []
  let mylearning = []

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
    if (info_mongo.course_enrolled.length != 0) {
      enrolled = await getListInforEnroll(mysqlTransaction, info_mongo.course_enrolled)

      mylearning= await Promise.all(
        enrolled.map(async (course) => {
          const progress = await getProgress(course.courseID, req.userID)
          return {
            ...course,
            progress: progress || '0.0' // Gán giá trị mặc định là 0.0 nếu không có progress
          }
        })
      )
    }

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
      course_enrolled: enrolled,
      mylearning: mylearning
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

const updateProgressCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const { courseID, lectureID } = req.params
  const userID = req.userID
  if ( userID[0] != 'I' ) //Nếu không phải là Student thì ko ghi progress
    return
  const progress = parseInt(req.body.data, 10)
  const lectureIDInt = parseInt(lectureID, 10)
  const time = formatDateTime(new Date())
  const connection = connectMysql.promise()

  await connection.query("START TRANSACTION")

  let query = "INSERT INTO learning (userID, lectureID, time, courseID, percent) VALUES (?, ?, ?, ?, ?)"

  try {
    const [rowsInfo] = await connection.query(query,
      [
        userID,
        lectureIDInt,
        time,
        courseID,
        progress
      ])

    if (rowsInfo.affectedRows !== 0) {
      res.status(200).send()
    }
    else {
      next({ status: 400, message: 'Failed when updating progress of lecture' })
    }
  }
  catch (error) {
    next(error)
  }
})

const reviewCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const { courseID, userID, message, star, time } = req.body
  if (!courseID || !userID || !message || !star || !time) {
    next({ status: 400, message: "Missing required fiedls" })
  }

  const formattedTime = formatDateTime(new Date(time))

  connectMysql.getConnection((err, connection) => {
    if (err) {
      next({ status: 500, message: "Connection failed" })
    }

    // First, check if a review with the same courseID and userID already exists
    const checkQuery =
      "SELECT * FROM rating WHERE courseID = ? AND userID = ?"
    connection.query(checkQuery, [courseID, userID], (error, results) => {
      if (error) {
        connection.release()
        next({ status: 500, message: "Failed to check review" })
      }

      if (results.length > 0) {
        // If a review exists, update it
        const updateQuery =
          "UPDATE rating SET message = ?, star = ?, time = ? WHERE courseID = ? AND userID = ?"
        connection.query(
          updateQuery,
          [message, star, formattedTime, courseID, userID],
          (updateError) => {
            connection.release()
            if (updateError) {
              next({ status: 500, message: "Failed to update review" })
            }
            res.status(201).send("Review updated successfully")
          }
        )
      } else {
        // If no review exists, insert a new one
        const insertQuery =
          "INSERT INTO rating (courseID, userID, message, star, time) VALUES (?, ?, ?, ?, ?)"
        connection.query(
          insertQuery,
          [courseID, userID, message, star, formattedTime],
          (insertError) => {
            connection.release()
            if (insertError) {
              next({ status: 500, message: "Failed to add review" })
            }
            res.status(201).send("Review added successfully")
          }
        )
      }
    })
  })
})

const buyCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const { courseID } = req.params
  const connection = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  const instructorID = await getInstructorOfCourse(courseID)
  const inf_student = await getUserByID(req.userID)
  const inf_instruc = await getUserByID(instructorID)
  const emailController = new Email()
  const enrolled = await isEnrolled(courseID, req.userID)
  if (enrolled) { //enrolled = true => Đã tham gia khóa học rồi
    res.send({ message: 'enrolled' })
  }
  else { // Chưa tham gia khóa học
    try {
      await connection.query("START TRANSACTION")
      mongoTransaction.startTransaction()
      await Promise.all([
        buyCourseMySQL(connection, req.userID, courseID), // Insert course into enroll table
        addEnrollCourse(mongoTransaction, req.userID, courseID) // Insert new course into field enrolled_course
      ])
      await connection.query("COMMIT")
      await mongoTransaction.commitTransaction()
      await emailController.sendBuyCourseSuccess(courseID, inf_student)
      await emailController.sendCourseIsBuy(courseID, inf_instruc)
      res.status(201).send({ message: 'created' })
    }
    catch (error) {
      await connection.query("ROLLBACK")
      await mongoTransaction.abortTransaction()
      next({ status: 400, message: "Failed when buying course" })
    }
  }
})

const payment = catchAsync(async (req, res, next) => {
  // Implement here
  const { courseID } = req.params
  const { cancel_url, return_url } = req.body
  const userID = req.userID
  const enrolled = await isEnrolled(courseID, req.userID)
  if (enrolled) { //enrolled = true => Đã tham gia khóa học rồi
    res.send({ message: 'enrolled' })
  }
  else { // Chưa tham gia khóa học
    const orderID = Math.floor(Math.random() * 9007199254740991) //Get random orderCode, orderCode is unique
    const mysqlTransaction = connectMysql.promise()
    const courseInfo = await getFullInfoMySQLCourse(mysqlTransaction, courseID)
    try {
      const requestPayment = {
        orderCode: orderID,
        amount: Number(courseInfo[0].price),
        description: `${userID} thanh toan ${courseID}`,
        items: [
          {
            name: courseInfo[0].title,
            quantity: 1,
            price: Number(courseInfo[0].price)
          }
        ],
        cancelUrl: cancel_url ? 'http://localhost:5173' : cancel_url,
        returnUrl: return_url ? 'http://localhost:5173' : return_url
      }
      let link = await createPayment(requestPayment)
      res.status(200).send({ message: link })
    }
    catch (error) {
      next({ status: 400, message: "Failed when create payment information" })
    }
  }
})

const payoshook = catchAsync(async (req, res, next) => {
  const response = req.body
  const connection = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()
  const str = response.data.description
  const regexUserID = /\bS\d{3}\b/
  const regexCourseID = /\bC\d{3}\b/

  const userID = str.match(regexUserID)?.[0] || null;
  const courseID = str.match(regexCourseID)?.[0] || null;

  if (response.success == true) {
    try {
      await connection.query("START TRANSACTION")
      mongoTransaction.startTransaction()
      await Promise.all([
        buyCourseMySQL(connection, userID, courseID), // Insert course into enroll table
        addEnrollCourse(mongoTransaction, userID, courseID), // Insert new course into field enrolled_course
        addLogPayment(response) // Log payment information
      ])
      await connection.query("COMMIT")
      await mongoTransaction.commitTransaction()
      res.status(201).send('created')
    }
    catch (error) {
      await connection.query("ROLLBACK")
      await mongoTransaction.abortTransaction()
      next({ status: 400, message: "Failed when buying course" })
    }
  }
  res.send()
})

export default {
  getAll,
  getByID,
  update,
  updateProgressCourse,
  reviewCourse,
  buyCourse,
  payment,
  payoshook
}
