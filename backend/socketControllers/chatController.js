import {
  createMessageFunction,
  deleteMessageFunction,
  getMessageByIdFunction,
  pinMessageFunction,
  readMessagesFunction,
  unpinMessageFunction,
  updateMessageFunction,
} from "../models/message.js";

export const joinChat = async ({ user_id, chat_id, socket, io }) => {
  socket.join(`chat_${chat_id}`);
  console.log(`User ${user_id} joined chat_${chat_id}`);

  // mark the messages are read when the user opens the chat
  readMessages({ user_id, chat_id, io });
};

export const joinUser = async ({ user_id, socket }) => {
  console.log(user_id);
  socket.join(`user_${user_id}`);
  console.log(`User ${user_id}, joined`);
};

export const readMessages = async ({ user_id, chat_id, io }) => {
  try {
    const messagesRead = await readMessagesFunction(chat_id, user_id);
    io.to(`chat_${chat_id}`).emit("messages_read", {
      chat_id,
      reader_id: user_id,
      messages_id: messagesRead,
    });
  } catch (err) {
    console.log("marking messages failed");
    console.log(err);
  }
};

export const sendMessage = async ({ messageData, io }) => {
  console.log("received data", messageData);
  try {
    const newMessage = await createMessageFunction(messageData);
    let replyInfo;

    if (newMessage.reply_to) {
      replyInfo = getMessageByIdFunction(newMessage.reply_to);
    }

    newMessage.reply_info = replyInfo || null;
    newMessage.seen_by = [];

    io.to(`user_${messageData.other_user_id}`).emit(
      "receive_message",
      newMessage
    );
  } catch (err) {
    console.log("send message failed");
    console.log(err);
  }
};

export const deleteMessage = async ({
  message_id,
  sender_id,
  receiver_id,
  io,
}) => {
  try {
    const deletedMessage = await deleteMessageFunction(message_id);
    console.log(`message deleting for ${sender_id} and ${receiver_id} `);
    console.log(deletedMessage);
    io.to(`user_${sender_id}`).emit("message_deleted", deletedMessage);
    io.to(`user_${receiver_id}`).emit("message_deleted", deletedMessage);
  } catch (err) {
    console.log("Failed to delete message");
    console.log(err);
  }
};

export const updateMessage = async ({ messageData, chat_id, io }) => {
  try {
    const updatedMessage = await updateMessageFunction(messageData);
    io.to(`chat_${chat_id}`).emit("message_updated", { updatedMessage });
  } catch (err) {
    console.log("Failed to update message");
    console.log(err);
  }
};

export const pinMessage = async ({ message_id, chat, io }) => {
  try {
    const pinnedMessage = await pinMessageFunction(message_id);
    io.to(`user_${chat.user1_id}`).emit("message_pinned", pinnedMessage);
    io.to(`user_${chat.user2_id}`).emit("message_pinned", pinnedMessage);
  } catch (err) {
    console.log("Failed to pin message");
    console.log(err);
  }
};

export const unpinMessage = async ({ message_id, chat, io }) => {
  try {
    const unpinnedMessage = await unpinMessageFunction(message_id);
    io.to(`user_${chat.user1_id}`).emit("message_unpinned", unpinnedMessage);
    io.to(`user_${chat.user2_id}`).emit("message_unpinned", unpinnedMessage);
  } catch (err) {
    console.log("Failed to unpin message");
    console.log(err);
  }
};

export const disconnect = async (chat_id, user_id, socket) => {
  console.log("user disconnected");
  // console.log(
  //   `user ${user_id} disconnected from ${chat_id} with socket id: ${socket.id}`
  // );
};
