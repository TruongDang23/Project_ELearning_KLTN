import express from 'express'
import authController from '../controllers/authController.js'
import instructorController from '../controllers/instructorController.js'
import userController from '../controllers/userController.js'
import { uploadTemp } from '../utils/multer.js'
import { checkAccessCourse } from '../utils/precheckAccess.js'

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
    userController.updateAvatar
  )

instructorRouter
  .route('/sendapprove/:courseID')
  .put(
    authController.protect,
    authController.restrictTo('instructor'),
    instructorController.sendApproveCourse
  )

instructorRouter
  .route('/cancelapprove/:courseID')
  .put(
    authController.protect,
    authController.restrictTo('instructor'),
    instructorController.cancelApproveCourse
  )

instructorRouter
  .route('/:id/:lectureID/QA')
  .post(
    authController.protect,
    checkAccessCourse,
    authController.restrictTo('admin', 'instructor', 'student'),
    userController.newQnA
  )

instructorRouter
  .route('/change-password/:id')
  .post(
    authController.protect,
    authController.restrictTo('instructor', 'admin'),
    userController.changePassword
  )

export default instructorRouter
