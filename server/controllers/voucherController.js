import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'

const createVoucherObject = async(mysqlTransaction, voucher) => {
  return new Promise(async (resolve, reject) => {
    let query = `INSERT INTO vouchers 
                  (voucher_code, description, discount_value, voucher_for, 
                  usage_limit, start_date, end_date, is_all_users, is_all_courses) 
                VALUES 
                  (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    try {
      const [affectedRows] = await mysqlTransaction.query(query,
        [voucher.voucher_code, voucher.description, voucher.discount_value,
          voucher.voucher_for, voucher.usage_limit, voucher.start_date,
          voucher.end_date, voucher.is_all_users, voucher.is_all_courses])

      if (affectedRows > 0) {
        resolve(true)
      }
      else {
        reject('Failed to create voucher')
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const createVoucherCourse = async(mysqlTransaction, voucher_code, list_courses) => {
  return new Promise(async (resolve, reject) => {
    try {
      const insertPromises = list_courses.map((courseID) => {
        const query = `INSERT INTO vouchers_course (voucher_code, courseID) VALUES (?, ?)`
        return mysqlTransaction.query(query, [voucher_code, courseID])
      })

      await Promise.all(insertPromises) // đợi tất cả insert hoàn tất

      resolve(true) // nếu không lỗi gì
    } catch (error) {
      reject(error) // nếu có bất kỳ lỗi nào
    }
  })
}

const createVoucherUser = async(mysqlTransaction, voucher_code, list_users) => {
  return new Promise(async (resolve, reject) => {
    try {
      const insertPromises = list_users.map((userID) => {
        const query = `INSERT INTO vouchers_user (voucher_code, userID) VALUES (?, ?)`
        return mysqlTransaction.query(query, [voucher_code, userID])
      })

      await Promise.all(insertPromises) // đợi tất cả insert hoàn tất

      resolve(true) // nếu không lỗi gì
    } catch (error) {
      reject(error) // nếu có bất kỳ lỗi nào
    }
  })
}
const createVoucher = catchAsync(async (req, res, next) => {
  // Implement here
  const { voucher } = req.body
  const mysqlTransaction = connectMysql.promise()
  await mysqlTransaction.query("START TRANSACTION")
  const promises = [
    createVoucherObject(mysqlTransaction, voucher)
  ]

  // Thêm điều kiện gọi hàm createVoucherUser
  if (voucher.voucher_for === 'student') {
    promises.push(
      createVoucherUser(mysqlTransaction, voucher.voucher_code, voucher.users)
    )
  }
  else if (voucher.voucher_for === 'course') {
    promises.push(
      createVoucherCourse(mysqlTransaction, voucher.voucher_code, voucher.courses)
    )
  }
  try {
    // Chạy tất cả promises
    const result = await Promise.all(promises)
    // Commit Transactions
    await mysqlTransaction.query("COMMIT")
    res.status(200).send(result[0])
  } catch (error) {
    // Rollback Transactions in case of an error
    await mysqlTransaction.query("ROLLBACK")
    next(error)
  }
})

const getVoucher = catchAsync(async (req, res, next) => { })

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

const getAllVouchers = catchAsync(async (req, res, next) => {

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

export default { createVoucher, getVoucher, updateVoucher, getAllVouchers, deleteVoucher }