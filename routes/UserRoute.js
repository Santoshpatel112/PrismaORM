import { Router } from "express";
const router =Router();
import {
  createUser,
  findAllUser,
  updateUser,
  DeleteUser,
} from "../Controllers/UserControllers.js";

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/',findAllUser);
router.delete('/:id',DeleteUser)
export default router; 