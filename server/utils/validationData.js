import connectMysql from '../config/connMySql.js'

const connection = connectMysql.promise()

async function checkEmailExists(email, userID) {
  const [rows] = await connection.query(
    'SELECT 1 FROM user WHERE mail = ? AND userID <> ? LIMIT 1',
    [email, userID]
  )
  return rows.length > 0
}

async function checkUserNameExists(username) {
  const [rows] = await connection.query(
    'SELECT 1 FROM account WHERE username = ? LIMIT 1',
    [username]
  )
  return rows.length > 0
}

export { checkEmailExists, checkUserNameExists }