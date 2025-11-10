import { Router } from 'express';
const router = Router();
import { createComment, deleteComment } from '../Controllers/CommentControllers.js';

router.post('/', createComment);
router.delete('/:id', deleteComment);

export default router;