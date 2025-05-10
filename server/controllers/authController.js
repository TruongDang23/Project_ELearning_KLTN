/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */
import catchAsync from '../utils/catchAsync.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import connectMysql from '../config/connMySql.js'
import User from '../models/user.js'
import TokenList from '../models/token.js'
import { getCurrentDateTime } from '../utils/dateTimeHandler.js'
import mongoose from 'mongoose'
import { getUserByEmail, countUserOfRole } from '../controllers/userController.js'
import Email from './emailController.js'
import { createWelcomeVoucher } from './voucherController.js'
import exp from 'constants'

const hashPassword = (password) => {
  // Create a SHA-512 hash
  const hash = crypto.createHash('sha512')

  // Update the hash with the password
  hash.update(password)

  // Return the hashed value as a hex string
  return hash.digest('hex')
}

const createUserMySQL = (connection, user) => {
  return new Promise(async (resolve, reject) => {
    let queryAccount =
      'INSERT INTO account (username, password, userID, activity_status) values (?, ?, ?, ?)'
    let queryUser =
      'INSERT INTO user (userID, avatar, fullname, date_of_birth, mail, created_time,\
                        street, province, country, language, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    try {
      const [rowsAccount] = await connection.query(queryAccount, [
        user.username,
        user.password,
        user.userID,
        'active'
      ])

      const [rowsUser] = await connection.query(queryUser, [
        user.userID,
        user.avatar,
        user.name,
        null,
        user.mail,
        getCurrentDateTime(),
        null,
        null,
        null,
        null,
        user.role
      ])
      if (rowsAccount.affectedRows !== 0 && rowsUser.affectedRows !== 0) {
        resolve()
      } else {
        reject('Insert failed')
      }
    } catch (error) {
      reject(error)
    }
  })
}

const createUserMongo = (transaction, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Insert a new user using Mongoose
      const data = await User.create(
        [
          {
            userID: user.userID,
            self_introduce: ' '
          }
        ],
        { session: transaction }
      )
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

const signToken = (id, secret, expire) => {
  return jwt.sign({ id }, secret, {
    expiresIn: expire
  })
}

const logout = async (req, res) => {

  const refresh = req.cookies.refresh_token

  //Clear refresh token from mongoDB
  await TokenList.findOneAndDelete({ refresh_token: refresh })

  res.cookie('access_token', '', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    path: '/', // Ensure path matches
    expires: new Date(0)
  })

  res.cookie('refresh_token', '', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    path: '/', // Ensure path matches
    expires: new Date(0)
  })

  res.status(200).send({ message: 'Logged out successfully' })
}

const createSendToken = async (userID, statusCode, res) => {
  const token = signToken(
    userID,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN
  )
  const refresh = signToken(
    userID,
    process.env.JWT_SECRET,
    process.env.REFRESH_JWT_EXPIRES_IN
  )

  await TokenList.create({ refresh_token: refresh })

  // Lưu token vào cookie
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'Strict', // Ngăn chặn CSRF
    maxAge: 60 * 60 * 1000, // Token có hiệu lực trong 60 phút
    secure: true,
    path: '/'
  })

  res.cookie('refresh_token', refresh, {
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: 10 * 24 * 60 * 60 * 1000, // Refresh token có hiệu lực trong 10 ngày
    secure: true,
    path: '/'
  })

  res.status(200).send({ userID: userID })
}

const signup = catchAsync(async (req, res, next) => {
  const { username, pass, role } = req.body
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  let roleOfUser = ''
  if (role === 'Admin') roleOfUser = 'A'
  else if (role === 'Student') roleOfUser = 'S'
  else if (role === 'Instructor') roleOfUser = 'I'
  let userID = ''
  let num
  let betweenCharacter

  //Đếm số lượng user để tạo userID tương ứng
  try {
    const count = await countUserOfRole(roleOfUser)
    num = count
  } catch (error) {
    next({ status: 500, message: error })
  }

  //Xử lý userID
  betweenCharacter = num < 10 ? '00' : num < 100 ? '0' : ''
  userID = roleOfUser + betweenCharacter + num

  let user = {
    userID: userID,
    username: username,
    password: pass,
    role: role,
    avatar: '',
    mail: `example123${userID}@domain.com`, //Email is unique
    name: ''
  }
  //Start Transaction
  await mysqlTransaction.query('START TRANSACTION')
  mongoTransaction.startTransaction()

  try {
    //Insert into Mysql
    await createUserMySQL(mysqlTransaction, user)

    //Insert into MongoDB
    await createUserMongo(mongoTransaction, user)

    await createWelcomeVoucher(mysqlTransaction, user.userID)
    await mysqlTransaction.query('COMMIT')
    await mongoTransaction.commitTransaction()
    res.status(201).send('Signup Successfully')
  } catch (error) {
    await mysqlTransaction.query('ROLLBACK')
    await mongoTransaction.abortTransaction()
    next(error)
  } finally {
    await mongoTransaction.endSession()
  }
})

const login = catchAsync(async (req, res, next) => {
  // Implement here
  const { username, pass, role } = req.body
  //Handle role
  let roleOfUser = ''
  if (role === 'Admin') roleOfUser = 'A'
  else if (role === 'Student') roleOfUser = 'S'
  else if (role === 'Instructor') roleOfUser = 'I'

  connectMysql.getConnection((error, connection) => {
    if (error) next(error)
    else {
      let query =
        'SELECT userID from account WHERE username = ? AND password = ? AND LEFT(userID,1) = ? AND activity_status <> "locked"'
      connection.query(
        query,
        [username, pass, roleOfUser],
        (error, results) => {
          connection.release()
          if (error) next(error)
          if (results != null && results.length > 0) {
            createSendToken(results[0].userID, 200, res)
          } else {
            return next({ status: 404, message: 'User does not exit' })
          }
        }
      )
    }
  })
})

