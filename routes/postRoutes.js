import express from "express";
import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { authorizePostAccess, protect } from "../middleware/authMiddleware.js";  
import { paginate } from "../middleware/paginate.js";
import Post from "../models/postModel.js";

const router = Router();

router.get("/", paginate(Post), getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);

router.get("/",
  paginate(Post, {
    populate: {
      path: "author",
      select: "password"
    },
  }),
  getPosts
);

router.use(protect);
router.patch("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;