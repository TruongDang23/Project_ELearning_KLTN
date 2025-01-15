import connectMysql from "../config/connMySql.js"

const countUserOfRole = (role) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }

      let query =
        'SELECT count(*) AS count FROM account WHERE LEFT(userID, 1) = ?'
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

const getUserByEmail = (mail) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }
      let query = 'SELECT * FROM user WHERE mail = ?'
      connection.query(query, [mail], (error, results) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error)
          return
        }
        if (results.length == 0) resolve('null')
        else resolve(results[0])
      })
    })
  })
}

const getUserByID = async (userid) => {
  return new Promise((resolve, reject) => {
    connectMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        //Get information from mysql
        let query = `SELECT * from user WHERE userID = ?`
        connection.query(query, [userid], async (error, inf) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(error)
          }
          resolve(inf[0])
        })
      }
    })
  })
}

export { getUserByEmail, getUserByID, countUserOfRole }