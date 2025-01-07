import app from './app.js'
import connectMongo from './config/connMongo.js'

const PORT = process.env.PORT || 3000
connectMongo()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
