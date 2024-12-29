import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

// Import các route
import guestRouter from './routes/guestRouter.js'
import adminRouter from './routes/adminRouter.js'

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

export default app
