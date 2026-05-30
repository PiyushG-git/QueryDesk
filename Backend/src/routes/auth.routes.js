import {Router} from 'express'
import { loginValidator, registerValidator } from '../validators/auth.validator.js'
import { getMe, login, register, verifyEmail, logout, deleteAccount } from '../controllers/auth.controller.js'
import { authUser } from '../middleware/auth.middleware.js'


const authRouter = Router()


authRouter.post("/register",registerValidator,register)

authRouter.get('/verify-email',verifyEmail)


authRouter.post("/login",loginValidator,login)

authRouter.get('/get-me',authUser,getMe)

authRouter.post('/logout', logout)

authRouter.delete('/delete', authUser, deleteAccount)

export default authRouter