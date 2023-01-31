import  express  from "express";
import { blockUser, getAllUser, getReportedPost, removePost, verifyUser } from "../Controllers/AdminController.js";
import { loginAdmin, registerAdmin } from "../Controllers/AuthController.js";


const router = express.Router()

router.post('/adminregister', registerAdmin)
router.post('/adminlogin', loginAdmin)
router.put('/:id/block',blockUser)
router.put('/:id/verify',verifyUser)
router.post('/:id/remove',removePost)


router.get('/getalluser',getAllUser)
router.get('/reportedPosts',getReportedPost)
export default router;

