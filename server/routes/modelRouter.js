import express from 'express'
import authController from '../controllers/authController.js'
import modelController from '../controllers/modelController.js'

const modelRouter = express.Router()

modelRouter.post('/chatAI', authController.protect, modelController.chatAI)

modelRouter.post('/chatBot', modelController.chatBot)

export default modelRouter
