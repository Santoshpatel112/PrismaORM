import {Router} from 'express';
import userRouter from './UserRoute.js';
import PostRouter from './PostRoute.js';
const router =Router();

router.use('/api/user',userRouter);
router.use('api/post',PostRouter);
export default router;