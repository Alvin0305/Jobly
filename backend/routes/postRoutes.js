import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getComments,
  getPostById,
  getPostsByUser,
  getPostsInFeed,
  searchPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createPost);
router.delete("/", protect, deletePost);
router.get("/user/:id", protect, getPostsByUser);
router.get("/feed", protect, getPostsInFeed);
router.get("/:id", protect, getPostById);
router.get("/comments/:id", protect, getComments);
router.post("/search", protect, searchPosts);

export default router;
