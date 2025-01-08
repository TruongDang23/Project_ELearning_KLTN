import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  userID: { 
    type: String,
    required: [true, 'User ID is required'] 
  },
  social_networks: [{ type: String }],
  self_introduce: { type: String },
  expertise: [{ type: String }],
  degrees: [
    {
      school: { type: String },
      falcuty: { type: String },
      begin_time: { type: String },
      end_time: { type: String }
    }
  ],
  projects: [
    {
      title: { type: String },
      link: { type: String },
      description: { type: String }
    }
  ],
  working_history: [
    {
      company: { type: String },
      begin_time: { type: String },
      end_time: { type: String },
      description: { type: String }
    }
  ],
  course_enrolled: [{ type: String }],
  course_published: [{ type: String }]
})

const User = mongoose.model('user', userSchema, 'user')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default User
