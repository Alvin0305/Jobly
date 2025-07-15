import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { configureSockets } from "./socket.js";
import path from "path"; // --- ADD THIS ---
import { fileURLToPath } from "url"; // --- ADD THIS ---

// import all routes here
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import metadataRoutes from "./routes/metadataRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

// --- ADD THIS BLOCK to handle ES module pathing ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- END OF BLOCK ---

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// --- ADD THIS to serve the static files from the React app ---
// IMPORTANT: Adjust the path if your frontend build folder is located elsewhere
app.use(express.static(path.join(__dirname, "../frontend/build")));
// --- END OF ADDITION ---

configureSockets(io);

// all routes goes here
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/metadata", metadataRoutes);
app.use("/api/chat", chatRoutes);

// --- ADD THIS "catch-all" handler ---
// This must be the LAST route in your file
app.get("*", (req, res) => {
  //          IMPORTANT: Adjust the path if your frontend build folder is located elsewhere
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