const loginWithGoogle = catchAsync(async (req, res, next) => {
  // Implement here
  const { loginCredential } = req.body
  const decode = jwt.decode(loginCredential)
  const user = await getUserByEmail(decode.email)
  if (user.userID === 'null') {
    //Sign up new user with role = Student
    const mysqlTransaction = connectMysql.promise()
    const mongoTransaction = await mongoose.startSession()

    let roleOfUser = 'I'
    let userID = ''
    let num
    let betweenCharacter

    //Đếm số lượng user để tạo userID tương ứng
    try {
      const count = await countUserOfRole(roleOfUser)
      num = count
    } catch (error) {
      next({ status: 500, message: error })
    }

    //Xử lý userID
    betweenCharacter = num < 10 ? '00' : num < 100 ? '0' : ''
    userID = roleOfUser + betweenCharacter + num

    let user = {
      userID: userID,
      username: decode.email,
      password: hashPassword(decode.sub),
      role: 'Student',
      avatar: decode.picture,
      mail: decode.email, //Email is unique
      name: decode.name
    }
    //Start Transaction
    await mysqlTransaction.query('START TRANSACTION')
    mongoTransaction.startTransaction()

    try {
      //Insert into Mysql
      await createUserMySQL(mysqlTransaction, user)

      //Insert into MongoDB
      await createUserMongo(mongoTransaction, user)

      await createWelcomeVoucher(mysqlTransaction, user.userID)
      await mysqlTransaction.query('COMMIT')
      await mongoTransaction.commitTransaction()
      createSendToken(userID, 200, res)
    } catch (error) {
      await mysqlTransaction.query('ROLLBACK')
      await mongoTransaction.abortTransaction()
      next(error)
    } finally {
      await mongoTransaction.endSession()
    }
  } else {
    //If User is existing
    createSendToken(user.userID, 200, res)
  }
})

const protect = catchAsync(async (req, res, next) => {
  // Implement here
  if (req.cookies.access_token) {
    try {
      const tokenDecode = jwt.verify(
        req.cookies.access_token,
        process.env.JWT_SECRET
      )
      switch (tokenDecode.id[0]) {
      case 'A':
        req.role = 'admin'
        break
      case 'I':
        req.role = 'instructor'
        break
      case 'S':
        req.role = 'student'
        break
      }
      req.userID = tokenDecode.id
      next()
    } catch (error) {
      next({ status: 401, message: 'Unauthorized' })
    }
  } else {
    next({ status: 403, message: 'No token provided!' })
  }
})

// This function is global. Use for decode token to identify user (Anonymous, Student, Instructor, Admin)
const decodeToken = (token) => {
  if (token) {
    try {
      const tokenDecode = jwt.verify(
        token,
        process.env.JWT_SECRET
      )
      return tokenDecode.id
    } catch (error) {
      throw new Error('Invalid token')
    }
  } else {
    throw new Error('No token provided')
  }
}

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.role)) {
      return next({
        status: 403,
        message: 'You do not have permission to perform this action'
      })
    } else {
      next()
    }
  }
}

const getToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.access_token
  if (token)
    res.status(200).send(token)
  else
    next({ status: 204, message: "No token" })
})

const refreshToken = catchAsync(async (req, res, next) => {
  //refeshToken will be stored in mongoDB. Must find that token exist in db then processing
  const refresh = req.cookies.refresh_token
  const stored_token = await TokenList.findOne({ refresh_token: refresh }).select('refresh_token')

  if (refresh && stored_token.refresh_token) {
    try {
      const tokenDecode = jwt.verify(
        refresh,
        process.env.JWT_SECRET
      )

      const userID = tokenDecode.id
      const newAccessToken = signToken(
        userID,
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_IN
      )

      // Lưu token vào cookie
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        sameSite: 'Strict', // Ngăn chặn CSRF
        maxAge: 60 * 60 * 1000, // Token có hiệu lực trong 60 phút
        secure: true,
        path: '/'
      })
      res.status(200).send('Refresh token successfully')
    }
    catch (error) {
      next({ status: 500, message: 'Invalid refresh token.' })
    }
  }
  else {
    next({ status: 500, message: 'No refresh token provided.' })
  }
})

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body

  const connection = connectMysql.promise()

  const [rows] = await connection.query(
    'SELECT account.username FROM user INNER JOIN account ON user.userID = account.userID WHERE user.mail = ?',
    [email]
  )
  if (rows.length === 0) {
    return next({ status: 404, message: 'Email not found' })
  }

  const username = rows[0].username

  const newPassword = crypto.randomBytes(6).toString('hex')
  const hashedPassword = crypto.createHash('sha512').update(newPassword).digest('hex')

  await connection.query('UPDATE account SET password = ? WHERE username = ?', [hashedPassword, username])

  try {
    const emailController = new Email()
    await emailController.sendForgetPass(
      'Your New Password',
      username,
      email,
      newPassword
    )
    res.status(200).send({ message: 'A new password has been sent to your email.' })
  } catch (error) {
    return next({ status: 500, message: 'Failed to send email. Please try again later.' })
  }
})

export default { signup, login, protect, restrictTo, refreshToken, loginWithGoogle, logout, forgotPassword, getToken }
export { decodeToken }