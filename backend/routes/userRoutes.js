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
import upload from "../middlewares/multer.js";
import { uploadUserAvatar } from "../controllers/uploadController.js";

const router = express.Router();

router.get("/followers/:id", getUserFollowers);
router.get("/following/:id", getUserFollowing);
router.get("/mutual/:id", getMutualFriends);
router.get("/notification/:id", getUserNotifications);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/search", searchUsers);
router.get("/followers/:id", protect, getUserFollowers);
router.get("/following/:id", protect, getUserFollowing);
router.get("/mutual/:id", protect, getMutualFriends);
router.get("/notification/:id", protect, getUserNotifications);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.post("/search", protect, searchUsers);
// make sure the key value being based is image not images
router.post("/upload", upload.single("image"), uploadUserAvatar);

export default router;
