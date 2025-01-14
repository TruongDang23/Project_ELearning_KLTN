import connectMysql from "../config/connMySql.js"

const isAdmin = async (userID) => {
  return new Promise((resolve) => {
    if (userID[0] === "A") resolve(true)
    else resolve(false)
  })
}

const isInstructorOfCourse = async (courseID, userID) => {
  return new Promise((resolve) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        resolve(false)
      }

      const query = `SELECT count(*) AS count FROM course where userID = ? and courseID = ?`
      connection.query(query, [userID, courseID], (error, data) => {
        connection.release()
        if (error) {
          resolve(false)
        }
        if (data[0].count > 0) {
          resolve(true)
        }
        resolve(false)
      })
    })
  })
}

const isEnrolledCourse = async (courseID, userID) => {
  return new Promise((resolve) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        resolve(false)
      }

      const query = `SELECT count(*) AS count FROM enroll where userID = ? and courseID = ?`
      connection.query(query, [userID, courseID], (error, data) => {
        connection.release()
        if (error) {
          resolve(false)
        }
        if (data[0].count > 0) {
          resolve(true)
        }
        resolve(false)
      })
    })
  })
}

const checkAccessCourse = (req, res, next) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const courseID = req.params.id
    const userID = req.userID
    if ((await isAdmin(userID)) == true) {
      next()
    } else if ((await isInstructorOfCourse(courseID, userID)) == true) {
      next()
    } else if ((await isEnrolledCourse(courseID, userID)) == true) {
      next()
    } else {
      next({ status: 401, message: `You don't have permission to access this course!` })
    }
  })
}

export { checkAccessCourse }