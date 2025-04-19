import express from 'express'
import authController from '../controllers/authController.js'
import voucherController from '../controllers/voucherController.js'
const voucherRouter = express.Router()

voucherRouter
  .route('/')
  .all(
    authController.protect,
    authController.restrictTo('admin')
  )
  .post(
    voucherController.createVoucher
  )
  .get(
    voucherController.getAllVouchers
  )

voucherRouter
  .route('/:voucher_code')
  .all(
    authController.protect,
    authController.restrictTo('admin')
  )
  .put(
    voucherController.updateVoucher
  )
  .get(
    voucherController.getVoucher
  )
  .delete(
    voucherController.deleteVoucher
  )
export default voucherRouter
