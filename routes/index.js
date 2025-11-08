import {Router} from 'express';
import userRouter from './UserRoute.js';

const router =Router();

router.use('/api/user',userRouter);

export default router;