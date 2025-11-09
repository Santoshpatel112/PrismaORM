import { Router } from "express";
const router =Router();
import { createUser, findAllUser, updateUser } from "../Controllers/UserControllers.js";

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/',findAllUser);
export default router; 