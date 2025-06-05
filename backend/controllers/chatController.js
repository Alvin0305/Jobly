import {
  clearChatFunction,
  createChatFunction,
  fetchMediaInChatFunction,
  getMessagesInChatFunction,
  getPinnedMessageFunction,
  getUserChatsFunction,
  pinMessageFunction,
  unpinMessageFunction,
} from "../models/chat.js";

export const createChat = async (req, res) => {
  const user1_id = req.user?.id;
  const { user2_id } = req.body;

  try {
    const newChat = await createChatFunction(user1_id, user2_id);
    if (!newChat)
      return res.status(400).json({ error: "Failed to create chat" });
    res.json(newChat);
  } catch (err) {
    console.log("Failed to create chat");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getUserChats = async (req, res) => {
  const user1_id = req.user?.id;
  try {
    const chats = await getUserChatsFunction(user1_id);
    res.json(chats);
  } catch (err) {
    console.log("Failed to get chats");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getMessagesInChat = async (req, res) => {
  const chat_id = req.params.id;
  try {
    const messages = await getMessagesInChatFunction(chat_id);
    res.json(messages);
  } catch (err) {
    console.log("Failed to get messages");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getPinnedMessage = async (req, res) => {
  const chat_id = req.params.id;

  try {
    const pinnedMessage = await getPinnedMessageFunction(chat_id);
    res.json(pinnedMessage);
  } catch (err) {
    console.log("Failed to get pinned message");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const fetchMediaInChat = async (req, res) => {
  const chat_id = req.params.id;
  try {
    const media = await fetchMediaInChatFunction(chat_id);
    res.json(media);
  } catch (err) {
    console.log("Failed to get media");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const clearChat = async (req, res) => {
  const chat_id = req.params.id;
  try {
    await clearChatFunction(chat_id);
    res.json({ message: "chat cleared succesfully" });
  } catch (err) {
    console.log("Failed to clear chat");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const pinMessage = async (req, res) => {
  const message_id = req.params.id;
  try {
    const pinnedMessage = await pinMessageFunction(message_id);
    if (!pinnedMessage)
      return res.status(400).json({ error: "Failed to pin message" });
    res.json(pinnedMessage);
  } catch (err) {
    console.log("Failed to pin message");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const unpinMessage = async (req, res) => {
  const message_id = req.params.id;
  try {
    const unpinnedMessage = await unpinMessageFunction(message_id);
    if (!unpinnedMessage)
      return res.status(400).json({ error: "Failed to unpin message" });
    res.json(unpinnedMessage);
  } catch (err) {
    console.log("Failed to unpin message");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
