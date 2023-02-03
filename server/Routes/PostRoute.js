import  express  from "express";
import { createPost, deletePost, getPost, getTimeLinePosts, likePost, updatePost,commentPost, getComments, savePost, savedPost, postReport, removePost } from "../Controllers/PostController.js";
import authMiddleWare from "../Middleware/Middleware.js";
const router = express.Router()

router.post('/',authMiddleWare,createPost)
router.get('/:id',authMiddleWare, getPost)
router.put('/:id',authMiddleWare,updatePost)
router.delete('/:id/delete',authMiddleWare,deletePost)
router.put("/:id/like",authMiddleWare, likePost)

router.get('/:id/timeline',authMiddleWare, getTimeLinePosts)
router.post('/comment',authMiddleWare,commentPost)
router.get('/:id/commnets',authMiddleWare,getComments)
router.put('/:id/report',authMiddleWare,postReport)
router.post('/:id/remove',authMiddleWare,removePost)

router.put('/:id/save',authMiddleWare,savePost)
router.get('/:id/saved',authMiddleWare,savedPost)

export default router;