import express from 'express'
import authController from '../controllers/authController.js'
import dashboardController from '../controllers/dashboardController.js'

const dashboardRouter = express.Router()

dashboardRouter
  .route('/')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .get(dashboardController.loadDataDashboard)

dashboardRouter
  .route('/statistic-course')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .get(dashboardController.getCourseStatistics)

dashboardRouter
  .route('/statistic-user')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .get(dashboardController.getUserStatistics)

dashboardRouter
  .route('/statistic-category')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .get(dashboardController.getCourseByCategory)

dashboardRouter
  .route('/statistic-review')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .get(dashboardController.getRatingStatistics)

export default dashboardRouter
