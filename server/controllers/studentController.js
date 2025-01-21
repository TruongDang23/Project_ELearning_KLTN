import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'

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
})

const update = catchAsync(async (req, res, next) => {
  // Implement here
})

const updateProgressCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

const reviewCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

const buyCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

export default {
  getAll,
  getByID,
  update,
  updateProgressCourse,
  reviewCourse,
  buyCourse
}
