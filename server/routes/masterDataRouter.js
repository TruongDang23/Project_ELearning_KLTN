import express from 'express'
import authController from '../controllers/authController.js'
import masterDataController from '../controllers/masterDataController.js'

const masterDataRouter = express.Router()

masterDataRouter
  .route('/')
  .get(masterDataController.loadMasterData)

masterDataRouter
  .route('/')
  .all(authController.protect)
  .all(authController.restrictTo('admin'))
  .delete(masterDataController.deleteMasterData)
  .post(masterDataController.addMasterData)

export default masterDataRouter
