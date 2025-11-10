import {Router} from 'express';
import userRouter from './UserRoute.js';
import PostRouter from './PostRoute.js';
import CommentRouter from './CommentRoute.js'
const router =Router();

router.use('/api/user', userRouter);
router.use('/api/post', PostRouter);
router.use('/api/comment',CommentRouter);
export default router;