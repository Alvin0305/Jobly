import express from "express";
import upload from "../middlewares/multer.js";
import { uploadChatImages } from "../controllers/uploadController.js";
import {
  clearChat,
  createChat,
  fetchMediaInChat,
  getMessagesInChat,
  getPinnedMessage,
  getUserChats,
  pinMessage,
  unpinMessage,
} from "../controllers/chatController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const maxUploadCount = 5;

// make sure the key value being based is images not image
router.post(
  "/upload",
  upload.array("images", maxUploadCount),
  uploadChatImages
);
router.post("/", protect, createChat);
router.get("/", protect, getUserChats);
router.get("/:id", protect, getMessagesInChat);
router.get("/pinned/:id", protect, getPinnedMessage);
router.get("/media/:id", protect, fetchMediaInChat);
router.delete("/:id", protect, clearChat);
router.patch("/pin/:id", protect, pinMessage);
router.patch("/unpin/:id", protect, unpinMessage);

export default router;
