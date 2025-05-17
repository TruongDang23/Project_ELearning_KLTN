import express from 'express'
import authController from '../controllers/authController.js'
import adminController from '../controllers/adminController.js'
import userController from '../controllers/userController.js'
import { uploadTemp } from '../utils/multer.js'
import { checkAccessCourse } from '../utils/precheckAccess.js'
const adminRouter = express.Router()

adminRouter
  .route('/:id')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .get(
    adminController.getByID
  )
  .put(
    adminController.update
  )

adminRouter
  .route('/avatar/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    uploadTemp.any(),
    userController.updateAvatar
  )

adminRouter
  .route('/accept/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.approveCourse
  )

adminRouter
  .route('/republish/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.republishCourse
  )

adminRouter
  .route('/reject/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.rejectCourse
  )

adminRouter
  .route('/terminate/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.terminateCourse
  )

adminRouter
  .route('/locked/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.lockUser
  )

adminRouter
  .route('/unlocked/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.unLockUser
  )

adminRouter
  .route('/:id/:lectureID/QA')
  .post(
    authController.protect,
    checkAccessCourse,
    authController.restrictTo('admin', 'instructor', 'student'),
    userController.newQnA
  )

adminRouter
  .route('/upload-course-knowledge')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    uploadTemp.any(),
    adminController.addFileToEmbedded
  )

adminRouter
  .route('/embedded-course')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.embeddedCourse
  )
export default adminRouter
