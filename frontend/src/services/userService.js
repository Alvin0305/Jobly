import axios from "./axiosInstance";

export const searchUsers = (filters, token) =>
  axios.post(`/api/user/search`, filters, {
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