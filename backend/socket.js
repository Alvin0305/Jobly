import {
  deleteMessage,
  disconnect,
  joinChat,
  pinMessage,
  readMessages,
  sendMessage,
  unpinMessage,
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

    socket.on("join_chat", (user_id, chat_id) =>
      joinChat({ user_id, chat_id, socket, io })
    );
    socket.on("read_messages", (user_id, chat_id) =>
      readMessages({ user_id, chat_id, io })
    );
    socket.on("send_message", (messageData) =>
      sendMessage({ messageData, io })
    );
    socket.on("delete_message", (message_id, chat_id) =>
      deleteMessage({ message_id, chat_id, io })
    );
    socket.on("update_message", (messageData, chat_id) =>
      updateMessage({ messageData, chat_id, io })
    );
    socket.on("pin_message", (message_id) => pinMessage({ message_id, io }));
    socket.on("unpin_message", (message_id) =>
      unpinMessage({ message_id, io })
    );
    socket.on("disconnect", (chat_id, user_id) =>
      disconnect({ chat_id, user_id, socket })
    );

    socket.on("create_job", createJob);
    socket.on("reply_to_job", replyJob);

    socket.on("like_post", likePost);
    socket.on("comment_post", commentPost);
    socket.on("send_connection_request", sendConnectionRequest);
  });
};
