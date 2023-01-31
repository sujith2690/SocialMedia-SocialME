import  express  from "express";
import { createPost, deletePost, getPost, getTimeLinePosts, likePost, updatePost,commentPost, getComments, savePost, savedPost, postReport, removePost } from "../Controllers/PostController.js";
const router = express.Router()

router.post('/',createPost)
router.get('/:id', getPost)
router.put('/:id',updatePost)
router.delete('/:id/delete',deletePost)
router.put("/:id/like", likePost)

router.get('/:id/timeline', getTimeLinePosts)
router.post('/comment',commentPost)
router.get('/:id/commnets',getComments)
router.put('/:id/report',postReport)
router.post('/:id/remove',removePost)

router.put('/:id/save',savePost)
router.get('/:id/saved',savedPost)

export default router;