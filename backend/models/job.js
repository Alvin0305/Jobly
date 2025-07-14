import pool from "../db.js";

export const createJobFunction = async (
  employer_id,
  title,
  company_name,
  description,
  required_experience,
  skills_required,
  salary,
  image_urls
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Insert job
    const jobInsertResult = await client.query(
      `
      INSERT INTO jobs (posted_by, title, company_name, description, required_experience, salary)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [employer_id, title, company_name, description, required_experience, salary]
    );

    const job = jobInsertResult.rows[0];
    const job_id = job.id;

    // 2. Insert images
    for (const url of image_urls) {
      await client.query(
        `INSERT INTO job_images (job_id, image_url) VALUES ($1, $2)`,
        [job_id, url]
      );
    }

    // 3. Insert skills
    for (const skill_id of skills_required) {
      await client.query(
        `INSERT INTO job_skills (job_id, skill_id) VALUES ($1, $2)`,
        [job_id, skill_id]
      );
    }

    // 4. Get employer name
    const employerResult = await client.query(
      `SELECT firstname, lastname FROM users WHERE id = $1`,
      [employer_id]
    );
    const { firstname, lastname } = employerResult.rows[0];

    // 5. Get skill names
    const skillNamesResult = await client.query(
      `
      SELECT name FROM domains
      WHERE id = ANY($1::int[])
      `,
      [skills_required]
    );
    const skillNames = skillNamesResult.rows.map((row) => row.name);

    await client.query("COMMIT");

    return {
      ...job,
      firstname,
      lastname,
      job_skills: skillNames,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating job", err);
    throw err;
  } finally {
    client.release();
  }
};


export const getJobByIdFunction = async (job_id) => {
  // get all the job details of the job with given id
  try{
    const result = await pool.query(
      `SELECT 
        j.id,
        j.title,
        j.company_name,
        j.description,
        j.required_experience,
        j.salary,
        j.is_filled,
        j.time,
        COALESCE(
          json_agg(ji.image_url) 
          FILTER (WHERE ji.image_url IS NOT NULL), '[]'
        ) AS image_urls
      FROM jobs j
      LEFT JOIN job_images ji ON j.id = ji.job_id
      WHERE j.id = $1
      GROUP BY j.id`,
      [job_id]
    );
    return result.rows[0];

  }catch(err){
    console.log('Error fetching job details');
    throw err;
  }
  // return everything related to that job
};

export const deleteJobFunction = async (job_id) => {
  // delete the particular job from the jobs table
  try{
     const result = await pool.query(
      `delete from jobs where id = $1`,
      [job_id]
     )
     return result.rowCount>0;
  }catch(err){
    console.error("Error deleting job",err);
    throw err;
  }
};

export const getJobsCreatedByEmployerFunction = async (employer_id) => {
  // get all the jobs created by the given employer
  try{
    const result = await pool.query(
      `select * from jobs where posted_by = $1`,
      [employer_id]
    )
    return result.rows;
  }catch(err){
    console.error("Error fetching job",err);
    throw err;
  }
};

export const getJobsForEmployeeFunction = async (employee_id) => {
  try {
    console.log("hello");
    const result = await pool.query(
      `
      SELECT 
        j.*, 
        u.firstname, 
        u.lastname, 
        u.image AS employer_image,
        ARRAY_AGG(s.name) AS job_skills,

        -- Check if the employee is interested
        EXISTS (
          SELECT 1
          FROM job_interested_users i
          WHERE i.job_id = j.id AND i.user_id = $1
        ) AS is_interested,

        -- ✅ Check if the employee is accepted
        EXISTS (
          SELECT 1
          FROM job_accepted_users a
          WHERE a.job_id = j.id AND a.user_id = $1
        ) AS is_accept

      FROM jobs j
      JOIN job_skills js ON j.id = js.job_id
      JOIN domains s ON js.skill_id = s.id
      JOIN users u ON j.posted_by = u.id
      WHERE js.skill_id IN (
        SELECT skill_id FROM user_skills WHERE user_id = $1
      )
      GROUP BY j.id, u.firstname, u.lastname, u.image
      ORDER BY j.time DESC
      `,
      [employee_id]
    );
    console.log("there");
    console.log(result.rows.filter((r) => r.is_accept === true));

    return result.rows;
  } catch (err) {
    console.error("Error fetching jobs for employee:", err);
    throw err;
  }
};



export const getInterestedEmployeesFunction = async (job_id) => {
  // get all the employees who are interested in the job from the job interest table
  try{
    const result = await pool.query(
      `select u.id, u.firstname, u.lastname, u.email, u.headline, u.image 
      from job_interested_users jui
      join users u on jui.user_id = u.id
      where jui.job_id = $1`,
      [job_id]
    )
    return result.rows;
  }catch(err){
    console.error("Error fetching interested jobs for employee:", err);
    throw err;
  }
};

export const addEmployeeToInterestedFunction = async (employee_id, job_id) => {
  // insert the given employee into the job interest table
  try{
    const result = await pool.query(
      `INSERT INTO job_interested_users (job_id, user_id) VALUES ($2, $1) on conflict do nothing RETURNING *`,
      [employee_id, job_id]
    );
    return result.rows[0] || {message:'Already interested'};
  }catch(err){
    console.error("Error adding interested jobs for employee:", err);
    throw err;
  } 
};

export const selectEmployeeForJobFunction = async (job_id, employee_id) => {
  // insert the employee into the job accept table
  try{
    // Optional: Check if the job exists
    const jobCheck = await pool.query('SELECT id FROM jobs WHERE id = $1', [job_id]);
    if (jobCheck.rowCount === 0) {
      throw new Error(`Job with id ${job_id} does not exist.`);
    }

    // Optional: Check if the user exists
    const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [employee_id]);
    if (userCheck.rowCount === 0) {
      throw new Error(`User with id ${employee_id} does not exist.`);
    }

    // Insert into job_accepted_users table
    const result = await pool.query(
      `INSERT INTO job_accepted_users (job_id, user_id) VALUES ($1, $2) RETURNING *`,
      [job_id, employee_id]
    );

    return result.rows[0]; // return inserted row
  } catch (err) {
    console.error("Error selecting employee for job:", err);
    throw err;
  
  }
};

export const getSelectedEmployeesForJobFunction = async (job_id) => {
  // get all employees selected for the job from the accept table
  try {
    const result = await pool.query(
      `
      SELECT 
        u.id,
        u.firstname,
        u.lastname,
        u.email,
        u.headline,
        u.summary,
        u.image
      FROM job_accepted_users jau
      JOIN users u ON jau.user_id = u.id
      WHERE jau.job_id = $1
      `,
      [job_id]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching selected employees:", err);
    throw err;
  }
};

export const markJobAsFilledFunction = async (job_id) => {
  // update the is_filled attribute in the job table to true
  try {
    const result = await pool.query(
      `UPDATE jobs SET is_filled = TRUE WHERE id = $1 RETURNING *`,
      [job_id]
    );

    if (result.rowCount === 0) {
      throw new Error(`Job with id ${job_id} does not exist.`);
    }

    return result.rows[0]; // Return the updated job
  } catch (err) {
    console.error("Error marking job as filled:", err);
    throw err;
  }
};