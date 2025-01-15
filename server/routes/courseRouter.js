import express from 'express'
import authController from '../controllers/authController.js'
import courseController from '../controllers/courseController.js'
import { checkAccessCourse } from '../utils/precheckAccess.js'
import { uploadDisk } from '../utils/multer.js'

const courseRouter = express.Router()

courseRouter.route('/:id/summary').get(courseController.getCourseById)

courseRouter.route('/search').get(courseController.searchCourse)

courseRouter
  .route('/')
  .all(authController.protect)
  .get(
    authController.restrictTo('admin'),
    courseController.getAllCourses
  )
  .post(
    authController.restrictTo('instructor'),
    courseController.createCourse
  )

courseRouter
  .route('/:id')
  .all(authController.protect)
  .get(
    authController.restrictTo('admin', 'instructor', 'student'),
    checkAccessCourse,
    courseController.accessCourse
  )
  .put(
    authController.restrictTo('instructor'),
    courseController.updateCourse
  )

courseRouter
  .route('/attach')
  .post(
    authController.protect,
    authController.restrictTo('instructor'),
    uploadDisk.any(),
    courseController.uploadFileGCS
  )

courseRouter
  .route('/:id/:lectureID/QA')
  .all(authController.protect)
  .all(checkAccessCourse)
  .post(
    authController.restrictTo('instructor', 'student'),
    courseController.newQnA
  )
  .get(
    authController.restrictTo('instructor', 'student', 'admin'),
    courseController.getQnA
  )

export default courseRouter
