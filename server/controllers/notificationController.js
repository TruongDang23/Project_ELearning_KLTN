import connectMysql from '../config/connMySql.js'
import catchAsync from '../utils/catchAsync.js'

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
             image_course,
             time 
        from receive_notify as rece
        inner join notify as noti on noti.notifyID = rece.notifyID
        where userID = ?
        order by time desc`

  let queryUnreadCount = `SELECT COUNT(*) AS unread FROM projectelearning.receive_notify WHERE userID = ? AND isRead = false;`

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
