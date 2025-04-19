/* eslint-disable no-async-promise-executor */
import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'

const createVoucherObject = async(mysqlTransaction, voucher) => {
  const query = `INSERT INTO vouchers 
    (voucher_code, description, discount_value, voucher_for, 
    usage_limit, start_date, end_date, is_all_users, is_all_courses) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

  const [result] = await mysqlTransaction.query(query, [
    voucher.voucher_code,
    voucher.description,
    voucher.discount_value,
    voucher.voucher_for,
    voucher.usage_limit,
    voucher.start_date,
    voucher.end_date,
    voucher.is_all_users,
    voucher.is_all_courses
  ])

  if (result.affectedRows === 0) {
    throw new Error('Failed to create voucher')
  }
}

const createVoucherCourse = async(mysqlTransaction, voucher_code, list_courses) => {
  try {
    const query = `INSERT INTO vouchers_course (voucher_code, courseID) VALUES (?, ?)`

    for (const courseID of list_courses) {
      const [result] = await mysqlTransaction.query(query, [voucher_code, courseID])
      if (result.affectedRows === 0) {
        throw new Error(`Failed to insert course: ${courseID}`)
      }
    }

    return true
  } catch (error) {
    throw `Error in createVoucherCourse: ${error}`
  }
}

const createVoucherUser = async(mysqlTransaction, voucher_code, list_users) => {
  try {
    const query = `INSERT INTO vouchers_user (voucher_code, userID) VALUES (?, ?)`

    for (const userID of list_users) {
      const [result] = await mysqlTransaction.query(query, [voucher_code, userID])
      if (result.affectedRows === 0) {
        throw new Error(`Failed to insert user: ${userID}`)
      }
    }

    return true
  } catch (error) {
    throw `Error in createVoucherUser: ${error}`
  }
}

const createVoucher = catchAsync(async (req, res, next) => {
  const { voucher } = req.body
  const mysqlTransaction = connectMysql.promise()

  try {
    await mysqlTransaction.query("START TRANSACTION")

    await createVoucherObject(mysqlTransaction, voucher)

    if (voucher.voucher_for === 'student' && voucher.is_all_users === 0) { //Case voucher cho một vài người dùng
      await createVoucherUser(mysqlTransaction, voucher.voucher_code, voucher.users)
    } else if (voucher.voucher_for === 'course' && voucher.is_all_courses === 0) { //Case voucher cho một vài khóa khóa học
      await createVoucherCourse(mysqlTransaction, voucher.voucher_code, voucher.courses)
    }

    await mysqlTransaction.query("COMMIT")
    res.status(200).send('Voucher created successfully')
  } catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    next({ status: 500, message: 'Failed to create voucher' })
  }
})

const getVoucher = catchAsync(async (req, res, next) => {
  // Implement here
  const voucher_code = req.params.voucher_code
  if (!voucher_code) {
    res.status(400).send('Voucher code is required')
    return
  }

  const mysqlTransaction = connectMysql.promise()

  let voucher, voucher_users, voucher_courses
  let result = {}

  await mysqlTransaction.query("START TRANSACTION")
  try {
    [voucher, voucher_users, voucher_courses] = await Promise.all([
      mysqlTransaction.query(`SELECT * FROM vouchers WHERE voucher_code = ?`, [voucher_code]),
      mysqlTransaction.query(`SELECT * FROM vouchers_user WHERE voucher_code = ?`, [voucher_code]),
      mysqlTransaction.query(`SELECT * FROM vouchers_course WHERE voucher_code = ?`, [voucher_code])
    ])

    await mysqlTransaction.query("COMMIT")

    result = voucher[0][0]
    result.users = voucher_users[0].map((user) => user.userID)
    result.courses = voucher_courses[0].map((course) => course.courseID)

    res.status(200).send({ voucher: result })
  } catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    next({ status: 500, message: 'Failed to create voucher' })
  }
})

const updateVoucher = catchAsync(async (req, res, next) => {
  // Implement here
  const { voucher } = req.body
  const voucher_code = req.params.voucher_code
  if (!voucher_code) {
    res.status(400).send('Voucher code is required')
    return
  }
  connectMysql.getConnection((error, connection) => {
    if (error) next(error)
    else {
      let query =
        `UPDATE vouchers SET
        description = ?, discount_value = ?, 
        usage_limit = ?, start_date = ?, end_date = ?, 
        is_all_users = ?, is_all_courses = ?
        WHERE voucher_code = ?`
      connection.query(
        query,
        [voucher.description, voucher.discount_value,
          voucher.usage_limit, voucher.start_date, voucher.end_date,
          voucher.is_all_users, voucher.is_all_courses, voucher_code],
        (error, results) => {
          connection.release()
          if (error) {
            next(error)
            return
          }
          if (results.affectedRows >= 1) {
            res.status(200).send('Voucher updated successfully')
          } else {
            res.status(500).send('Voucher updated failed')
          }
        }
      )
    }
  })
})

const deleteVoucher = catchAsync(async (req, res, next) => {
  // Implement here
  const voucher_code = req.params.voucher_code
  if (!voucher_code) {
    res.status(400).send('Voucher code is required')
    return
  }
  connectMysql.getConnection((error, connection) => {
    if (error) next(error)
    else {
      let query =
          `UPDATE vouchers SET
          is_deleted = 1
          WHERE voucher_code = ?`
      connection.query(
        query,
        [voucher_code],
        (error, results) => {
          connection.release()
          if (error) {
            next(error)
            return
          }
          if (results.affectedRows >= 1) {
            res.status(200).send('Voucher deleted successfully')
          } else {
            res.status(500).send('Voucher deleted failed')
          }
        }
      )
    }
  })
})

export default { createVoucher, getVoucher, updateVoucher, deleteVoucher }