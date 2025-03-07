import { getListCourseBaseUserID } from './courseController.js'

const registerSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinListRooms', async (userID, role) => {
      if (userID[0] !== 'A') {
        const data = await getListCourseBaseUserID(userID, role)
        data.forEach(course => {
          socket.join(course.courseID)
        })
      }
    })

    socket.on('joinIndividual', (userID) => {
      socket.join(userID)
    })

    socket.on('disconnect', () => {
    })
  })

  //create some functions use socket. Its can be call in other files
  const increaseUnreadNotify = (groupID) => {
    io.to(groupID).emit('increaseUnread')
  }

  return { increaseUnreadNotify }
}

export default registerSocketHandlers