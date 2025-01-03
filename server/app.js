import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

// Import các route
import guestRouter from './routes/guestRouter.js'
import adminRouter from './routes/adminRouter.js'
import instructorRouter from './routes/instructorRouter.js'
import studentRouter from './routes/studentRouter.js'
import courseRouter from './routes/courseRouter.js'
import notificationRouter from './routes/notificationRouter.js'
import modelRouter from './routes/modelRouter.js'
import errorHandler from './utils/errorHandler.js'

const app = express()

// Cấu hình CORS
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware log thời gian xử lý request
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`Request to ${req.originalUrl} took ${duration}ms`)
  })
  next()
})

// Sử dụng các route
app.use('/api', guestRouter)
app.use('/api/admin', adminRouter)
app.use('/api/instructor', instructorRouter)
app.use('/api/student', studentRouter)
app.use('/api/course', courseRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/model', modelRouter)
app.use(errorHandler)

export default app
