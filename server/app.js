import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'

// Import các route
import guestRouter from './routes/guestRouter.js'
import adminRouter from './routes/adminRouter.js'
import instructorRouter from './routes/instructorRouter.js'
import studentRouter from './routes/studentRouter.js'
import notificationRouter from './routes/notificationRouter.js'
import modelRouter from './routes/modelRouter.js'
import courseRouter from './routes/courseRouter.js'
import errorHandler from './utils/errorHandler.js'
import masterDataRouter from './routes/masterDataRouter.js'
import dashboardRouter from './routes/dashboardRouter.js'

const app = express()

//Create socket server
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})

//Transfer io to create socket controller
import registerSocketHandlers from './controllers/socketController.js'
//Get function in socket controller
const socketFunction = registerSocketHandlers(io)

// Cấu hình CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://techskillup.online', 'http://localhost:4173'], //yarn dev | production | yarn build
    credentials: true // Cho phép gửi cookie
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

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
app.use('/api/masterdata', masterDataRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/model', modelRouter)
app.use('/api/dashboard', dashboardRouter)

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  })
})

app.use(errorHandler)

export { app, server, io, socketFunction }