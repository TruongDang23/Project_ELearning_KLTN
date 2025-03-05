/* eslint-disable no-async-promise-executor */
import Course from '../models/courseInfo.js'
import catchAsync from '../utils/catchAsync.js'
import mongoose from 'mongoose'
import { formatDateTime, formatDate } from '../utils/dateTimeHandler.js'
import connectMysql from '../config/connMySql.js'
import storage from '../config/connGCS.js'
import { getListEmailAdmin, getUserByID } from './userController.js'
import { putFileToStorage } from './googleCloudController.js'
import xlsx from 'xlsx'
import { convertToAssignmentObject, convertToQuizObject } from './xlsxController.js'
import fs from 'fs'
import Email from './emailController.js'

const getListCourseBaseUserID = (userID, role) => {
  return new Promise(async (resolve, reject) => {
    let query
    let mysqlTransaction = connectMysql.promise()
    await mysqlTransaction.query("START TRANSACTION")

    if (role === 'instructor') {
      query = `SELECT courseID FROM course WHERE userID = ?`
    }
    else if (role === 'student') {
      query = `SELECT courseID FROM enroll WHERE userID = ?`
    }
    else return

    try {
      const [rowsInfo] = await mysqlTransaction.query(query, [userID])

      await mysqlTransaction.query("COMMIT")
      resolve(rowsInfo)
    }
    catch (error) {
      await mysqlTransaction.query("ROLLBACK")
      reject(error)
    }
  })
}

const getListInforPublish = (connection, listID) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT c.courseID,
                        title,
                        time,
                        method,
                        fullname as instructor,
                        star,
                        raters,
                        price,
                        currency
                    FROM course as c
                    INNER JOIN published_course as pc ON c.courseID = pc.courseID
                    INNER JOIN user as u ON u.userID = c.userID
                    LEFT JOIN avg_rating as avg ON avg.courseID = c.courseID
                    WHERE c.courseID IN (?)`
    try {
      const [rowsInfo] = await connection.query(query,
        [
          listID
        ])
      const mongoData = await Course.find({ courseID: { $in: listID } }).select('courseID image_introduce')
      if (rowsInfo.affectedRows !== 0) {
        //Merge data with Mysql and MongoDB
        const mergeData = rowsInfo.map(course => {
          const data = mongoData.find(mc => mc.courseID === course.courseID)
          return {
            ...course,
            image_introduce: data ? data.image_introduce : null
          }
        })
        resolve(mergeData)
      }
      else {
        reject("This course does not contain data")
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getListInforEnroll = (connection, listID) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT c.courseID, title, fullname as instructor, star, raters, price, currency
                    FROM course as c
                    INNER JOIN published_course as pc ON c.courseID = pc.courseID
                    INNER JOIN user as u ON u.userID = c.userID
                    INNER JOIN avg_rating as avg ON avg.courseID = c.courseID
                    WHERE c.courseID IN (?)`
    try {
      const [rowsInfo] = await connection.query(query,
        [
          listID
        ])
      const mongoData = await Course.find({ courseID: { $in: listID } }).select('courseID image_introduce')
      if (rowsInfo.affectedRows !== 0) {
        //Merge data with Mysql and MongoDB
        const mergeData = rowsInfo.map(course => {
          const data = mongoData.find(mc => mc.courseID === course.courseID)
          return {
            ...course,
            image_introduce: data ? data.image_introduce : null
          }
        })
        resolve(mergeData)
      }
      else {
        reject("This course does not contain data")
      }
    }
    catch (error) {
      reject(error)
    }
  })
}


