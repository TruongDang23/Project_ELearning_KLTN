import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import Email from '../utils/email.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const maTK = user.MaTK
  // Remove password from output
  user.Pass = undefined
  res.status(statusCode).json({
    token,
    maTK
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
