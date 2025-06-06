/* eslint-disable no-async-promise-executor */
import Course from '../models/courseInfo.js'
import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'
import { v4 as uuid } from 'uuid'

const getAllVouchers = catchAsync(async (req, res, next) => {
  const mysqlTransaction = connectMysql.promise();

  try {
    await mysqlTransaction.query("START TRANSACTION");

    // Lấy thông tin voucher
    const [vouchers] = await mysqlTransaction.query(`
      SELECT 
        v.voucher_code,
        v.description,
        v.discount_type,
        v.discount_value,
        v.voucher_for,
        v.usage_limit,
        v.usage_count,
        DATE_FORMAT(v.start_date, '%Y-%m-%d') as start_date,
        DATE_FORMAT(v.end_date, '%Y-%m-%d') as end_date,
        v.is_all_users,
        v.is_all_courses,
        v.create_at,
        v.update_at
      FROM vouchers AS v
      WHERE v.is_deleted = 0
    `);

    // Lấy thông tin người dùng liên kết với voucher
    const [voucherUsers] = await mysqlTransaction.query(`
      SELECT 
        vu.voucher_code,
        vu.userID,
        u.fullname,
        u.avatar
      FROM vouchers_user AS vu
      INNER JOIN user AS u ON vu.userID = u.userID
    `);

    // Lấy thông tin khóa học liên kết với voucher
    const [voucherCourses] = await mysqlTransaction.query(`
      SELECT 
        vc.voucher_code,
        vc.courseID,
        c.title,
        c.method,
        c.program,
        u.fullname AS teacher,
        pc.time
      FROM vouchers_course AS vc
      INNER JOIN course AS c ON vc.courseID = c.courseID
      INNER JOIN user AS u ON c.userID = u.userID
      LEFT JOIN published_course AS pc ON c.courseID = pc.courseID
    `);

    // Lấy thông tin lịch sử sử dụng voucher
    const [usedVouchers] = await mysqlTransaction.query(`
      SELECT 
        uv.voucher_code,
        uv.userID,
        u.fullname,
        u.avatar,
        uv.use_at
      FROM used_vouchers AS uv
      INNER JOIN user AS u ON uv.userID = u.userID
    `);

    await mysqlTransaction.query("COMMIT");

    // Lấy danh sách các courseID để truy vấn từ MongoDB
    const courseIDs = voucherCourses
      .filter((vc, index, self) =>
        index === self.findIndex((t) => t.courseID === vc.courseID))
      .map(vc => vc.courseID);

    // Truy vấn MongoDB để lấy thông tin image_introduce
    const mongoCourses = await Course.find({
      courseID: { $in: courseIDs }
    }).select("courseID image_introduce");

    // Kết hợp dữ liệu
    const listVouchers = vouchers.map((voucher) => {
      const users = voucherUsers
        .filter((vu) => vu.voucher_code === voucher.voucher_code)
        .map((vu) => ({
          userID: vu.userID,
          fullname: vu.fullname,
          avatar: vu.avatar
        }));

      const courses = voucherCourses
        .filter((vc) => vc.voucher_code === voucher.voucher_code)
        .map((vc) => {
          // Tìm thông tin image_introduce từ MongoDB
          const mongoData = mongoCourses.find(mc => mc.courseID === vc.courseID);

          return {
            courseID: vc.courseID,
            title: vc.title,
            method: vc.method,
            program: vc.program,
            teacher: vc.teacher,
            time: vc.time ? new Date(vc.time).toISOString().split('T')[0] : null,
            image_introduce: mongoData ? mongoData.image_introduce : "https://th.bing.com/th/id/OIP.JNatPlM3akhj5YZpbLAY_QHaEQ?rs=1&pid=ImgDetMain"
          };
        });

      const used = usedVouchers
        .filter((uv) => uv.voucher_code === voucher.voucher_code)
        .map((uv) => ({
          userID: uv.userID,
          fullname: uv.fullname,
          avatar: uv.avatar,
          use_at: uv.use_at
        }));

      return {
        ...voucher,
        users,
        courses,
        used
      };
    });

    res.status(200).json({
      status: "success",
      data: listVouchers
    });
  } catch (error) {
    await mysqlTransaction.query("ROLLBACK");
    next({ status: 500, message: "Failed to get vouchers", error });
  }
});


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

