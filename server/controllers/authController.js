import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import Email from '../utils/email.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import connectMysql from '../connMySql.js'

const signToken = (id, secret, expire) => {
  return jwt.sign({ id }, secret, {
    expiresIn: expire
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.userID, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN)
  const refresh = signToken(user.userID, process.env.REFRESH_JWT_SECRET, process.env.REFRESH_JWT_EXPIRES_IN)
  
  // Lưu token vào cookie
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'strict', // Ngăn chặn CSRF
    maxAge: 15 * 60 * 1000 // Token có hiệu lực trong 15 phút
  })

  res.cookie('refresh_token', refresh, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // Refresh token có hiệu lực trong 7 ngày
  })

  res.status(statusCode).json({
    userID: user.userID
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
    if (error) next(error)
    else {
      let query = 'SELECT userID from account WHERE username = ? AND password = ? AND LEFT(userID,1) = ? AND activity_status <> "locked"'
      connection.query(query, [username, pass, roleOfUser], (error, results) => {
        connection.release()
        if (error) next(error)
        if ( results != null && results.length > 0) {
          createSendToken(results[0], 200, res)
        }
        else
          return next({ status: 404, message: "User does not exit" })
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
