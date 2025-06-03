import express from "express";
import {
  deleteUser,
  getMutualFriends,
  getUserFollowers,
  getUserFollowing,
  getUserNotifications,
  searchUsers,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/followers/:id", getUserFollowers);
router.get("/following/:id", getUserFollowing);
router.get("/mutual/:id", getMutualFriends);
router.get("/notification/:id", getUserNotifications);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/search", searchUsers);

export default router;
