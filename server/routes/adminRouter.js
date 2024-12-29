import express from 'express'
import authController from '../controllers/authController.js'

const adminRouter = express.Router()

adminRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    authController.getUser
  )

export default adminRouter
