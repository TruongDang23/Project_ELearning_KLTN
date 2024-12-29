import express from 'express'
import authController from '../controllers/authController.js'
import notificationController from '../controllers/notificationController.js'

const notificationRouter = express.Router()

notificationRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'instructor', 'student'),
    notificationController.getByID
  )

notificationRouter
  .route('/:id/:notifyID')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'instructor', 'student'),
    notificationController.updateRead
  )

export default notificationRouter
