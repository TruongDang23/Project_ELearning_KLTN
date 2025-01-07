import mongo from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

// Kết nối đến MongoDB
const connectMongo = async () => {
  try {
    // console.log(process.env)
    await mongo.connect(process.env.CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Error connecting to MongoDB', err)
    process.exit(1) // Dừng ứng dụng nếu không thể kết nối CSDL
  }
}

export default connectMongo
