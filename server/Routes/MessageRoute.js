import express from "express";
import { addMessage, getMesssages } from "../Controllers/MessageController.js";

const router = express.Router()


router.post('/', addMessage)
router.get('/:chatId', getMesssages)

export default router