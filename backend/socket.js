import {
  deleteMessage,
  disconnect,
  joinChat,
  readMessages,
  sendMessage,
  updateMessage,
} from "./socketControllers/chatController.js";
import { createJob, replyJob } from "./socketControllers/jobController.js";
import {
  commentPost,
  likePost,
  sendConnectionRequest,
} from "./socketControllers/notificationController.js";

export const configureSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("join_chat", joinChat);
    socket.on("read_messages", readMessages);
    socket.on("send_message", sendMessage);
    socket.on("delete_message", deleteMessage);
    socket.on("update_message", updateMessage);
    socket.on("disconnect", disconnect);

    socket.on("create_job", createJob);
    socket.on("reply_to_job", replyJob);

    socket.on("like_post", likePost);
    socket.on("comment_post", commentPost);
    socket.on("send_connection_request", sendConnectionRequest);
  });
};
