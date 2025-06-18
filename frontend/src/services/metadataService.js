// import { createSkill } from "../../../backend/controllers/metdataController";
 import axios from "./axiosInstance";

export const getAllDomains =async () => {
     const res = await axios.get(`/api/metadata/domain`);
     return res.data;
};

export const createDomain = async (name,token) =>{
     const res = await axios.post(`/api/metadata/domain`,
          {name},
          {
               headers: {
                    Authorization:`Bearer ${token}`,
               }
          }
     );
     return res.data;
}
