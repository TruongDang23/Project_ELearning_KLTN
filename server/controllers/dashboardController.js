import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'

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
      blockedAccounts: rowsBlockedAccounts[0]?.count || 0
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

export default {
  loadDataDashboard,
  getCourseStatistics,
  getUserStatistics,
  getCourseByCategory,
  getRatingStatistics
}