const getInstructorOfCourse = (courseID) => {
  return new Promise(async (resolve, reject) => {
    const connection = connectMysql.promise()
    let query = `SELECT c.courseID,
                        c.userID as instructor
                  FROM course as c
                  WHERE c.courseID = ?`
    try {
      const [rowsInfo] = await connection.query(query,
        [
          courseID
        ])
      if (rowsInfo.affectedRows !== 0) {
        resolve(rowsInfo[0].instructor)
      }
      else {
        reject("This course does not contain data")
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getFullInfoMySQL = (connection, courseID) => {
  return new Promise(async (resolve, reject) => {
    let query =
      "SELECT c.courseID,\
                u.fullname AS instructor,\
                type_of_course,\
                title,\
                method,\
                c.language,\
                price,\
                currency,\
                program,\
                category,\
                course_for,\
                status,\
                num_lecture,\
                avg.star,\
                num.number_enrolled\
                FROM course AS c\
                LEFT JOIN user AS u ON c.userID = u.userID\
                LEFT JOIN avg_rating AS avg ON c.courseID = avg.courseID\
                LEFT JOIN (SELECT courseID, count(*) AS number_enrolled\
                          FROM enroll\
                          GROUP BY courseID) AS num\
                          ON num.courseID = c.courseID\
                WHERE c.courseID = ?"
    try {
      const [rowsInfo] = await connection.query(query,
        [
          courseID
        ])
      if (rowsInfo.affectedRows !== 0) {
        resolve(rowsInfo)
      }
      else {
        reject("This course does not contain data")
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getFullInfoMongo = (courseID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mongoData = await Course.find({ courseID: { $in: courseID } }).select()

      if (mongoData) {
        resolve(mongoData)
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getReview = (courseID) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }

      const query = `SELECT u.fullname AS reviewerName,
                            u.avatar   AS avatar, 
                            message, 
                            star, 
                            time AS date
                    FROM rating AS r
                    LEFT JOIN user AS u ON r.userID = u.userID
                    WHERE courseID = ?`
      connection.query(query, [courseID], (error, reviews) => {
        connection.release()
        if (error) {
          reject(error)
        }

        const finalData = reviews.map((rv) => {
          return {
            ...rv,
            date: formatDateTime(rv.date)
          }
        })
        resolve(finalData)
      })
    })
  })
}

const getTotalVideo = (courseID) => {
  return new Promise(async (resolve, reject) => {
    const [files] = await storage
      .bucket(process.env.GCS_COURSE_BUCKET)
      .getFiles({ prefix: courseID })

    let totalVideo = 0

    for (const file of files) {
      if (file.name.endsWith(".mp4")) {
        totalVideo += 1
      }
    }
    resolve(totalVideo)
  })
}

const getNewCourseID = async() => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }

      const query = `SELECT CONCAT('C', LPAD(SUBSTRING(MAX(courseID), 2) + 1, 3, '0')) AS newCourseID
                      FROM course`
      connection.query(query, (error, data) => {
        connection.release()
        if (error) {
          return reject(error)
        }
        resolve(data[0].newCourseID)
      })
    })
  })
}

