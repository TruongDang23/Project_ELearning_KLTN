/* eslint-disable no-async-promise-executor */
import Course from '../models/courseInfo.js'
import catchAsync from '../utils/catchAsync.js'
import mongoose from 'mongoose'
import { formatDateTime } from '../utils/dateTimeHandler.js'
import connectMysql from '../config/connMySql.js'
import storage from '../config/connGCS.js'

const getListInforPublish = (connection, listID) => {
  return new Promise(async (resolve, reject) => {
    let query = `SELECT c.courseID, title, time, method
                    FROM course as c
                    INNER JOIN published_course as pc ON c.courseID = pc.courseID
                    WHERE c.courseID IN (?)`
    try {
      const [rowsInfo] = await connection.query(query,
        [
          listID
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
      .bucket("e-learning-bucket")
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

export { getListInforPublish }
