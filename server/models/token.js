import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  refresh_token: {
    type: String,
    required: [true, 'Token is required'],
    unique: true
  }
})

const TokenList = mongoose.model('token', tokenSchema, 'token_list')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default TokenList
