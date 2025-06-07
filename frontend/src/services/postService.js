import axios from "./axiosInstance";

export const getPostsInFeed = (token) =>
  axios.get("/api/post/feed", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

// for get, axios.get(api_path, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
// for post, axios.post(api_path, body, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
