import mongoose from 'mongoose'

const EmbeddedSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true // error code = 11000 => duplicate field URL
  },
  type: {
    type: String,
    required: true
  },
  is_embedded: {
    type: Boolean
  }
})

const EmbeddedList = mongoose.model('embedded', EmbeddedSchema, 'process_embedded_course')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default EmbeddedList