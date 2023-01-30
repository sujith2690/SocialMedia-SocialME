import  express  from "express";
import { deleteUser, followUser, getUser, UnFollowUser, updateUser, getUnfollowedUser, getAllFollowUser, verifyUser, blockUser, postReport, getAllUnfollowUsers, getNotifications, getseenNotifications } from "../Controllers/UserController.js"
import authMiddleWare from "../Middleware/Middleware.js";
const router = express.Router()

router.get('/',authMiddleWare,getAllUnfollowUsers)
router.get('/:id/allfollow',authMiddleWare,getAllFollowUser)

router.get('/:id',authMiddleWare,getUser)
router.put('/:id',authMiddleWare,updateUser)
router.delete('/:id',authMiddleWare,deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare,UnFollowUser)
router.put('/:id/report',authMiddleWare,postReport)
router.post('/UnfollowedUser',authMiddleWare,getUnfollowedUser)

router.get('/:id/notifications',authMiddleWare,getNotifications)
router.get('/:id/seennotifications',authMiddleWare,getseenNotifications)

router.put('/:id/verify',authMiddleWare,verifyUser)
router.put('/:id/block',authMiddleWare,blockUser)


export default router;
