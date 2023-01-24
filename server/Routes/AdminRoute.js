import  express  from "express";
import { loginAdmin, registerAdmin } from "../Controllers/AuthController.js";


const router = express.Router()

router.post('/adminregister', registerAdmin)
router.post('/adminlogin', loginAdmin)

export default router;

