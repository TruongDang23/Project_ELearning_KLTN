import express from 'express'
import authController from '../controllers/authController.js'
import dashboardController from '../controllers/dashboardController.js'

const dashboardRouter = express.Router()

dashboardRouter
  .route('/')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .get(dashboardController.loadDataDashboard)

export default dashboardRouter
