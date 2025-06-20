import axios from "./axiosInstance";

export const searchUsers = (token, tags, isEmployee) =>
  axios.post(
    `/api/user/search`,
    { tags, isEmployee },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getUserFollowers = (token) =>
  axios.get(`api/user/followers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
