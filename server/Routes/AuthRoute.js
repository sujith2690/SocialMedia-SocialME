import  express  from "express";
import { loginUser, registerUser,otpVerify, searchUser, registerAdmin, loginAdmin } from "../Controllers/AuthController.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/otpVerify',otpVerify)
router.get('/searchUser',searchUser)

// router.post('/adminregister', registerAdmin)
// router.post('/adminlogin', loginAdmin)
export default router;