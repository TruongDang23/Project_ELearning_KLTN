/* eslint-disable no-console */
import { getListCourseBaseUserID } from './courseController.js'

const registerSocketHandlers = (io) => {
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

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`)
    })
  })

  //create some functions use socket
  const test = () => {
    io.emit('sendNotify', 'test')
  }

  return { test }
}

export default registerSocketHandlers