import { createSkill } from "../../../backend/controllers/metdataController";
import axios from "./axiosInstance";
const BASE_URL = "http://localhost:5000";
export const getAllDomains = () => {
     const res = axios.get(`${BASE_URL}/api/metadata/domain`);
     return res.data;
};

export cosnt createSkill = () =>{
     xonst res = axios.post()
}
