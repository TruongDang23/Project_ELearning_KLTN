import express from 'express'
import authController from '../controllers/authController.js'
import modelController from '../controllers/modelController.js'

const modelRouter = express.Router()

modelRouter.post('/chatAI/:id', authController.protect, modelController.chatAI)

modelRouter.post('/extractPDF', modelController.extractPDFText)

modelRouter.get('/recommend-course', authController.protect, modelController.recommendCourse)

modelRouter.get('/calculate-tfidf-vectors', modelController.calculateVectors)

modelRouter.post('/summary-lecture', modelController.summaryLecture)

export default modelRouter