const updateVoucherObject = async(mysqlTransaction, voucher) => {
  const query = `UPDATE vouchers SET
        description = ?, discount_value = ?, voucher_for = ?
        usage_limit = ?, start_date = ?, end_date = ?, 
        is_all_users = ?, is_all_courses = ?
        WHERE voucher_code = ?`

  const [result] = await mysqlTransaction.query(query, [
    voucher.description,
    voucher.discount_value,
    voucher.voucher_for,
    voucher.usage_limit,
    voucher.start_date,
    voucher.end_date,
    voucher.is_all_users,
    voucher.is_all_courses,
    voucher.voucher_code
  ])

  if (result.affectedRows === 0) {
    throw new Error('Failed to update voucher')
  }
}

const getVouchersForAll = async(mysqlTransaction) => {
  const query = `SELECT 
                  voucher_code, 
                  description, 
                  discount_value,
                  discount_type,
                  usage_limit,
                  usage_count,
                  start_date,
                  end_date
                 FROM vouchers 
                 WHERE is_deleted = false AND (is_all_users = true OR is_all_courses = true)
                 AND usage_limit > usage_count
                 AND start_date <= DATE(now())
                 AND end_date >= DATE(now())`
  const [result] = await mysqlTransaction.query(query)
  if (result.length === 0)
    return []
  return result
}

const getVouchersForUser = async(mysqlTransaction, userID) => {
  const query = `SELECT 
                  vc.voucher_code, 
                  vc.description, 
                  vc.discount_value,
                  vc.discount_type,
                  vc.usage_limit,
                  vc.usage_count,
                  vc.start_date,
                  vc.end_date
                 FROM vouchers as vc
                 INNER JOIN vouchers_user as vu ON vc.voucher_code = vu.voucher_code
                 WHERE vu.userID = ? AND vc.is_deleted = false AND vc.is_all_users = false AND vc.is_all_courses = false
                 AND vc.usage_limit > vc.usage_count
                 AND vc.start_date <= DATE(now())
                 AND vc.end_date >= DATE(now())`
  const [result] = await mysqlTransaction.query(query, [userID])
  if (result.length === 0)
    return []
  return result
}

const getVouchersForCourse = async(mysqlTransaction, courseID) => {
  const query = `SELECT 
                  vc.voucher_code, 
                  vc.description, 
                  vc.discount_value,
                  vc.discount_type,
                  vc.usage_limit,
                  vc.usage_count,
                  vc.start_date,
                  vc.end_date
                 FROM vouchers as vc
                 INNER JOIN vouchers_course as vcourse ON vc.voucher_code = vcourse.voucher_code
                 WHERE vcourse.courseID = ? AND vc.is_deleted = false AND vc.is_all_users = false AND vc.is_all_courses = false
                 AND vc.usage_limit > vc.usage_count
                 AND vc.start_date <= DATE(now())
                 AND vc.end_date >= DATE(now())`
  const [result] = await mysqlTransaction.query(query, [courseID])
  if (result.length === 0)
    return []
  return result
}

const createVoucher = catchAsync(async (req, res, next) => {
  const voucher = req.body.data
  const mysqlTransaction = connectMysql.promise()

  try {
    await mysqlTransaction.query("START TRANSACTION")

    await createVoucherObject(mysqlTransaction, voucher)

    //Nếu is_all_users = true thì không cần tạo voucher_user
    if (voucher.voucher_for === 'student' && voucher.is_all_users === false) { //Case voucher cho một vài người dùng
      await createVoucherUser(mysqlTransaction, voucher.voucher_code, voucher.users)
      //Nếu is_all_courses = true thì không cần tạo voucher_course
    } else if (voucher.voucher_for === 'course' && voucher.is_all_courses === false) { //Case voucher cho một vài khóa khóa học
      await createVoucherCourse(mysqlTransaction, voucher.voucher_code, voucher.courses)
    }

    await mysqlTransaction.query("COMMIT")
    res.status(201).send('Voucher created successfully')
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
    next({ status: 500, message: 'Failed to get voucher' })
  }
})

