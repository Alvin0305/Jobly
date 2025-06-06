export const createJob = async (employer_id, job) => {
  // insert into the job table
  // find all the employees who satisfies the job requirements
  // loop through the employee ids
  // ---- example -----
  /*
  
  employeeIds.forEach((employeeId) => {
    io.to(`user_${employeeId}`).emit("job_created", {
      job, employerId, ... other things which may be sent to the employee
    });
  })

  */
  // emit job_created signal
};

export const replyJob = async (employee_id, job_id) => {
  // insert into job reply
  // send a replyd_to_job signal to the employer.
  // get the employer id from the job using the job_id
  // and send the signal to him
  // ---- example ------
  /*
  io.to(`user_${employerId}`).emit("reply_to_job", {
    employeeId, ... other things which may be sent to the employer
  })
  */
  // emit replyd_to_job signal
};
