// check the ../models/job.js and ../routes/jobRoutes.js file for the name of parameters required

export const createJob = async (req, res) => {
  // use create job function in the job model to create a job
};

export const getJobById = async (req, res) => {
  // use the get job by id function in the job model to get all details of the job
};

export const deleteJob = async (req, res) => {
  // use the delete job function in the job model to delete a job
};

export const getJobsCreatedByEmployer = async (req, res) => {
  // use the get jobs created by employer function in the job model to get the jobs created by the employer
};

export const getJobsForEmployee = async (req, res) => {
  // use the get jobs for employee function in the job model to get the jobs for the employee
};

export const getInterestedEmployees = async (req, res) => {
  // use the get interested employees function in the job model to get the intersted employees in the job
};

export const addEmployeeToInterested = async (req, res) => {
  // use the add employee to interested function in the job model to add an employee to interested
};

export const selectEmployeeForJob = async (req, res) => {
  // use the select employee for job function in the job model to select an employee for the job
};

export const getSelectedEmployeesForJob = async (req, res) => {
  // use the get selected employees for the job
};

export const markJobAsFilled = async (req, res) => {
  // use the mark job as filled function in the job model to mark the is_filled attribute true
};
