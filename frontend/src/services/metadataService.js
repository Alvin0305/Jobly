// import { createSkill } from "../../../backend/controllers/metdataController";
import axios from "./axiosInstance";

export const getAllDomains = async () => {
  const res = await axios.get(`/api/metadata/domain`);
  return res.data;
};

export const addSkill = async (user_id, skill_name, token) =>
  axios.post(
    `/api/metadata/skill/${user_id}`,
    { name: skill_name },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const removeSkill = async (skill_id, token) =>
  axios.delete(`/api/metadata/skill/${skill_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addInterest = async (user_id, name, token) =>
  axios.post(
    `/api/metadata/interest/${user_id}`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const removeInterest = async (interest_id, token) =>
  axios.delete(`/api/metadata/interest/${interest_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createDomain = async (name, token) => {
  const res = await axios.post(
    `/api/metadata/domain`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// export const createSkill = () => {
//   const res = axios.post();
// };
