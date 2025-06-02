import express from "express";
import {
  deleteUser,
  getMutualFriends,
  getUserFollowers,
  getUserFollowing,
  getUserNotifications,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/followers/:id", protect, getUserFollowers);
router.get("/following/:id", protect, getUserFollowing);
router.get("/mutual/:id", protect, getMutualFriends);
router.get("/notification/:id", protect, getUserNotifications);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
