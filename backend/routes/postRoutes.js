import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPostsByUser,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createPost);
router.delete("/", protect, deletePost);
router.get("/user/:id", protect, getPostsByUser);
router.get("/:id", protect, getPostById);
router.patch("/like", protect, likePost);

export default router;
