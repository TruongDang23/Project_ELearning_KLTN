import express from 'express'
import authController from '../controllers/authController.js'
import studentController from '../controllers/studentController.js'
import { checkAccessCourse } from '../utils/precheckAccess.js'
import userController from '../controllers/userController.js'
import { uploadTemp } from '../utils/multer.js'

const studentRouter = express.Router()

studentRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'student'),
    studentController.getByID
  )

studentRouter
  .route('/avatar/:id')
  .put(
    authController.protect,
    authController.restrictTo('student'),
    uploadTemp.any(),
    userController.updateAvatar
  )

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
  .route('/:courseID/:lectureID/updateprogress')
  .post(
    authController.protect,
    authController.restrictTo('student'),
    studentController.updateProgressCourse
  )

studentRouter
  .route('/:courseID/ratings')
  .post(
    authController.protect,
    checkAccessCourse,
    authController.restrictTo('student'),
    studentController.reviewCourse
  )

studentRouter
  .route('/buy/:courseID')
  .post(
    authController.protect,
    authController.restrictTo('student'),
    studentController.buyCourse
  )

studentRouter
  .route('/:id/:lectureID/QA')
  .post(
    authController.protect,
    checkAccessCourse,
    authController.restrictTo('admin', 'instructor', 'student'),
    userController.newQnA
  )

export default studentRouter
