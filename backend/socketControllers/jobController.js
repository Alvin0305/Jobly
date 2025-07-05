import { createJobFunction, addEmployeeToInterestedFunction,selectEmployeeForJobFunction } from "../models/job.js";
import pool from "../db.js";
import { insertNotification } from "../models/notification.js";
export const createJob = async (jobData) => {
  const{
    employer_id,
    title,
    company_name,
    description,
    required_experience,
    skills_required,
    salary,
    image_urls
  } = jobData;
  
  // insert into the job table
     try{
      const {job_id} = await createJobFunction(
        employer_id,
        title,
      company_name,
      description,
      required_experience,
      skills_required,
      salary,
      image_urls
      )
    
  // find all the employees who satisfies the job requirements
  // loop through the employee ids
  // ---- example -----
  const client = await pool.connect();
  const placeholders = skills_required.map((_, i) => `$${i + 1}`).join(", ");
  const result = await client.query(
    `select distinct user_id from user_domains where domain_id in (${placeholders})`,
    skills_required
  )
  client.release();
  const employeeIds= result.rows.map((row) => row.user_id)
  employeeIds.forEach((employeeId) => {
    io.to(`user_${employeeId}`).emit("job_created", {
      job_id,
      employer_id,
      title,
      company_name,
      message:`New job posted: ${title} at ${company_name}`,
    });
  })
  return { success:true, job_id};
  
  // emit job_created signal
}catch{err}{
  console.log("Error in ceatejob ",err);
  throw err;
}

};

export const replyJob = async (employee_id, job_id,io) => {
  // insert into job reply
  try{
    const reply = await addEmployeeToInterestedFunction(employee_id,job_id);
    // get the employer id from the job using the job_id
    const result = await pool.query(
      `select posted_by from jobs where id = $1`,
      [job_id]
    )
    if(result.rows.length == 0) throw new Error("Job not found");
    const employerId = result.rows[0].posted_by;
     // send a replyd_to_job signal to the employer.
  
  // and send the signal to him
  // ---- example ------
  
    io.to(`user_${employerId}`).emit("reply_to_job", {
      job_id,
      employee_id,
      message:"Someone has shown interest in your job post"
   })
   return {success : true};
}catch(err) {
  console.log("Error in replyJob",err);
  throw err;
}
  
};

export const JobRequestAccept = async (job_id, employee_id, employer_id, io) => {
  try {
    // Insert into accepted table
    await selectEmployeeForJobFunction(job_id, employee_id);

    // Create notification
    await insertNotification({
      sender_id: employer_id,
      receiver_id: employee_id,
      content: 'You have been accepted for the job.',
      post_id: job_id,
      type: 'Job-Accepted'
    });

    // Emit socket to employee
    io.to(`user_${employee_id}`).emit('job-accepted', {
      job_id,
      message: 'You have been accepted for the job!'
    });

    console.log(` Job accepted: Employee ${employee_id} notified`);
  } catch (error) {
    console.error('JobRequestAccept error:', error);
    throw error;
  }
};