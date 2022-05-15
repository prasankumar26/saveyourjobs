import express from 'express'
const router = express.Router()

import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
 message: 'Too many requests from this IP address, Please try again after 15 minutes...'
})

import {register, login, updateUser} from '../controllers/authController.js'

import authenticateUser from '../middleware/auth.js'

router.route('/register').post(apiLimiter,register)
router.route('/login').post(apiLimiter,login)
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router