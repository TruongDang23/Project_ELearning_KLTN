import express from 'express'
import authController from '../controllers/authController.js'

const guestRouter = express.Router()

guestRouter.route('/signup').post(authController.signup)
guestRouter.route('/login').post(authController.login)
guestRouter.route('/loginWithGoogle').post(authController.loginWithGoogle)
guestRouter.route('/logout').post(authController.logout)
guestRouter.route('/refreshtoken').post(authController.refreshToken)
guestRouter.route('/get-token').get(authController.getToken)
export default guestRouter
