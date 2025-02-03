/* eslint-disable no-console */
import { Server } from 'socket.io'
import { server } from '../app.js' // Import HTTP server from app.js
import { getListCourseBaseUserID } from './courseController.js'

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('joinListRooms', async (userID, role) => {
    console.log('UserID', userID, role)
    const data = await getListCourseBaseUserID(userID, role)
    data.forEach(course => {
      console.log('join room: ', course.courseID)
      socket.join(course.courseID)
    })
  })

  socket.on('joinIndividual', (userID) => {
    socket.join(userID)
  })

  socket.on('sendNotify', ({ groupID, data }) => {
    console.log('Message received:', data)
    io.to(groupID).emit('receiveNotify', data) // Broadcast to all users
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

export { io }
