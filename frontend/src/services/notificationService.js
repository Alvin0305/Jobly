import axios from "./axiosInstance";

export const getUserNotifications = async(token) => {
    const res = await axios.get(`/api/user/notification`,{
        headers: {
            Authorization:`Bearer ${token}`,
        }
    });
    return res.data;
}