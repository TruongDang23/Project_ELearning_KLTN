import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import Email from '../utils/email.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import connectMysql from '../connMySql.js'

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.userID)
  const userID = user.userID
  res.status(statusCode).json({
    token,
    userID
  })
}

const signup = catchAsync(async (req, res, next) => {
  // Implement here
  // Trả về thông báo khi đăng ký thành công
  // res.status(201).json({
  //   status: 'success',
  //   message: 'Đăng ký thành công'
  // })
})

const login = catchAsync(async (req, res, next) => {
  // Implement here
  const { username, pass, role } = req.body

  //Handle role
  let roleOfUser = ''
  if (role === 'Admin')
    roleOfUser = 'A'
  else if (role === 'Student')
    roleOfUser = 'S'
  else if (role === 'Instructor')
    roleOfUser = 'I'

  connectMysql.getConnection((error, connection) => {
    if (error) res.status(503).send('Error when connect to database') //return next(new AppError("Error when connect to database", 503))
    else {
      let query = 'SELECT userID from account WHERE username = ? AND password = ? AND LEFT(userID,1) = ? AND activity_status <> "locked"'
      connection.query(query, [username, pass, roleOfUser], (error, results) => {
        connection.release()
        if (error) res.status(400).send('Syntax error') //return next(new AppError("Syntax error", 400))
        if (results.length > 0) {
          createSendToken(results[0], 200, res)
        }
        else
          res.status(404).send('User does not exit') //return next(new AppError("User does not exist", 404))
      })
    }
  })
})

const protect = catchAsync(async (req, res, next) => {
  // Implement here
})

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.Role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}

const loginWithGoogle = catchAsync(async (req, res, next) => {
  // Implement here
})

export default { signup, login, protect, restrictTo, loginWithGoogle }
