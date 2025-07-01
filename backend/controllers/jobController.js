// check the ../models/job.js and ../routes/jobRoutes.js file for the name of parameters required
import { createJobFunction ,getJobByIdFunction,deleteJobFunction,getJobsCreatedByEmployerFunction,getJobsForEmployeeFunction,getInterestedEmployeesFunction,addEmployeeToInterestedFunction,selectEmployeeForJobFunction,getSelectedEmployeesForJobFunction,markJobAsFilledFunction} from "../models/job.js";
export const createJob = async (req, res) => {
  // use create job function in the job model to create a 
  console.log("Job payloads",req.body);
  console.log("Employer id",req.user?.id);
  try{
    const {
       title,
      company_name,
      description,
      required_experience,
      skills_required,  // array of domain IDs
      salary,
      image_urls        // array of image URLs
    } = req.body;
    const employer_id = req.user.id;
    // Basic validation
    if (!employer_id || !title || !company_name || !description || !salary) {
      return res.status(400).json({ error: "Missing required job fields." });
    }

    const result = await createJobFunction(
      employer_id,
      title,
      company_name,
      description,
      required_experience || 0,
      skills_required || [],
      salary,
      image_urls || []
    );
  
    res.status(201).json({ message: "Job created successfully", job_id: result.job_id });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: "Internal server error" });
  }
  
};

export const getJobById = async (req, res) => {
  // use the get job by id function in the job model to get all details of the job
  try{
    const job_id = parseInt(req.params.id,10);
    if(isNaN(job_id)) return res.status(400).json({error:'Invald job_id'});
    const jobDetails = await getJobByIdFunction(job_id);
    res.status(200).json(jobDetails);
  }catch(err) {
    console.log('Error fetching details',err);
    res.status(500).json({error:'Internal server error'});
  }
};

export const deleteJob = async (req, res) => {
  // use the delete job function in the job model to delete a job
  try{
    const job_id = parseInt(req.params.id,10);
    if(isNaN(job_id)) return res.status(400).json({error:'Invald job_id'});
    const jobs = await deleteJobFunction(job_id);
    res.status(200).json({message:'Job deleted successfully'});
  }catch(err) {
    console.log('Error fetching details',err);
    res.status(500).json({error:'Internal server error'});
  }
};

export const getJobsCreatedByEmployer = async (req, res) => {
  // use the get jobs created by employer function in the job model to get the jobs created by the employer
   try{
      const user_id = req.user.id;
      const posts = await getJobsCreatedByEmployerFunction(user_id);
      return res.status(200).json(posts);
    }catch(err) {
      console.log('Error fetching job post',err);
      res.status(500).json({error:'Internal server error'});
    }

};

export const getJobsForEmployee = async (req, res) => {
  // use the get jobs for employee function in the job model to get the jobs for the employee
  try{
    const user_id = req.user.id
    const posts = await getJobsForEmployeeFunction(user_id);
    return res.status(200).json(posts);
  }catch(err) {
    console.log('Error fetching job post',err);
    res.status(500).json({error:'Internal server error'});
  
  }
};

export const getInterestedEmployees = async (req, res) => {
  // use the get interested employees function in the job model to get the intersted employees in the job
  try{
    const job_id = parseInt(req.params.id,10);
    if(isNaN(job_id)) return res.status(400).json({error:'Invald job_id'});
    const jobDetails = await getInterestedEmployeesFunction(job_id);
    res.status(200).json(jobDetails);
  }catch(err) {
    console.log('Error fetching details',err);
    res.status(500).json({error:'Internal server error'});
  
  }
};

export const addEmployeeToInterested = async (req, res) => {
  // use the add employee to interested function in the job model to add an employee to interested
  try {
    const job_id = parseInt(req.params.id, 10);
    const { employee_id } = req.user.id;

    if (!job_id || !employee_id) {
      return res.status(400).json({ error: "job_id and employee_id are required" });
    }

    await addEmployeeToInterestedFunction(employee_id, job_id);
    res.status(200).json({ message: "Employee added to interested list successfully" });
  } catch (err) {
    console.error("Error adding employee to interested:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const selectEmployeeForJob = async (req, res) => {
  // use the select employee for job function in the job model to select an employee for the job
  try {
    const job_id = parseInt(req.params.id, 10);
    const { employee_id } = req.body;

    if (!job_id || !employee_id) {
      return res.status(400).json({ error: "job_id and employee_id are required" });
    }

    await selectEmployeeForJobFunction(employee_id, job_id);
    res.status(200).json({ message: "Employee added to accepted list successfully" });
  } catch (err) {
    console.error("Error adding employee to accepted:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSelectedEmployeesForJob = async (req, res) => {
  // use the get selected employees for the job
  try{
    const job_id = parseInt(req.params.id,10);
    if(isNaN(job_id)) return res.status(400).json({error:'Invald job_id'});
    const jobs = await getSelectedEmployeesForJobFunction(job_id);
    res.status(200).json(jobs);
  }catch(err) {
    console.log('Error fetching details',err);
    res.status(500).json({error:'Internal server error'});
  }
};

export const markJobAsFilled = async (req, res) => {
  // use the mark job as filled function in the job model to mark the is_filled attribute true
  try{
    const job_id = parseInt(req.params.id,10);
    if(isNaN(job_id)) return res.status(400).json({error:'Invald job_id'});
    const updatedjobs = await markJobAsFilledFunction(job_id);
    res.status(200).json({message:'JOb marked as filled successfully',job:updatedjobs});
  }catch(err) {
    console.log('Error fetching details',err);
    res.status(500).json({error:'Internal server error'});
  }
};
