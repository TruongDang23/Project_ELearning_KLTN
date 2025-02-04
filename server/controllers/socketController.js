/* eslint-disable no-console */
import { getListCourseBaseUserID } from './courseController.js'
import { io } from '../app.js'

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
