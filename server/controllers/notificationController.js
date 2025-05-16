/* eslint-disable no-async-promise-executor */
import connectMysql from '../config/connMySql.js'
import catchAsync from '../utils/catchAsync.js'
import { formatDateTime } from '../utils/dateTimeHandler.js'
import Course from '../models/courseInfo.js'

const getNewNotifyID = async () => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }

      const query = `SELECT CONCAT('N', LPAD(SUBSTRING(MAX(notifyID), 2) + 1, 3, '0')) AS newNotifyID FROM notify`

      connection.query(query, (error, data) => {

        if (error) {
          return reject(error)
        }
        resolve(data[0]?.newNotifyID)
      })
    })
  })
}


const getRandomTitle = () => {
  const titles = [
    "Bạn có một thông báo mới",
    "Hãy kiểm tra thông báo của bạn",
    "Thông báo mới đã đến",
    "Cập nhật quan trọng cho bạn",
    "Xem ngay thông báo mới",
    "Thông tin quan trọng vừa được cập nhật",
    "Bạn vừa nhận được một tin nhắn mới",
    "Kiểm tra ngay để không bỏ lỡ thông báo",
    "Tin tức quan trọng dành riêng cho bạn",
    "Đừng bỏ lỡ thông báo này!",
    "Một thông báo thú vị đang chờ bạn",
    "Tin quan trọng: Hãy xem ngay",
    "Chúng tôi có điều muốn thông báo với bạn",
    "Cập nhật mới nhất dành cho bạn",
    "Bạn vừa nhận được cập nhật mới",
    "Thông báo quan trọng: Hãy kiểm tra ngay",
    "Tin mới: Xem chi tiết ngay bây giờ",
    "Bạn có tin nhắn chưa đọc",
    "Xem ngay: Tin tức từ hệ thống",
    "Một thông báo đặc biệt dành cho bạn"
  ]

  // Select a random title from the list
  const randomIndex = Math.floor(Math.random() * titles.length)
  return titles[randomIndex]
}

const getInforObject = async (object, objectID) => {
  const connection = connectMysql.promise()
  let query
  let image
  let name

  try {
    switch (object) {
    case "course": {
      // Truy vấn MySQL để lấy title
      query = `SELECT title FROM course WHERE courseID = ?`
      const [courseRows] = await connection.query(query, [objectID])
      if (courseRows.length === 0) throw new Error("Course not found")
      name = courseRows[0].title

      // Truy vấn MongoDB để lấy image (ngoài transaction)
      const courseImage = await Course.findOne({ courseID: objectID }).select("image_introduce")
      image = courseImage ? courseImage.image_introduce : null
      break
    }

    case "user": {
      // Truy vấn MySQL để lấy fullname và avatar
      query = `SELECT fullname, avatar FROM user WHERE userID = ?`
      const [userRows] = await connection.query(query, [objectID])
      if (userRows.length === 0) throw new Error("User not found")
      name = userRows[0].fullname
      image = userRows[0].avatar
      break
    }
    }

    return {
      name: name,
      image: image
    }
  } catch (error) {
    console.log(error)
  }
}

const getRandomMessage = (objectName, reason) => {
  const messageTemplates = {
    QnA: [
      `Có một câu hỏi mới trong khóa học ${objectName}.`,
      `Khóa học ${objectName} có câu hỏi mới từ học viên.`,
      `Một câu hỏi mới vừa được thêm vào khóa học ${objectName}.`,
      `Học viên vừa đặt một câu hỏi trong khóa học ${objectName}.`,
      `Khóa học ${objectName} vừa nhận được câu hỏi thú vị từ học viên.`,
      `Bạn có một câu hỏi chưa được trả lời trong khóa học ${objectName}.`
    ],
    published: [
      `Khóa học ${objectName} đã được xuất bản thành công!`,
      `Xin chúc mừng! Khóa học ${objectName} đã xuất bản.`,
      `Khóa học ${objectName} hiện đã có sẵn để học.`,
      `Nội dung của khóa học ${objectName} đã sẵn sàng cho học viên.`,
      `Khóa học ${objectName} đã chính thức được công khai.`,
      `Khóa học ${objectName} đã lên sóng, hãy chia sẻ với mọi người!`
    ],
    sendmonitor: [
      `Khóa học ${objectName} được gửi xét duyệt nội dung.`,
      `Nội dung khóa học ${objectName} đang chờ được xét duyệt.`,
      `Có một khóa học mới đang cần xét duyệt nội dung.`,
      `Khóa học ${objectName} đã được gửi đến để kiểm tra chất lượng.`,
      `Khóa học ${objectName} đang trong quá trình chờ phê duyệt.`,
      `Vui lòng theo dõi tiến trình xét duyệt của khóa học ${objectName}.`
    ],
    terminated: [
      `Khóa học ${objectName} đã bị dừng hoạt động.`,
      `Hoạt động của khóa học ${objectName} đã bị kết thúc.`,
      `Khóa học ${objectName} đã bị hủy.`,
      `Khóa học ${objectName} đã bị tạm ngừng.`,
      `Khóa học ${objectName} không còn khả dụng nữa.`,
      `Quản trị viên đã dừng hoạt động khóa học ${objectName}.`
    ],
    newreview: [
      `Có một đánh giá mới cho khóa học ${objectName}.`,
      `Khóa học ${objectName} vừa nhận được một đánh giá mới.`,
      `Xem ngay đánh giá mới trong khóa học ${objectName}.`,
      `Học viên vừa để lại đánh giá cho khóa học ${objectName}.`,
      `Khóa học ${objectName} vừa nhận được phản hồi từ học viên.`,
      `Bạn có một đánh giá mới cho khóa học ${objectName}, hãy xem ngay!`
    ],
    buycourse: [
      `Học viên ${objectName} vừa tham gia khóa học của bạn.`,
      `Chào mừng ${objectName} đã được thêm vào danh sách khóa học của bạn.`,
      `Xin chúc mừng! Khóa học của bạn đã có thêm thành viên ${objectName}.`,
      `Khóa học của bạn vừa được học viên ${objectName} đăng ký.`,
      `Thành viên mới ${objectName} vừa gia nhập khóa học của bạn.`,
      `Học viên ${objectName} đã sẵn sàng bắt đầu học trong khóa học của bạn.`
    ]
  }
  // Kiểm tra reason hợp lệ
  if (!messageTemplates[reason]) {
    throw new Error(`Invalid reason: ${reason}`)
  }

  // Lấy danh sách tin nhắn theo reason
  const messages = messageTemplates[reason]

  // Chọn ngẫu nhiên một tin nhắn
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}

