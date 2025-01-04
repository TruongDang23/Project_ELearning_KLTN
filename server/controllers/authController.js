import catchAsync from '../utils/catchAsync.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import Email from '../utils/email.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import connectMysql from '../connMySql.js'
import User from '../models/user.js'
import { getCurrentDateTime } from '../utils/dateTimeHandler.js'
import mongoose from 'mongoose'

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

const getUserIDBasedEmail = (mail) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }

      let query = 'SELECT userID FROM user WHERE mail = ?'
      connection.query(query, [mail], (error, results) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error)
          return
        }
        if (results.length == 0)
          resolve('null')
        else
          resolve(results[0].userID)
      })
    })
  })
}

const signToken = (id, secret, expire) => {
  return jwt.sign({ id }, secret, {
    expiresIn: expire
  })
}

const createSendToken = (userID, statusCode, res) => {
  const token = signToken(userID, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN)
  const refresh = signToken(userID, process.env.JWT_SECRET, process.env.REFRESH_JWT_EXPIRES_IN)
  
  // Lưu token vào cookie
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'None', // Ngăn chặn CSRF
    maxAge: 60 * 60 * 1000, // Token có hiệu lực trong 60 phút
    secure: true,
    path: '/'
  })

  res.cookie('refresh_token', refresh, {
    httpOnly: true,
    sameSite: 'None',
    maxAge: 10 * 24 * 60 * 60 * 1000 ,// Refresh token có hiệu lực trong 10 ngày
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
    next({ status: 500, message: error})
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
    mail: `example123${userID}@domain.com`, //Email is unique
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
          createSendToken(results[0].userID, 200, res)
        }
        else
          return next({ status: 404, message: "User does not exit" })
      })
    }
  })
})

const loginWithGoogle = catchAsync(async (req, res, next) => {
  // Implement here
  const { loginCredential } = req.body
  const decode = jwt.decode(loginCredential)
  const userID = await getUserIDBasedEmail(decode.email)
  if (userID === 'null') {
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
      next({ status: 500, message: error})
    }
  
    //Xử lý userID
    betweenCharacter = (num < 10) ? '00' : (num < 100) ? '0' : ''
    userID = roleOfUser + betweenCharacter + num
  
    let user = {
      userID: userID,
      username: decode.email,
      password: hashPassword(decode.sub),
      role: "Student",
      avatar: decode.picture,
      mail: decode.email, //Email is unique
      name: decode.name
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
      createSendToken(userID, 200, res)
    }
    catch (error) { 
      await mysqlTransaction.query("ROLLBACK")
      await mongoTransaction.abortTransaction()
      next(error)
    }
    finally {
      await mongoTransaction.endSession()
    }
  }
  else {
    //If User is existing
    createSendToken(userID, 200, res)
  }
})

const protect = catchAsync(async (req, res, next) => {
  // Implement here
  if(req.cookies.access_token) {
    try {
      const tokenDecode = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET)
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
    }
    catch(error) {
      next(error)
    }
  }
  else {
    next({ status: 401, message: "Missing access token!"})
  }
})

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.role)) {
      return next({ status: 403, message: "You do not have permission to perform this action"})
    }
    else {
      next()
    }
  }
}

export default { signup, login, protect, restrictTo, loginWithGoogle }
