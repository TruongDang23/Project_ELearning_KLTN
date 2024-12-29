import express from 'express'
import authController from '../controllers/authController.js'
import studentController from '../controllers/studentController.js'

const studentRouter = express.Router()

studentRouter.route('/:id').get(studentController.getByID)

studentRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    studentController.getAll
  )

studentRouter
  .route('/:id')
  .put(
    authController.protect,
    authController.restrictTo('student', 'admin'),
    studentController.update
  )

studentRouter
  .route('/:id/:courseID/:lectureID/updateprogress')
  .post(
    authController.protect,
    authController.restrictTo('student', 'admin'),
    studentController.updateProgressCourse
  )

studentRouter
  .route('/:id/:courseID/ratings')
  .post(
    authController.protect,
    authController.restrictTo('student', 'admin'),
    studentController.reviewCourse
  )

studentRouter
  .route('/:id/buy/:courseID')
  .post(
    authController.protect,
    authController.restrictTo('student', 'admin'),
    studentController.buyCourse
  )

export default studentRouter
