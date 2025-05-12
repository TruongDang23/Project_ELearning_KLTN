import connectMysql from '../config/connMySql.js'

const connection = connectMysql.promise()

async function checkEmailExists(email) {
  const [rows] = await connection.query(
    'SELECT 1 FROM user WHERE mail = ? LIMIT 1',
    [email]
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