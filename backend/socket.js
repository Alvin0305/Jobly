import { joinUserOnLoggin } from "./socketControllers/authController.js";
import {
  deleteMessage,
  disconnect,
  joinChat,
  joinUser,
  pinMessage,
  readMessages,
  sendMessage,
  unpinMessage,
  updateMessage,
} from "./socketControllers/chatController.js";
import {
  createJob,
  replyJob,
  JobRequestAccept,
} from "./socketControllers/jobController.js";
import {
  commentPost,
  likePost,
  sendConnectionRequest,
  sendDisconnectionRequest,
  unlikePost,
} from "./socketControllers/notificationController.js";

export const configureSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("user_joined", (user_id) => {
      joinUser({ user_id, socket });
    });
    socket.on("user_opened_chat", (user_id, chat) =>
      joinChat({ user_id, chat, socket, io })
    );
    socket.on("read_messages", (user_id, chat) =>
      readMessages({ user_id, chat, io })
    );
    socket.on("send_message", (messageData, chat) =>
      sendMessage({ messageData, chat, io })
    );
    socket.on("delete_message", (message_id, sender_id, receiver_id) =>
      deleteMessage({ message_id, sender_id, receiver_id, io })
    );
    socket.on("update_message", (messageData, chat) =>
      updateMessage({ messageData, chat, io })
    );
    socket.on("pin_message", (message_id, chat) =>
      pinMessage({ message_id, chat, io })
    );
    socket.on("unpin_message", (message_id, chat) =>
      unpinMessage({ message_id, chat, io })
    );
    socket.on("disconnect", () => disconnect());

    socket.on("create_job", (jobData) => createJob(jobData, io));
    socket.on("reply_to_job",({jobId,employeeId}) =>{replyJob(employeeId,jobId,io)});
    socket.on("accepted_job_requests",({employerId,jobId,employeeId}) =>{JobRequestAccept(jobId,employeeId,employerId,io)})

    socket.on("like_post", (user_id, post_id) =>
      likePost(user_id, post_id, io)
    );
    socket.on("unlike_post", (user_id, post_id) =>
      unlikePost(user_id, post_id, io)
    );
    socket.on("comment_post", async (user_id, post_id, comment) =>
      commentPost(user_id, post_id, comment, io)
    );
    socket.on("send_connection_request", (sender_id, receiver_id) =>
      sendConnectionRequest(sender_id, receiver_id, io)
    );
    socket.on("send_disconnection_request", (sender_id, receiver_id) =>
      sendDisconnectionRequest(sender_id, receiver_id, io)
    );
    
  });
};
