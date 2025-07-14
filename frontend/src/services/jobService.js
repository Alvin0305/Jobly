import axios from "./axiosInstance";

//const BASE_URL = "http://localhost:5000";

// Create a new job (for employer)
export const createJob = async (jobData,token) => {
  return await axios.post(`/api/job`, jobData  ,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  });
};

// Get details of a single job by ID
export const getJobById = async (jobId,token) => {
  const res = await axios.get(`/api/job/${jobId}`,{
    headers: {
      Authorization:`Bearer ${token}`,
    }
  });
  return res.data;
};

// Delete a job (employer only)
export const deleteJob = async (jobId) => {
  const res = await axios.delete(`${BASE_URL}/api/job/${jobId}`);
  return res.data;
};

// Get all jobs created by the logged-in employer
export const getJobsCreatedByEmployer = async (token) => {
  const res = await axios.get(`/api/job/employer`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
};

// Get all jobs shown to the logged-in employee
export const getJobsForEmployee = async (token) => {
  const res = await axios.get(`/api/job/employee`,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  });
  console.log("came");
  return res.data;
};

// Get interested employees for a job
export const getInterestedEmployees = async (jobId,token) => {
  const res = await axios.get(`/api/job/interested/${jobId}`,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  });
  console.log("DATA HERE",res.data);
  return res.data;
};

// Add current employee to the interested list of a job
export const addEmployeeToInterested = async (jobId,token) => {
  const res = await axios.post(`/api/job/${jobId}/interested`,{},
    {
    headers: {
      Authorization:`Bearer ${token}`,
    }
  });
  return res.data;
};

// Select an employee for a job
export const selectEmployeeForJob = async (jobId, employeeId) => {
  const res = await axios.post(`${BASE_URL}/api/job/${jobId}/select`, {
    employee_id: employeeId,
  });
  return res.data;
};

// Get selected employees for a job
export const getSelectedEmployeesForJob = async (jobId,token) => {
  const res = await axios.get(`/api/job/selected/${jobId}`,{
    headers: {
      Authorization:`Bearer ${token}`,
    }
  });
  return res.data;
};

// Mark job as filled
export const markJobAsFilled = async (jobId) => {
  const res = await axios.patch(`${BASE_URL}/api/job/${jobId}/fill`);
  return res.data;
};

export const uploadJobImages = async(formData,token) => {

  const response = await axios.post(`/api/job/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Image ");
  return response.data.uploaded.map((img) => img.file_url);
  
}