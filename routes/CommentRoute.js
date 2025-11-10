import { Router } from 'express';
const router = Router();
import { createComment } from '../Controllers/CommentControllers.js';

router.post('/', createComment);

export default router;