const getCourseWithParams = (connection, params) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT c.courseID,
    u.fullname AS instructor,
    type_of_course,
    title,
    method,
    c.language,
    price,
    currency,
    program,
    category,
    course_for,
    status,
    num_lecture as num_lectures,
    avg.star,
    avg.raters as number_reviews
    FROM course AS c
    LEFT JOIN user AS u ON c.userID = u.userID
    LEFT JOIN avg_rating AS avg ON c.courseID = avg.courseID
    WHERE status = 'published'
            -- Find on search box  
            and (
              u.fullname like ? or
              title like ? or
              course_for like ?
            )
            -- Find on filter
            and (
                (avg.star >= ? or avg.star is null) and
                c.language like ? and 
                method like ? and 
                price >= ? and 
                program like ?
            )
            -- Find on category
            and (
                category like ?
            )
    ORDER BY star DESC
    LIMIT ?`

    let queryParams = [
      `%${params.title}%`,
      `%${params.title}%`,
      `%${params.title}%`,
      params.ratings,
      `%${params.language}%`,
      `%${params.method}%`,
      params.price,
      `%${params.program}%`,
      `%${params.category}%`,
      params.limit
    ]

    try {
      const [rowsInfo] = await connection.query(query, queryParams)
      if (rowsInfo.affectedRows !== 0) {
        resolve(rowsInfo)
      }
      else {
        reject("Error when get course for welcome page")
      }
    }
    catch (error) {
      reject(error)
    }

  })
}

const getProgress = async (courseID, userID) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }

      const query = ` SELECT FORMAT(SUM(percent)/num_lecture,1) AS progress
        from course inner join (
          SELECT lectureID, courseID, MAX(percent) AS percent 
            FROM learning
            where userID = ?
          group by lectureID, courseID
        ) AS list_progress
        ON course.courseID = list_progress.courseID
        where course.courseID = ?`
      connection.query(query, [userID, courseID], (error, data) => {
        connection.release()
        if (error) {
          return reject(error)
        }
        resolve(data[0].progress)
      })
    })
  })
}

const getListLearning = async (courseID, userID) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }

      const query = ` SELECT lectureID, MAX(percent) AS progress FROM learning
        where courseID = ? and userID = ?
        group by lectureID 
        order by lectureID asc`
      connection.query(query, [courseID, userID], (error, learning) => {
        connection.release()
        if (error) {
          return reject(error)
        }
        resolve(learning)
      })
    })
  })
}

const loadOriginQnA = (courseID, lectureID) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Query the course document by courseID and lectureID
      const course = await Course.findOne(
        {
          courseID,
          "chapters.lectures.id": lectureID // Match the lectureID within nested chapters
        },
        {
          "chapters.$": 1 // Use positional projection to include only the matching chapter
        }
      )

      if (course) {
        const chapter = course.chapters[0] // Get the matched chapter
        const lecture = chapter.lectures.find((lec) => lec.id == lectureID) // Find the specific lecture
        if (lecture && lecture.QnA) {
          resolve(lecture.QnA)// Return the QnA array
        }
      }

      resolve([])
    }
    catch (error) {
      reject(error)
    }
  })
}

const switchCourseStatus = async (courseID, to_status, delete_db, insert_db, time) => {
  return new Promise(async (resolve, reject) => {
    const mysqlTransaction = connectMysql.promise()
    await mysqlTransaction.query("START TRANSACTION")

    //Update Status of course
    let updStatus = "UPDATE course SET status = ? WHERE courseID = ?"
    let deleteCourse = "DELETE FROM ?? WHERE courseID = ?"
    let insertCourse = ""
    let rows_ins = 0

    if (insert_db === 'terminated_course') {
      const to_time = time[0]
      const end_time = time[1] == "" ? null : time[1]

      insertCourse = "INSERT INTO ?? (courseID, to_time, end_time)\
        VALUES (?, ?, ?)"
      rows_ins = await mysqlTransaction.query(insertCourse, [insert_db, courseID, to_time, end_time])
    }
    else {
      insertCourse = "INSERT INTO ?? (courseID, time)\
        VALUES (?, ?)"
      rows_ins = await mysqlTransaction.query(insertCourse, [insert_db, courseID, time])
    }

    const [rows_upd] = await mysqlTransaction.query(updStatus, [to_status, courseID])
    const [rows_del] = await mysqlTransaction.query(deleteCourse, [delete_db, courseID])
    //const [rows_ins] = await mysqlTransaction.query(insertCourse, [insert_db, courseID, time])

    if (rows_upd.affectedRows == 0 || rows_del.affectedRows == 0 || rows_ins.affectedRows == 0) {
      await mysqlTransaction.query("ROLLBACK")
      reject(false)
    }
    else {
      await mysqlTransaction.query("COMMIT")
      resolve(true)
    }
  })
}

const getPendingCourseAdmin = (mysqlTransaction) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT 
                  s.courseID,
                  title,
                  method,
                  program,
                  u.fullname AS teacher,
                  s.time
                FROM send_mornitor AS s
                LEFT JOIN course AS c 
                  ON s.courseID = c.courseID
                LEFT JOIN user AS u 
                  ON c.userID = u.userID
                ORDER BY s.time DESC`
    try {
      const [rowCourses] = await mysqlTransaction.query(query)
      if (rowCourses.length > 0) {
        const courseIDs = rowCourses.map((course) => course.courseID)
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce")

        const mergeData = rowCourses.map((course) => {
          const data = mongoData.find(
            (mc) => mc.courseID === course.courseID
          )
          return {
            ...course,
            time: formatDate(course.time),
            image_introduce: data ? data.image_introduce : null
          }
        })
        resolve(mergeData)
      }
      else {
        resolve([])
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getPublishedCourseAdmin = (mysqlTransaction) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT 
                  s.courseID,
                  title,
                  method,
                  program,
                  u.fullname AS teacher,
                  s.time
                FROM published_course AS s
                LEFT JOIN course AS c 
                  ON s.courseID = c.courseID
                LEFT JOIN user AS u 
                  ON c.userID = u.userID
                ORDER BY s.time DESC`
    try {
      const [rowCourses] = await mysqlTransaction.query(query)
      if (rowCourses.length > 0) {
        const courseIDs = rowCourses.map((course) => course.courseID)
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce")

        const mergeData = rowCourses.map((course) => {
          const data = mongoData.find(
            (mc) => mc.courseID === course.courseID
          )
          return {
            ...course,
            time: formatDate(course.time),
            image_introduce: data ? data.image_introduce : null
          }
        })
        resolve(mergeData)
      }
      else {
        resolve([])
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getTerminatedCourseAdmin = async(mysqlTransaction) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT 
                  s.courseID,
                  title,
                  method,
                  program,
                  u.fullname AS teacher,
                  s.to_time,
                  s.end_time
                FROM terminated_course AS s
                LEFT JOIN course AS c 
                  ON s.courseID = c.courseID
                LEFT JOIN user AS u 
                  ON c.userID = u.userID
                ORDER BY s.to_time DESC, s.end_time ASC`
    try {
      const [rowCourses] = await mysqlTransaction.query(query)
      if (rowCourses.length > 0) {
        const courseIDs = rowCourses.map((course) => course.courseID)
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce")

        const mergeData = rowCourses.map((course) => {
          const data = mongoData.find(
            (mc) => mc.courseID === course.courseID
          )
          return {
            ...course,
            to_time: formatDate(course.to_time),
            end_time: course.end_time
              ? formatDate(course.end_time)
              : "permanently",
            image_introduce: data ? data.image_introduce : null
          }
        })
        resolve(mergeData)
      }
      else {
        resolve([])
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getCreatedCourse = async(mysqlTransaction, userID) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT course.courseID, 
                  title, 
                  method, 
                  program, 
                  category, 
                  time,
                  price,
                  currency,
                  userID
                  FROM course 
                  INNER JOIN created_course AS c ON course.courseID = c.courseID
                  WHERE userID = ?`
    try {
      const [rowCourses] = await mysqlTransaction.query(query, [userID])
      if (rowCourses.length > 0) {
        const courseIDs = rowCourses.map((course) => course.courseID)
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce keywords")

        const mergeData = rowCourses.map((course) => {
          const data = mongoData.find(
            (mc) => mc.courseID === course.courseID
          )
          return {
            ...course,
            time: formatDateTime(course.time),
            image_introduce: data ? data.image_introduce : null,
            keywords: data.keywords
          }
        })
        resolve(mergeData)
      }
      else {
        resolve([])
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getPendingCourse = async(mysqlTransaction, userID) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT course.courseID, 
                  title, 
                  method, 
                  program, 
                  category, 
                  time,
                  price,
                  currency,
                  userID
                  FROM course 
                  INNER JOIN send_mornitor AS s ON course.courseID = s.courseID
                  WHERE userID = ?`
    try {
      const [rowCourses] = await mysqlTransaction.query(query, [userID])
      if (rowCourses.length > 0) {
        const courseIDs = rowCourses.map((course) => course.courseID)
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce keywords")

        const mergeData = rowCourses.map((course) => {
          const data = mongoData.find(
            (mc) => mc.courseID === course.courseID
          )
          return {
            ...course,
            time: formatDateTime(course.time),
            image_introduce: data ? data.image_introduce : null,
            keywords: data.keywords
          }
        })
        resolve(mergeData)
      }
      else {
        resolve([])
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getPublishedCourse = async(mysqlTransaction, userID) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT course.courseID, 
                  title, 
                  method, 
                  program, 
                  category, 
                  time,
                  price,
                  currency,
                  userID
                  FROM course 
                  INNER JOIN published_course AS p ON course.courseID = p.courseID
                  WHERE userID = ?`
    try {
      const [rowCourses] = await mysqlTransaction.query(query, [userID])
      if (rowCourses.length > 0) {
        const courseIDs = rowCourses.map((course) => course.courseID)
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce keywords")

        const mergeData = rowCourses.map((course) => {
          const data = mongoData.find(
            (mc) => mc.courseID === course.courseID
          )
          return {
            ...course,
            time: formatDateTime(course.time),
            image_introduce: data ? data.image_introduce : null,
            keywords: data.keywords
          }
        })
        resolve(mergeData)
      }
      else {
        resolve([])
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getTerminatedCourse = async(mysqlTransaction, userID) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT course.courseID, 
                  title, 
                  method, 
                  program, 
                  category, 
                  to_time,
                  end_time,
                  price,
                  currency,
                  userID
                  FROM course 
                  INNER JOIN terminated_course AS c ON course.courseID = c.courseID
                  WHERE userID = ?`
    try {
      const [rowCourses] = await mysqlTransaction.query(query, [userID])
      if (rowCourses.length > 0) {
        const courseIDs = rowCourses.map((course) => course.courseID)
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce keywords")

        //Merge data with Mysql and MongoDB
        const mergeData = rowCourses.map((course) => {
          const data = mongoData.find(
            (mc) => mc.courseID === course.courseID
          )
          return {
            ...course,
            to_time: course.to_time ? formatDateTime(course.to_time) : 'permanently',
            end_time: course.end_time ? formatDateTime(course.end_time) : 'permanently',
            image_introduce: data ? data.image_introduce : null,
            keywords: data.keywords
          }
        })
        resolve(mergeData)
      }
      else {
        resolve([])
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getAllCourses = catchAsync(async (req, res, next) => {
  // Implement here
  const userID = req.userID
  const role = req.role
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()

  let created, pending, published, terminated
  switch (role) {
  case 'admin':
    try {
      [pending, published, terminated] = await Promise.all([
        getPendingCourseAdmin(mysqlTransaction),
        getPublishedCourseAdmin(mysqlTransaction),
        getTerminatedCourseAdmin(mysqlTransaction)
      ])
      // Commit Transactions
      await mysqlTransaction.query("COMMIT")
      await mongoTransaction.commitTransaction()
    } catch (error) {
      // Rollback Transactions in case of an error
      await mysqlTransaction.query("ROLLBACK")
      await mongoTransaction.abortTransaction()
      next(error)
    } finally {
      // End the MongoDB session
      await mongoTransaction.endSession()
    }

    res.status(200).json({
      pending,
      published,
      terminated
    })
    break;

  case 'instructor':
    try {
      [created, pending, published, terminated] = await Promise.all([
        getCreatedCourse(mysqlTransaction, userID),
        getPendingCourse(mysqlTransaction, userID),
        getPublishedCourse(mysqlTransaction, userID),
        getTerminatedCourse(mysqlTransaction, userID)
      ])
      // Commit Transactions
      await mysqlTransaction.query("COMMIT")
      await mongoTransaction.commitTransaction()
    } catch (error) {
      // Rollback Transactions in case of an error
      await mysqlTransaction.query("ROLLBACK")
      await mongoTransaction.abortTransaction()
      next(error)
    } finally {
      // End the MongoDB session
      await mongoTransaction.endSession()
    }

    res.status(200).json({
      created,
      pending,
      published,
      terminated
    })
    break;
  }
})

const getCourseById = catchAsync(async (req, res, next) => {
  // Implement here
  const courseID = req.params.id
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()

  let info_mysql, info_mongo, reviews, videos

  try {
    // Run both functions asynchronously
    [info_mysql, info_mongo, reviews, videos] = await Promise.all([
      getFullInfoMySQL(mysqlTransaction, courseID), // Fetch MySQL data
      getFullInfoMongo(courseID), // Fetch MongoDB data
      getReview(courseID),
      getTotalVideo(courseID)
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
  const mergeData = info_mysql.map(course => {
    return {
      ...course,
      videos: videos,
      review: reviews,
      image_introduce: info_mongo[0].image_introduce,
      video_introduce: info_mongo[0].video_introduce,
      keywords: info_mongo[0].keywords,
      targets: info_mongo[0].targets,
      requirements: info_mongo[0].requirements,
      chapters: info_mongo[0].chapters
    }
  })

  res.status(200).send(mergeData[0])
})

// Tìm kiếm khóa học
const searchCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const mysqlTransaction = connectMysql.promise()
  const {
    category = '',
    title = '',
    ratings = 0,
    language = '',
    method = '',
    program = '',
    price = 0,
    limit = 9,
    page = 'welcome'
  } = req.query

  const queryObject = {
    category,
    title,
    ratings: Number(ratings) || 0,
    language,
    method,
    program,
    price: Number(price) || 0,
    limit: Number(limit) || 9,
    page
  }
  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  try {
    const info_mysql = await getCourseWithParams(mysqlTransaction, queryObject)
    // Use Promise.all to handle async operations inside map
    const mergeData = await Promise.all(
      info_mysql.map(async (course) => {
        const info_mongo = await getFullInfoMongo(course.courseID)
        if (queryObject.page === 'welcome') {
          return {
            ...course,
            image_introduce: info_mongo[0] ? info_mongo[0].image_introduce : null
          }
        }
        else if (queryObject.page === 'searchcourse') {
          return {
            ...course,
            image_introduce: info_mongo[0] ? info_mongo[0].image_introduce : null,
            keywords: info_mongo[0] ? info_mongo[0].keywords : [],
            targets: info_mongo[0] ? info_mongo[0].targets : []
          }
        }
      })
    )
    await mysqlTransaction.query("COMMIT")
    res.status(200).send(mergeData)
  }
  catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    next(error)
  }

})

// Thông tin truy cập vào khóa học
const accessCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const courseID = req.params.id
  const userID = req.userID
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()

  let info_mysql, info_mongo, reviews, videos, progress, list_learning

  try {
    // Run both functions asynchronously
    [info_mysql, info_mongo, reviews, videos, progress, list_learning] = await Promise.all([
      getFullInfoMySQL(mysqlTransaction, courseID), // Fetch MySQL data
      getFullInfoMongo(courseID), // Fetch MongoDB data
      getReview(courseID),
      getTotalVideo(courseID),
      getProgress(courseID, userID),
      getListLearning(courseID, userID)
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
  const mergeData = info_mysql.map(course => {
    return {
      ...course,
      progress: progress ? progress : 0,
      videos: videos,
      review: reviews,
      keywords: info_mongo[0].keywords,
      chapters: info_mongo[0].chapters,
      learning: list_learning
    }
  })

  res.status(200).send(mergeData[0])
})

//Upload file media
const uploadFileGCS = catchAsync(async (req, res, next) => {
  const files = req.files || []
  if (files)
    res.status(201).send('upload file successfully')
  else next({ status: 500, message: 'Failed to upload files' })
})

// Tạo mới khóa học
const createCourse = catchAsync(async (req, res, next) => {
  // Implement here
  const structure = req.body.data
  const userID = req.userID
  const courseID = await getNewCourseID()
  const bucketName = "e-learning-bucket"
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()
  const time = formatDateTime(new Date())
  const emailController = new Email()
  let list_email = await getListEmailAdmin()
  list_email = list_email.map(row => row.mail)

  //Upload file video_introduce & image_introduce
  try {
    const extendVideo = structure.video_file.slice(-3)
    const extendImage = structure.image_file.slice(-3)

    const urlVideo = await putFileToStorage(
      bucketName,
      `${courseID}`, // C045
      `../server/uploads/video_introduce-${userID}.${extendVideo}`, // server/uploads/introduce-I000.jpg
      `video_introduce.${extendVideo}` // introduce.jpg
    )
    const urlImage = await putFileToStorage(
      bucketName,
      `${courseID}`, // C045
      `../server/uploads/image_introduce-${userID}.${extendImage}`, // server/uploads/introduce-I000.jpg
      `image_introduce.${extendImage}` // introduce.jpg
    )

    structure.video_introduce = urlVideo // Update source = url to GCS (used in mongoDB)
    structure.image_introduce = urlImage
  } catch (error) {
    next({ status: 500, message: error })
    return
  }

  await Promise.all(
    // Upload all media files of course content
    structure.chapters.map(async (obj, chapterIndex) => {
      await Promise.all(
        obj.lectures.map(async (lecture) => {
          const index = (chapterIndex + 1).toString().padStart(2, '0')
          const extendFile = lecture.filename.split('.').pop()
          let quizObject
          let assignObject
          let workbook
          let filePath

          switch (lecture.type) {
          case "quiz":
            try {
              filePath = `../server/uploads/${lecture.filename}-${userID}.${extendFile}`
              workbook = xlsx.readFile(filePath)
              quizObject = convertToQuizObject(workbook)
              lecture.passpoint = quizObject.passpoint
              lecture.during_time = quizObject.during_time
              lecture.title = quizObject.title
              lecture.questions = quizObject.questions
              lecture.type = quizObject.type

              // Delete the file using fs.unlink()
              try {
                fs.unlinkSync(filePath)
              } catch (err) {
                next(err)
                return
              }
            } catch (error) {
              next(error)
              return
            }
            break;

          case "assignment":
            try {
              filePath = `../server/uploads/${lecture.filename}-${userID}.${extendFile}`
              workbook = xlsx.readFile(filePath)
              assignObject = convertToAssignmentObject(workbook)
              lecture.topics = assignObject.topics

              // Delete the file using fs.unlink()
              try {
                fs.unlinkSync(filePath)
              } catch (err) {
                next(err)
                return
              }
            } catch (error) {
              next(error)
              return
            }
            break;

          default: //case type = file OR type = video
            try {
              const url = await putFileToStorage(
                bucketName,
                `${courseID}/CT${index}`, // C045/CT01
                `../server/uploads/${lecture.filename}-${userID}.${extendFile}`, // server/uploads/introduce-I000.jpg
                `${lecture.name}.${extendFile}` // introduce.jpg
              );
              lecture.source = url // Update source = url to GCS (used in mongoDB)
            } catch (error) {
              next({ status: 500, message: error })
              return
            }
          }
        })
      )
    })
  )

  try {
    await mysqlTransaction.query("START TRANSACTION")
    mongoTransaction.startTransaction()

    //Insert course structure into mongoDB
    await Course.collection.insertOne(
      {
        courseID: courseID,
        image_introduce: structure.image_introduce,
        video_introduce: structure.video_introduce,
        keywords: structure.keywords,
        targets: structure.targets,
        requirements: structure.requirements,
        chapters: structure.chapters
      },
      {
        session: mongoTransaction
      }
    )

    //Insert course information into table course
    let queryInsertNewCourse = `INSERT INTO course (
                courseID,
                type_of_course,
                title,
                method,
                language,
                price,
                currency,
                program,
                category,
                course_for,
                status,
                num_lecture,
                userID)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `

    //Insert course information into table created_course
    let queryInsertCreateCourse = `INSERT INTO created_course (
                courseID,
                time)
              VALUES (?, ?)`

    const [rowscourse] = await mysqlTransaction.query(queryInsertNewCourse,
      [
        courseID,
        structure.type_of_course,
        structure.title,
        structure.method,
        structure.language,
        structure.price,
        structure.currency,
        structure.program,
        structure.category,
        structure.course_for,
        'created',
        structure.num_lecture,
        userID
      ])

    const [rowscreated_course] = await mysqlTransaction.query(queryInsertCreateCourse,
      [
        courseID,
        time
      ])

    if (rowscourse.affectedRows == 0 || rowscreated_course.affectedRows == 0 )
    {
      await mysqlTransaction.query("ROLLBACK")
      await mongoTransaction.abortTransaction()
      next({ status: 204, message: "No course has created" })
    }
    else
    {
      await mysqlTransaction.query("COMMIT")
      await mongoTransaction.commitTransaction()

      if (list_email.length != 0 )
        await emailController.sendCreateCourse(courseID, structure.title, list_email)

      res.status(201).send()
    }
  }
  catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    await mongoTransaction.abortTransaction()
    next(error)
  }
  finally {
    mongoTransaction.endSession()
  }
})

// cập nhật thông tin khóa học
const updateCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

const getQnA = catchAsync(async (req, res, next) => {
  const { id, lectureID } = req.params
  const lectureQA = await loadOriginQnA(id, lectureID)
  const lectures = (lectureQA) ? lectureQA : [] //Avoid case lectureQA is empty
  if (lectures.length > 0)
  {
    const QA = await Promise.all(
      lectures.map(async (lecture) => {
        // Convert the lecture to a plain object
        const lectureData = lecture.toObject()

        // Fetch information for the questioner
        const infQuestion = await getUserByID(lectureData.questionerID)
        // Process responses
        const responses = lectureData.responses && lectureData.responses.length > 0
          ? await Promise.all(
            lectureData.responses.map(async (response) => {
              const infResponse = await getUserByID(response.responseID)
              return {
                ...response,
                name: infResponse.fullname || "Unknown",
                avatar: infResponse.avatar || "default-avatar.png"
              }
            })
          )
          : []

        return {
          ...lectureData, // Use the plain object without Mongoose metadata
          name: infQuestion.fullname || "Unknown",
          avatar: infQuestion.avatar || "default-avatar.png",
          responses
        }
      })
    )
    res.status(200).send(QA)
  }
  else {
    res.status(200).send([])
  }
})

export default {
  getAllCourses,
  getCourseById,
  searchCourse,
  accessCourse,
  createCourse,
  updateCourse,
  uploadFileGCS,
  getQnA
}

export { getListInforPublish, switchCourseStatus, getListInforEnroll, getListCourseBaseUserID, getProgress, getFullInfoMySQL, getInstructorOfCourse }
