import axios from "./axiosInstance";

export const getPostsInFeed = (id, token) =>
  axios.get(`/api/post/feed/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const getPostById = (id, token) =>
  axios.get(`/api/post/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const createPost = (postData, token) =>
  axios.post(`/api/post`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const uploadPostImages = (formData) =>
  axios.post(`/api/post/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// for get, axios.get(api_path, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
// for post, axios.post(api_path, body, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
