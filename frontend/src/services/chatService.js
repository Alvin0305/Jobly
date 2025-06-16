import axios from "./axiosInstance";

export const getUserChats = (token) =>
  axios.get(`/api/chat/`, { headers: { Authorization: `Bearer ${token}` } });

export const createChat = (user2_id, token) =>
  axios.post(
    `/api/chat/`,
    { user2_id },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const getMessagesInChat = (chat_id, token) =>
  axios.get(`/api/chat/${chat_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const uploadChatImages = (formData) =>
  axios.post(`/api/chat/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getPinnedMessage = (chat_id, token) =>
  axios.get(`/api/chat/pinned/${chat_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPublicAccounts = (user_id) =>
  axios.get(`/api/chat/public/${user_id}`);
