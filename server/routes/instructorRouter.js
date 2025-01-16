import express from 'express'
import authController from '../controllers/authController.js'
import instructorController from '../controllers/instructorController.js'
import { uploadTemp } from '../utils/multer.js'

const instructorRouter = express.Router()

instructorRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    instructorController.getAll
  )

instructorRouter
  .route('/:id')
  .get(authController.protect, instructorController.getByID)

instructorRouter
  .route('/:id')
  .put(
    authController.protect,
    authController.restrictTo('instructor', 'admin'),
    instructorController.update
  )

instructorRouter
  .route('/avatar/:id')
  .put(
    authController.protect,
    authController.restrictTo('instructor'),
    uploadTemp.any(),
    instructorController.updateAvatar
  )

instructorRouter
  .route('/sendapprove/:courseID')
  .put(
    authController.protect,
    authController.restrictTo('instructor'),
    instructorController.sendApproveCourse
  )

export default instructorRouter
