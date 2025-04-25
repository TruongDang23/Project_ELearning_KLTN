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

voucherRouter
  .route('/match-voucher/:courseID')
  .get(
    authController.protect,
    authController.restrictTo('student'),
    voucherController.getMatchedVouchers
  )

export default voucherRouter
