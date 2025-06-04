import express from "express";
import upload from "../middlewares/multer.js";
import { uploadChatImages } from "../controllers/uploadController.js";

const router = express.Router();
const maxUploadCount = 5;

// make sure the key value being based is images not image
router.post(
  "/upload",
  upload.array("images", maxUploadCount),
  uploadChatImages
);

export default router;
