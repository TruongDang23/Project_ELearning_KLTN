import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  log: {
    type: Object,
    required: [true, 'Data log is required']
  }
})

const PaymentList = mongoose.model('payment', paymentSchema, 'log_payment')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default PaymentList
