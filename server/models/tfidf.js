import mongoose from 'mongoose'

const TfidfSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true
  },
  vector: {
    type: [Number],
    required: true
  }
})

const TfidfList = mongoose.model('tfidf', TfidfSchema, 'tfidf_vectors')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default TfidfList