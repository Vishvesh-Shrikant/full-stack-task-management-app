import {Router} from "express";
import {registerUser, loginUser, checkRefreshToken, logoutUser} from '../controller/authController.js'


const router= Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/checkRefreshToken', checkRefreshToken)
router.post('/logout', logoutUser)

export default router;