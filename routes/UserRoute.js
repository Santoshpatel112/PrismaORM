import { Router } from "express";
const router =Router();
import { createUser } from "../Controllers/UserControllers";

router.post('/',createUser)

export default router; 