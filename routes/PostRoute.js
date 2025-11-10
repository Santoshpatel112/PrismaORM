import { Router } from "express";
const router=Router();
 import {
   createPost,
   deletePost,
   FetchAllPost,
   UpdatePost,
   ShowPost,
 } from "../Controllers/PostControllers.js";
 router.post('/',createPost);
 router.delete('/:id',deletePost);
 router.get('/',FetchAllPost);
 router.get('/',ShowPost);
 router.put('/:id',UpdatePost);