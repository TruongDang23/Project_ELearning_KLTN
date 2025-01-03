import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import Email from '../utils/email.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import connectMysql from '../connMySql.js'
import connectMongo from '../connMongo.js'
import User from '../models/user.js'
import { getCurrentDateTime } from '../utils/dateTimeHandler.js'
import mongoose from 'mongoose'

const createUserMySQL = (connection, user) => {
  return new Promise(async (resolve, reject) => {
    let queryAccount = 'INSERT INTO account (username, password, userID, activity_status) values (?, ?, ?, ?)'
    let queryUser = 'INSERT INTO user (userID, avatar, fullname, date_of_birth, mail, created_time,\
                        street, province, country, language, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    
    try {
      const [rowsAccount] = await connection.query(queryAccount,
        [
          user.username,
          user.password,
          user.userID,
          'active'
        ])
  
      const [rowsUser] = await connection.query(queryUser,
        [
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
        ]
      )
      if (rowsAccount.affectedRows !== 0 && rowsUser.affectedRows !== 0) {
        resolve()
      }
      else {
        reject("Insert failed")
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const createUserMongo = (connection, user) => {
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
        { session: connection }
      )
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

//Define some function use in that routes (controller)
const countUserOfRole = (role) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }

      let query = 'SELECT count(*) AS count FROM account WHERE LEFT(userID, 1) = ?'
      connection.query(query, [role], (error, results) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error)
          return
        }
        resolve(results[0].count)
      })
    })
  })
}

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
    maxAge: 60 * 60 * 1000 // Token có hiệu lực trong 60 phút
  })

  res.cookie('refresh_token', refresh, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 10 * 24 * 60 * 60 * 1000 // Refresh token có hiệu lực trong 10 ngày
  })

  res.status(statusCode).json({
    userID: user.userID
  })
}

const signup = catchAsync(async (req, res, next) => {
  const { username, pass, role } = req.body
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()
  
  let roleOfUser = ''
  if (role === 'Admin')
    roleOfUser = 'A'
  else if (role === 'Student')
    roleOfUser = 'S'
  else if (role === 'Instructor')
    roleOfUser = 'I'
  let userID = ''
  let num
  let betweenCharacter

  //Đếm số lượng user để tạo userID tương ứng
  try {
    const count = await countUserOfRole(roleOfUser)
    num = count
  } catch (error) {
    res.status(500).send(error)
  }

  //Xử lý userID
  betweenCharacter = (num < 10) ? '00' : (num < 100) ? '0' : ''
  userID = roleOfUser + betweenCharacter + num

  let user = {
    userID: userID,
    username: username,
    password: pass,
    role: role,
    avatar: '',
    mail: 'example123@domain.com',
    name: ''
  }
  //Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()

  try {
    //Insert into Mysql
    await createUserMySQL(mysqlTransaction, user)

    //Insert into MongoDB
    await createUserMongo(mongoTransaction, user)

    await mysqlTransaction.query("COMMIT")
    await mongoTransaction.commitTransaction()
    res.status(201).send("Signup Successfully")
  }
  catch (error) { 
    await mysqlTransaction.query("ROLLBACK")
    await mongoTransaction.abortTransaction()
    next(error)
  }
  finally {
    await mongoTransaction.endSession()
  }
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
