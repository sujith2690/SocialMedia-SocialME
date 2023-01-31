import  express  from "express";
import { deleteUser, followUser, getUser, UnFollowUser, updateUser, getUnfollowedUser, getAllFollowUser, getAllUnfollowUsers, getNotifications, clearNotifications, searchUser } from "../Controllers/UserController.js"
import authMiddleWare from "../Middleware/Middleware.js";
const router = express.Router()

router.get('/',authMiddleWare,getAllUnfollowUsers)

router.post('/searchUser',authMiddleWare,searchUser)
router.get('/:id/allfollow',authMiddleWare,getAllFollowUser)
router.get('/:id/UnfollowedUser',authMiddleWare,getUnfollowedUser)


router.get('/:id',authMiddleWare,getUser)
router.put('/:id',authMiddleWare,updateUser)
router.delete('/:id',authMiddleWare,deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare,UnFollowUser)


router.get('/:id/notifications',authMiddleWare,getNotifications)
router.get(`/:id/clearNotifications`,authMiddleWare,clearNotifications)





export default router;
