import { uploadToCloudinary } from "../models/upload.js";

// make sure the key value being based is image not images
export const uploadUserAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await uploadToCloudinary(req.file.buffer, "user");
    return res.json({
      file_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log("file upload error");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// make sure the key value being based is images not image
export const uploadPostImages = async (req, res) => {
  try {
    if (!req.files || !req.files.length)
      return res.status(400).json({ error: "No files uploaded" });

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, "post")
    );

    const results = await Promise.all(uploadPromises);

    res.json({
      uploaded: results.map((result) => ({
        file_url: result.secure_url,
        public_id: result.public_id,
      })),
    });
  } catch (err) {
    console.log("files upload error");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// make sure the key value being based is images not image
export const uploadJobImages = async (req, res) => {
  try {
    if (!req.files || !req.files.length)
      return res.status(400).json({ error: "No files uploaded" });

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, "job")
    );

    const results = await Promise.all(uploadPromises);

    res.json({
      uploaded: results.map((result) => ({
        file_url: result.secure_url,
        public_id: result.public_id,
      })),
    });
  } catch (err) {
    console.log("files upload error");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// make sure the key value being based is images not image
export const uploadChatImages = async (req, res) => {
  try {
    if (!req.files || !req.files.length)
      return res.status(400).json({ error: "No files uploaded" });

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, "chat")
    );

    const results = await Promise.all(uploadPromises);

    res.json({
      uploaded: results.map((result) => ({
        file_url: result.secure_url,
        public_id: result.public_id,
      })),
    });
  } catch (err) {
    console.log("files upload error");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