const getListVouchers = catchAsync(async (req, res, next) => {
  // Implement here
  const voucher_code = req.params.voucher_code
  if (!voucher_code) {
    res.status(400).send('Voucher code is required')
    return
  }

  const mysqlTransaction = connectMysql.promise()

  let voucher, voucher_users, voucher_courses, used_voucher

  await mysqlTransaction.query("START TRANSACTION")
  try {
    [voucher, voucher_users, voucher_courses, used_voucher] = await Promise.all([
      //Select voucher information
      mysqlTransaction.query(`SELECT * FROM vouchers`),
      //Select voucher for user
      mysqlTransaction.query(`SELECT 
                              vu.voucher_code,
                                vu.userID,
                                u.fullname,
                                u.avatar
                            FROM vouchers_user as vu
                            INNER JOIN user as u ON vu.userID = u.userID`),
      //Select voucher for course
      mysqlTransaction.query(`SELECT 
                                vc.voucher_code,
                                vc.courseID,
                                c.title
                              FROM vouchers_course as vc
                              INNER JOIN course as c ON vc.courseID = c.courseID`),
      //Select voucher is used
      mysqlTransaction.query(`SELECT
                              vu.voucher_code,
                              vu.userID,
                              u.fullname,
                              u.avatar,
                                vu.use_at
                            FROM used_vouchers as vu
                            INNER JOIN user as u ON vu.userID = u.userID`)
    ])

    await mysqlTransaction.query("COMMIT")

    if (voucher_courses[0].length > 0) {
      const courseIDs = voucher_courses[0].map(row => row.course)
      const courses = await Course.find({ courseID: { $in: courseIDs } }).select('image_introduce courseID')
      voucher_courses[0] = voucher_courses[0].map(course => {
        const data = courses.find(c => c.courseID === course.course)
        return {
          ...course,
          image_introduce: data ? data.image_introduce : ''
        }
      })
    }

    const list_voucher = voucher.map((voucher) => {
      const users = voucher_users
        .filter((vu) => vu.voucher_code === voucher.voucher_code)
        .map((vu) => ({
          userID: vu.userID,
          fullname: vu.fullname,
          avatar: vu.avatar
        }))

      const courses = voucher_courses
        .filter((vc) => vc.voucher_code === voucher.voucher_code)
        .map((vc) => ({
          courseID: vc.courseID,
          title: vc.title
        }))

      const used = used_voucher
        .filter((vu) => vu.voucher_code === voucher.voucher_code)
        .map((vu) => ({
          userID: vu.userID,
          fullname: vu.fullname,
          avatar: vu.avatar,
          use_at: vu.use_at
        }))

      return {
        ...voucher,
        users,
        courses,
        used
      }
    })

    res.status(200).send(list_voucher)
  } catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    next({ status: 500, message: 'Failed to get voucher' })
  }
})

const updateVoucher = catchAsync(async (req, res, next) => {
  // Implement here
  const voucher = req.body.data
  const voucher_code = req.params.voucher_code
  if (!voucher_code) {
    res.status(400).send('Voucher code is required')
    return
  }

  const mysqlTransaction = connectMysql.promise()

  try {
    await mysqlTransaction.query("START TRANSACTION")
    voucher.voucher_code = voucher_code
    //Update voucher object
    await updateVoucherObject(mysqlTransaction, voucher)
    //Clear old data of voucher_user
    await mysqlTransaction.query(`DELETE FROM vouchers_user WHERE voucher_code = ?`, [voucher.voucher_code])
    //Clear old data of voucher_course
    await mysqlTransaction.query(`DELETE FROM vouchers_course WHERE voucher_code = ?`, [voucher.voucher_code])

    if (voucher.voucher_for === 'student') {
      //Insert new data of voucher_user
      if (voucher.is_all_users === false && voucher.users.length > 0) //Case voucher cho một vài người dùng.
        await createVoucherUser(mysqlTransaction, voucher.voucher_code, voucher.users)
    } else if (voucher.voucher_for === 'course') {
      //Insert new data of voucher_course
      if (voucher.is_all_courses === false && voucher.courses.length > 0) //Case voucher cho một vài khóa khóa học
        await createVoucherCourse(mysqlTransaction, voucher.voucher_code, voucher.courses)
    }

    await mysqlTransaction.query("COMMIT")
    res.status(200).send('Voucher updated successfully')
  } catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    next({ status: 500, message: 'Failed to updated voucher' })
  }
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
            res.status(204).send('Voucher deleted successfully')
          } else {
            res.status(500).send('Voucher deleted failed')
          }
        }
      )
    }
  })
})

