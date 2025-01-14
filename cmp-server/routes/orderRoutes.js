import {Router} from 'express'
import verifyToken from '../middleware/verifyUser.js'
import { getOrders, addOrders } from '../controller/orderController.js'
const router= Router()

router.get('/getOrders', verifyToken, getOrders )
router.post('/postOrders', verifyToken, addOrders)

export default router;