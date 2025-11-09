import { Router } from "express";
const router =Router();
import { createUser, updateUser } from "../Controllers/UserControllers.js";

router.post('/', createUser);
router.put('/:id', updateUser);
export default router; 