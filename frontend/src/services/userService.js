import axios from "./axiosInstance";

export const searchUsers = (filters, token) =>
  axios.post(`/api/user/search`, filters, {
    headers: { Authorization: `Bearer ${token}` },
  });
