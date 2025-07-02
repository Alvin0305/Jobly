import axios from "./axiosInstance";

export const searchUsers = (
  token,
  tags,
  isEmployee,
  searchValue,
  limit,
  offset
) =>
  axios.post(
    `/api/user/search`,
    { tags, isEmployee, searchValue },
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, offset },
    }
  );

export const getUserFollowers = (token) =>
  axios.get(`api/user/followers`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUserFollowing = (token) =>
  axios.get(`api/user/following`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const userPrivacy = async(token) =>{
    
       const res = await axios.put(
        '/api/user/privacy',{},
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      )
      return res.data;
    }