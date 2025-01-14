import express from 'express'
import authController from '../controllers/authController.js'
import courseController from '../controllers/courseController.js'
import { checkAccessCourse } from '../utils/precheckAccess.js'

const courseRouter = express.Router()

courseRouter.route('/:id/summary').get(courseController.getCourseById)

courseRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    courseController.getAllCourses
  )

courseRouter.route('/search').get(courseController.searchCourse)

courseRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'instructor', 'student'),
    checkAccessCourse,
    courseController.accessCourse
  )

courseRouter
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('instructor'),
    courseController.createCourse
  )

courseRouter
  .route('/:id')
  .put(
    authController.protect,
    authController.restrictTo('instructor'),
    courseController.updateCourse
  )

export default courseRouter
