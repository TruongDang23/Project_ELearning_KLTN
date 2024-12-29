import express from 'express'
import authController from '../controllers/authController.js'

const guestRouter = express.Router()

guestRouter.route('/signup').post(authController.signup)
guestRouter.route('/login').post(authController.login)
guestRouter.route('/loginWithGoogle').post(authController.loginWithGoogle)

export default guestRouter