const useVoucher = async(voucher_code, userID) => {
  const mysqlTransaction = connectMysql.promise()
  await mysqlTransaction.query("START TRANSACTION")
  try {
    await mysqlTransaction.query(`UPDATE vouchers SET usage_count = usage_count + 1 WHERE voucher_code = ?`, [voucher_code]),
    await mysqlTransaction.query(`INSERT INTO used_vouchers (voucher_code, userID) VALUES (?, ?)`, [voucher_code, userID])
    await mysqlTransaction.query("COMMIT")
    return ({
      status: 200,
      message: 'Voucher used successfully'
    })
  }
  catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    throw new Error(" Failed to use voucher: ${error}`")
  }
}

const getMatchedVouchers = catchAsync(async (req, res, next) => {
  const courseID = req.params.courseID
  if (!courseID) {
    res.status(400).send('Course ID is required')
    return
  }
  const userID = req.userID
  let matching_vouchers = []

  const mysqlTransaction = connectMysql.promise()
  mysqlTransaction.query("START TRANSACTION")
  try {
    const [vouchers_for_all, vouchers_for_user, vouchers_for_course] = await Promise.all([
      getVouchersForAll(mysqlTransaction),
      getVouchersForUser(mysqlTransaction, userID),
      getVouchersForCourse(mysqlTransaction, courseID)
    ])

    await mysqlTransaction.query("COMMIT")

    matching_vouchers = [
      ...vouchers_for_all,
      ...vouchers_for_user,
      ...vouchers_for_course
    ]

    // Filter out duplicates based on voucher_code
    // This will keep the first occurrence of each voucher_code
    matching_vouchers = Array.from(
      new Map(matching_vouchers.map(v => [v.voucher_code, v])).values()
    ).sort((a, b) => b.discount_value - a.discount_value) // Sort by discount_value in descending order

    res.status(200).send({
      data: matching_vouchers
    })
  } catch (error) {
    await mysqlTransaction.query("ROLLBACK")
    next({ status: 500, message: error })
  }
})

const getVoucherByCode = async(voucher_code) => {
  const mysqlTransaction = connectMysql.promise()
  if (!voucher_code) {
    throw new Error('Voucher code is required')
  }
  try {
    const [result] = await mysqlTransaction.query(`SELECT discount_type, discount_value FROM vouchers WHERE voucher_code = ?`, [voucher_code])
    return result[0]
  } catch (error) {
    throw new Error(`Failed to get voucher by code: ${error}`)
  }
}

const createWelcomeVoucher = async(mysqlTransaction, userID) => {
  const id = uuid()
  let voucher = {
    voucher_code: id,
    description: 'Discount 80% for new users',
    discount_value: 80,
    voucher_for: 'student',
    usage_limit: 1,
    start_date: new Date(),
    end_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Cộng 7 ngày
    is_all_users: false,
    is_all_courses: false
  }

  try {
    await createVoucherObject(mysqlTransaction, voucher)

    await createVoucherUser(mysqlTransaction, voucher.voucher_code, [userID])
  } catch (error) {
    throw new Error(`Failed to create welcome voucher: ${error}`)
  }
}

export default { getAllVouchers, createVoucher, getVoucher, updateVoucher, deleteVoucher, useVoucher, getMatchedVouchers, getListVouchers }

export { useVoucher, getVoucherByCode, createWelcomeVoucher }