const insertNewNotification = async(notify, listUserID) => {
  return new Promise(async (resolve, reject) => {
    const connection = connectMysql.promise()
    await connection.query("START TRANSACTION")

    let queryInsertNewNotify = `INSERT INTO notify (
      notifyID,
      title,
      message,
      routing,
      image)
    VALUES (?, ?, ?, ?, ?)`

    let queryInsertNewReceive = `INSERT INTO receive_notify (
      notifyID,
      userID,
      time,
      isRead)
    VALUES (?, ?, ?, ?)`

    try {
      const [rowsnotify] = await connection.query(queryInsertNewNotify,
        [
          notify.notifyID,
          notify.title,
          notify.message,
          notify.url,
          notify.image
        ])

      for (const infor of listUserID) {
        await connection.query(queryInsertNewReceive,
          [
            notify.notifyID,
            infor.userID,
            notify.time,
            false
          ])
      }
      if (rowsnotify.affectedRows == 0) {
        await connection.query("ROLLBACK")
        reject("No new notification has inserted")
      }
      else {
        await connection.query("COMMIT")
        resolve()
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getListUserReceiveNotify = async(reason, objectID, userID) => {
  return new Promise(async(resolve, reject) => {

    const connection = connectMysql.promise()
    let query
    let rows = []
    switch (reason) {
    case 'QnA':
      //In this case, objectID is user, who create new QnA.
      query = ` -- student, who enrolled this course except user create QnA
                    SELECT courseID, userID FROM enroll
                    WHERE courseID = ? AND userID != ? 
  
                -- teacher, who created this course except user create QnA
                    UNION SELECT courseID, userID FROM course 
                    WHERE courseID = ? AND userID != ?`
      try {
        rows = await connection.query(query,
          [
            objectID,
            userID,
            objectID,
            userID
          ])

        if (rows.affectedRows == 0) {
          resolve([])
        }
        else {
          resolve(rows[0])
        }
      }
      catch (error) {
        reject(error)
      }
      break
    case 'published':
      break
    case 'sendmonitor':
      break
    case 'terminated':
      break
    case 'newreview':
      break
    case 'buycourse':
      break
    }
  })
}

//object has one of two values: course || user
//reason has values: QnA || published || sendmonitor || terminated || newreview || buycourse
const createNotification = async(object, objectID, userID, url, reason) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [notifyID, title, infoObject, listUserID] = await Promise.all([
        getNewNotifyID(), // Get the new notifyID
        getRandomTitle(), // Get a random title
        getInforObject(object, objectID), // This function will return { image, name }
        getListUserReceiveNotify(reason, objectID, userID)
      ])

      const time = formatDateTime(new Date())
      const message = await getRandomMessage(infoObject.name, reason)
      const notify = {
        notifyID,
        title,
        message,
        url,
        time,
        image: infoObject.image
      }
      await insertNewNotification(notify, listUserID)
      resolve()
    }
    catch (error) {
      reject(error)
    }
  })
}

const getByID = catchAsync(async (req, res, next) => {
  // Implement here
  const userID = req.userID
  const mysqlTransaction = connectMysql.promise()

  await mysqlTransaction.query('START TRANSACTION')
  let queryNotify = `
      select noti.notifyID,
             title,
             message,
             routing,
             isRead,
             image,
             time 
        from receive_notify as rece
        inner join notify as noti on noti.notifyID = rece.notifyID
        where userID = ?
        order by time desc`

  let queryUnreadCount = `SELECT COUNT(*) AS unread FROM projectelearning.receive_notify WHERE userID = ? AND isRead = false`

  try {
    const [rowNotifies] = await mysqlTransaction.query(queryNotify, [userID])

    const [rowUnread] = await mysqlTransaction.query(queryUnreadCount, [userID])
    res.status(200).json({
      listNotifications: rowNotifies,
      unreadCount: rowUnread[0].unread
    })
    await mysqlTransaction.query('COMMIT')
  } catch (error) {
    await mysqlTransaction.query('ROLLBACK')
    next(error)
  }
})

// Cập nhật số lượng tin đã đọc
const updateRead = catchAsync(async (req, res, next) => {
  // Implement here
  const { id, notifyID } = req.params
  connectMysql.getConnection((err, connection) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      //Change status of notify is read
      let query = `update receive_notify set isRead = true where userID = ? and notifyID = ?`
      connection.query(query, [id, notifyID], async (error) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          next(error)
        }
        res.status(200).send()
      })
    }
  })
})

export default { getByID, updateRead }

export { createNotification }
