import express from 'express'
import { createChat, findChat, userChat } from '../Controllers/ChatController.js'

const router = express.Router()

router.post("/",createChat)
router.get("/:userId",userChat)
router.get("/find/:firstId/:secondId",findChat)

export default router