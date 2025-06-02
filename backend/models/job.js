import pool from "../db.js";

export const createJobFunction = async (
  employer_id,
  required_experience,
  salary,
  image_urls
) => {
  // insert a new job in the jobs table
  // insert the images and job_id from the job table into the job_images table
};

export const getJobByIdFunction = async (job_id) => {
  // get all the job details of the job with given id
};

export const deleteJobFunction = async (job_id) => {
  // delete the particular job from the jobs table
  // also emit a signal in the socket signaling the deletion
};

export const getJobsCreatedByEmployerFunction = async (employer_id) => {
  // get all the jobs created by the given employer
};

export const getJobsForEmployeeFunction = async (employee_id) => {
  // get all the jobs with skills matching with the skills of the employee
};

export const getInterestedEmployeesFunction = async (job_id) => {
  // get all the employees who are interested in the job from the job interest table
};

export const addEmployeeToInterestedFunction = async (employee_id, job_id) => {
  // insert the given employee into the job interest table
};

export const selectEmployeeForJobFunction = async (job_id, employee_id) => {
  // insert the employee into the job accept table
};

export const getSelectedEmployeesForJobFunction = async (job_id) => {
  // get all employees selected for the job from the accept table
};

export const markJobAsFilledFunction = async (job_id) => {
  // update the is_filled attribute in the job table to true
};
