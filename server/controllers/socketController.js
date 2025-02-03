import { Server } from 'socket.io'
import { server } from '../app' // Import HTTP server from app.js

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('sendMessage', (data) => {
    console.log('Message received:', data)
    io.emit('receiveMessage', data) // Broadcast to all users
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

export { io }
