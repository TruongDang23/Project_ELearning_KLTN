import { server } from './app.js'
import connectMongo from './config/connMongo.js'
import './controllers/socketController.js'

const PORT = process.env.PORT || 3000
connectMongo()

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
