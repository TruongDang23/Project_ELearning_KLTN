import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

// Sử dụng kỹ thuật pooling để tạo tối đa 10 connection đến mysql
// Các connection sẽ được luân phiên sử dụng.
// Hạn chế việc connect liên tục đến database, đảm bảo hiệu suất ctrinh

const connectMysql = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: process.env.DATABASE_PASSWORD, //Truong 1: truong050123 //Truong 2: root //Vinh: 12345
  database: process.env.DATABASE_MY_SQL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default connectMysql
