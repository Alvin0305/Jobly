import express from "express";
import {
  deleteUser,
  getMutualFriends,
  getUserFollowers,
  getUserFollowing,
  getUserNotifications,
  searchUsers,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { uploadUserAvatar } from "../controllers/uploadController.js";

const router = express.Router();

router.get("/followers", protect, getUserFollowers); // for logged in user
router.get("/following", protect, getUserFollowing); // for logged in user
router.get("/mutual", protect, getMutualFriends);

router.get("/followers/:id", protect, getUserFollowers); // for any user
router.get("/following/:id", protect, getUserFollowing); // for any user
router.get("/mutual/:id", protect, getMutualFriends);

router.get("/notification/:id", protect, getUserNotifications);

router.put("/:id", protect, updateUser);


router.delete("/:id", protect, deleteUser);

router.post("/search", protect, searchUsers);
// make sure the key value being based is image not images
router.post("/upload", upload.single("image"), uploadUserAvatar);

router.get("/:id", protect, getUserById);

export default router;
