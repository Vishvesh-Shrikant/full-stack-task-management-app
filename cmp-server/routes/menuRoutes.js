import { Router } from "express";
import verifyToken from "../middleware/verifyUser.js";
import { addMenuItem, deleteMenuItem, getMenuItems, updateMenuItem } from "../controller/menuController.js";
const router= Router()

router.get('/allMenuItems', verifyToken, getMenuItems)
router.post('/addMenuItem', verifyToken, addMenuItem)
router.patch('/updateMenuItem/:id', verifyToken, updateMenuItem)
router.delete('/deleteMenuItem/:id', verifyToken, deleteMenuItem)

export default router