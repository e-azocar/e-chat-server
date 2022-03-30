import { Router } from "express";
import { getUser, loginController, registerController, getMe } from "../controllers/user";
const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.get('/user/:id', getUser)
router.get('/me', getMe)

export default router