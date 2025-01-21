import express from 'express'
import authController from '../controllers/authController.js'
import adminController from '../controllers/adminController.js'
import { uploadTemp } from '../utils/multer.js'
const adminRouter = express.Router()

adminRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.getByID
  )

adminRouter
  .route('/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.update
  )

adminRouter
  .route('/avatar/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    uploadTemp.any(),
    adminController.updateAvatar
  )

adminRouter
  .route('/accept/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.approveCourse
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
  .route('/:id/:courseID/:lectureID/QA')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.getQnA
  )

adminRouter
  .route('/locked/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.blockUser
  )

export default adminRouter
