import axios from "./axiosInstance";

export const getAllDomains = () => axios.get(`/api/metadata/domain`);
