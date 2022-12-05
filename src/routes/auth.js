import authController from '$controllers/user'
import { authen } from '$middlewares/auth'
import { Router } from 'express'

const authRoute = Router()

authRoute.post('/login', authController.login)
authRoute.patch('/logout', [authen, authController.logout])
authRoute.post('/register', authController.register)
authRoute.post('/refreshToken', authController.refreshToken)

export default authRoute
