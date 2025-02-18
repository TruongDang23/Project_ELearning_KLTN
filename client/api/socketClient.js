import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_SOCKET

export const socket = io(URL, {
  autoConnect: true
})