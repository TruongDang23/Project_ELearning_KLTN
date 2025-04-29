import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'
import Course from '../models/courseInfo.js'
import EmbeddedList from '../models/embedded_course.js'
import { formatVND } from '../utils/format.js'

const loadDataDashboard = catchAsync(async (req, res, next) => {
  const connection = connectMysql.promise()
  let queryPublished = `SELECT COUNT(*) AS count FROM published_course`
  let queryMonitoring = `SELECT COUNT(*) AS count FROM send_mornitor`
  let queryTerminated = `SELECT COUNT(*) AS count FROM terminated_course`

  let queryInstructors = `SELECT COUNT(*) AS count FROM user WHERE role = 'Instructor'`
  let queryCourses = `
    SELECT COUNT(*) AS count
    FROM course
    WHERE courseID IN (
      SELECT courseID FROM published_course
      UNION
      SELECT courseID FROM send_mornitor
      UNION
      SELECT courseID FROM terminated_course
    )
  `
  let queryStudents = `SELECT COUNT(*) AS count FROM user WHERE role = 'Student'`
  let queryCategories = `SELECT COUNT(*) AS count FROM categories`
  let queryReviews = `SELECT COUNT(*) AS count FROM rating`

  let queryActiveAccounts = `
    SELECT COUNT(*) AS count 
    FROM account 
    INNER JOIN user ON account.userID = user.userID 
    WHERE activity_status = 'active'
  `

  let queryBlockedAccounts = `
    SELECT COUNT(*) AS count 
    FROM account 
    INNER JOIN user ON account.userID = user.userID 
    WHERE activity_status = 'locked'
  `

  let queryTotalAmount = `SELECT SUM(amount) AS total FROM log_payments`

  try {
    const [rowsPublished] = await connection.query(queryPublished)
    const [rowsMonitoring] = await connection.query(queryMonitoring)
    const [rowsTerminated] = await connection.query(queryTerminated)
    const [rowsInstructors] = await connection.query(queryInstructors)
    const [rowsCourses] = await connection.query(queryCourses)
    const [rowsStudents] = await connection.query(queryStudents)
    const [rowsCategories] = await connection.query(queryCategories)
    const [rowsReviews] = await connection.query(queryReviews)
    const [rowsActiveAccounts] = await connection.query(queryActiveAccounts)
    const [rowsBlockedAccounts] = await connection.query(queryBlockedAccounts)
    const [rowsTotalAmount] = await connection.query(queryTotalAmount)

    const data = {
      published: rowsPublished[0]?.count || 0,
      monitoring: rowsMonitoring[0]?.count || 0,
      terminated: rowsTerminated[0]?.count || 0,
      instructors: rowsInstructors[0]?.count || 0,
      courses: rowsCourses[0]?.count || 0,
      students: rowsStudents[0]?.count || 0,
      categories: rowsCategories[0]?.count || 0,
      reviews: rowsReviews[0]?.count || 0,
      activeAccounts: rowsActiveAccounts[0]?.count || 0,
      blockedAccounts: rowsBlockedAccounts[0]?.count || 0,
      income: rowsTotalAmount[0] ? formatVND(rowsTotalAmount[0].total) : 0
    }

    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
})

// Statistics for courses by status
const getCourseStatistics = catchAsync(async (req, res, next) => {
  const connection = connectMysql.promise()
  const query = `
    SELECT 
      'Published' AS status, COUNT(*) AS count 
    FROM published_course
    UNION
    SELECT 
      'Monitoring' AS status, COUNT(*) AS count 
    FROM send_mornitor
    UNION
    SELECT 
      'Terminated' AS status, COUNT(*) AS count 
    FROM terminated_course
  `
  try {
    const [rows] = await connection.query(query)
    res.status(200).json(rows)
  } catch (error) {
    next(error)
  }
})

// Statistics for users by role
const getUserStatistics = catchAsync(async (req, res, next) => {
  const connection = connectMysql.promise()
  const query = `
    SELECT role, COUNT(*) AS count
    FROM user
    GROUP BY role
  `
  try {
    const [rows] = await connection.query(query)
    res.status(200).json(rows)
  } catch (error) {
    next(error)
  }
})

// Statistics for courses by category
const getCourseByCategory = catchAsync(async (req, res, next) => {
  const connection = connectMysql.promise()
  const query = `
    SELECT category, COUNT(*) AS count
    FROM course
    GROUP BY category
  `
  try {
    const [rows] = await connection.query(query)
    res.status(200).json(rows)
  } catch (error) {
    next(error)
  }
})

// Statistics for reviews by rating
const getRatingStatistics = catchAsync(async (req, res, next) => {
  const connection = connectMysql.promise()
  const query = `
    SELECT FLOOR(star) AS star, COUNT(*) AS count
    FROM rating
    GROUP BY FLOOR(star)
    ORDER BY star
  `
  try {
    const [rows] = await connection.query(query)
    res.status(200).json(rows)
  } catch (error) {
    next(error)
  }
})

const getPaymentSummary = catchAsync(async (req, res, next) => {
  const connection = connectMysql.promise()
  try {
    const [totalTransactions, dateRevenue, monthRevenue] = await Promise.all([
      connection.query(`SELECT COUNT(*) AS count FROM log_payments
                        WHERE MONTH(transaction_time) = MONTH(CURDATE())
                        AND YEAR(transaction_time) = YEAR(CURDATE())`),

      connection.query(`SELECT SUM(amount) AS total FROM log_payments
                        WHERE DATE(transaction_time) = CURDATE()`),

      connection.query(`SELECT SUM(amount) AS total FROM log_payments
                        WHERE MONTH(transaction_time) = MONTH(CURDATE())
                        AND YEAR(transaction_time) = YEAR(CURDATE())`)
    ])
    const data = {
      total_transactions: totalTransactions[0][0]?.count || 0,
      date_revenue: parseInt(dateRevenue[0][0]?.total) || 0,
      month_revenue: parseInt(monthRevenue[0][0]?.total) || 0
    }

    res.status(200).json(data)
  }
  catch (error) {
    next(error)
  }
})

const getListPayment = catchAsync(async (req, res, next) => {
  const connection = connectMysql.promise()
  const query = `
    SELECT * FROM log_payments
    ORDER BY transaction_time DESC
  `
  try {
    const [rows] = await connection.query(query)
    res.status(200).json(rows)
  } catch (error) {
    next(error)
  }
})

const getPaymentStatistics = catchAsync(async (req, res, next) => {
  const startDate = req.query.startDate || '2000-01-01'
  const endDate = req.query.endDate || '2000-01-31'
  const connection = connectMysql.promise()
  const queryDetailMonthRevenue = `
    SELECT
      SUM(amount) AS total_amount,
      LPAD(DAY(transaction_time), 2, '0') AS day
    FROM projectelearning.log_payments
    WHERE DATE(transaction_time) >= ?
    AND DATE(transaction_time) <= ?
    GROUP BY day
    ORDER BY day
  `
  const queryTop20UsersPaid = `
    WITH a as (
      SELECT
        sum(amount) AS total_amount,
        paid_by AS userID
      FROM projectelearning.log_payments
      WHERE DATE(transaction_time) >= ?
      AND DATE(transaction_time) <= ?
      GROUP BY paid_by
      ORDER BY total_amount DESC
      LIMIT 20
    )
    SELECT 
      a.total_amount,
        a.userID,
        u.fullname,
        u.avatar
    FROM a
    INNER JOIN user as u
    ON a.userID = u.userID`

  const queryTop20CoursePaid = `
    WITH a as (
      SELECT
        count(*) AS total_bought,
        paid_for AS course
      FROM projectelearning.log_payments
      WHERE DATE(transaction_time) >= ?
      AND DATE(transaction_time) <= ?
      GROUP BY paid_for
      ORDER BY total_bought DESC
      LIMIT 20
    )
    SELECT 
      a.total_bought,
        a.course,
        c.title
    FROM a 
    INNER JOIN course AS c
    ON a.course = c.courseID`

  try {
    const [monthRevenue, top20UserPaid, top20CoursePaid] = await Promise.all([
      connection.query(queryDetailMonthRevenue, [startDate, endDate]),
      connection.query(queryTop20UsersPaid, [startDate, endDate]),
      connection.query(queryTop20CoursePaid, [startDate, endDate])
    ])

    if (top20CoursePaid[0].length > 0) {
      const courseIDs = top20CoursePaid[0].map(row => row.course)
      const courses = await Course.find({ courseID: { $in: courseIDs } }).select('image_introduce courseID')
      top20CoursePaid[0] = top20CoursePaid[0].map(course => {
        const data = courses.find(c => c.courseID === course.course)
        return {
          ...course,
          image_introduce: data ? data.image_introduce : ''
        }
      })
    }

    res.status(200).send({
      monthRevenue: monthRevenue[0],
      top20UserPaid: top20UserPaid[0],
      top20CoursePaid: top20CoursePaid[0]
    })
  } catch (error) {
    next(error)
  }
})

const getListEmbedded = catchAsync(async (req, res, next) => {
  try {
    const data = await EmbeddedList.find().select({ url: 1, type: 1, is_embedded: 1, _id: 0 })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

export default {
  loadDataDashboard,
  getCourseStatistics,
  getUserStatistics,
  getCourseByCategory,
  getRatingStatistics,
  getPaymentSummary,
  getListPayment,
  getPaymentStatistics,
  getListEmbedded
}
