import pool from "../db.js";

export const getDomainsFunction = async () => {
  // get all domain in domain table
  const { rows } = await pool.query(`SELECT * FROM domains ORDER BY name`);
  return rows;
};

export const createDomainFunction = async (name) => {
  const { rows } = await pool.query(
    `INSERT INTO domains (name) VALUES ($1) RETURNING *`,
    [name]
  );
  console.log(rows[0]);
  return rows[0];
};

export const createInterestFunction = async (user_id, name) => {
  // insert a new domain into the domain table
  // update the user interest table, add this interst to it
  try {
    let res = await pool.query(`SELECT id FROM domains WHERE name = $1`, [
      name,
    ]);

    let domainId;

    if (res.rows.length === 0) {
      const insertRes = await pool.query(
        `INSERT INTO domains (name) VALUES ($1) RETURNING id`,
        [name]
      );

      domainId = insertRes.rows[0].id;
    } else {
      domainId = res.rows[0].id;
    }

    await pool.query(
      `INSERT INTO user_interests (user_id, interest_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id, domainId]
    );

    return { success: true, interest_id: domainId };
  } catch (err) {
    console.error("createInterestFunction error:", err.message);
    throw err;
  }
};

export const getInterestsOfUserFunction = async (user_id) => {
  // retrive all the interests of the user from the user interests table
  const { rows } = await pool.query(
    `SELECT dom.id,dom.name
    FROM user_interests usin
    JOIN domains dom ON usin.interest_id = dom.id
    WHERE usin.user_id=$1`,
    [user_id]
  );
  return rows;
};

export const createSkillFunction = async (user_id, name) => {
  // insert a new skill into the skills table
  // update the user skills table, add this skill to it

  try {
    let res = await pool.query(`SELECT id FROM domains WHERE name = $1`, [
      name,
    ]);

    let domainId;

    if (res.rows.length === 0) {
      const insertRes = await pool.query(
        `INSERT INTO domains (name) VALUES ($1) RETURNING id`,
        [name]
      );

      domainId = insertRes.rows[0].id;
    } else {
      domainId = res.rows[0].id;
    }

    await pool.query(
      `INSERT INTO user_skills (user_id, skill_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id, domainId]
    );

    return { success: true, skill_id: domainId };
  } catch (err) {
    console.error("createInterestFunction error:", err.message);
    throw err;
  }
};

export const getSkillsOfUserFunction = async (user_id) => {
  // retrive all the skills of the user from the user skills table
  const { rows } = await pool.query(
    `SELECT dom.id,dom.name
    FROM user_skills ussk
    JOIN domains dom ON ussk.skill_id = dom.id
    WHERE ussk.user_id=$1`,
    [user_id]
  );
  return rows;
};

export const createLanguageFunction = async (user_id, language) => {
  // insert a new language into the language table
  // update the user language table, add this language to it
  try {
    let res = await pool.query(`SELECT id FROM languages WHERE name = $1`, [
      language,
    ]);

    let lanId;

    if (res.rows.length === 0) {
      const insertRes = await pool.query(
        `INSERT INTO languages (name) VALUES ($1) RETURNING id`,
        [language]
      );

      lanId = insertRes.rows[0].id;
    } else {
      lanId = res.rows[0].id;
    }

    await pool.query(
      `INSERT INTO user_languages (user_id, language_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id, lanId]
    );

    return { success: true, language_id: lanId };
  } catch (err) {
    console.error("createLanguageFunction error:", err.message);
    throw err;
  }
};

export const getLanguagesFunction = async () => {
  // retrive all languages in the language table
  const { rows } = await pool.query(`SELECT * FROM languages ORDER BY name`);
  return rows;
};

export const getLanguagesByUserFunction = async (user_id) => {
  // retrive all the languages of the user from the user languages table
  console.log(user_id);
  const { rows } = await pool.query(
    `SELECT lan.id,lan.name
    FROM user_languages usla
    JOIN languages lan ON usla.language_id = lan.id
    WHERE usla.user_id=$1`,
    [user_id]
  );
  return rows;
};

export const createWorkExperienceFunction = async (
  user_id,
  company_name,
  designation,
  start_date,
  end_date,
  location
) => {
  try {
    let res = await pool.query(
      `INSERT INTO work_experience
      (user_id, company_name, designation, start_date, end_date, location)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
      [user_id, company_name, designation, start_date, end_date, location]
    );

    return {
      success: true,
      experience_id: res.rows[0].id,
      message: "Work experience added successfully",
    };
  } catch (err) {
    console.log("createDescription error:", err.message);
    return {
      success: false,
      message: "Failed to create work experience",
      error: err.message,
    };
  }
};

export const getWorkExperienceFunction = async (user_id) => {
  console.log("Fetching experience for user:", user_id);

  const { rows } = await pool.query(
    `SELECT id, company_name, designation, start_date, end_date, location
       FROM work_experience
       WHERE user_id = $1
       ORDER BY start_date DESC`,
    [user_id]
  );
  return rows;
};

export const updateWorkExpFunction = async (
  company_name,
  designation,
  location,
  start_date,
  end_date,
  exp_id
) => {
  const query = `UPDATE work_experience 
                SET company_name = $1, designation = $2,location = $3, start_date = $4, end_date = $5 
                WHERE id = $6 RETURNING *;`;
  const values = [
    company_name,
    designation,
    location,
    start_date,
    end_date,
    exp_id,
  ];

  return await pool.query(query, values);
};

export const createJobDetailsFunction = async (
  user_id,
  company_name,
  designation,
  location
) => {
  try {
    let res = await pool.query(
      `INSERT INTO work_experience
      (user_id, company_name, designation,location)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
      [user_id, company_name, designation, location]
    );

    return {
      success: true,
      experience_id: res.rows[0].id,
      message: "Job details added successfully",
    };
  } catch (err) {
    console.log("createJobDetails error:", err.message);
    return {
      success: false,
      message: "Failed to create job details",
      error: err.message,
    };
  }
};

export const getJobDetailsFunction = async (user_id) => {
  console.log(user_id);
  const { rows } = await pool.query(
    `SELECT id, company_name, designation,  location
    FROM work_experience WHERE user_id = $1`,
    [user_id]
  );
  return rows;
};

export const createDescriptionFunction = async (user_id, description) => {
  try {
    const res = await pool.query(
      `INSERT INTO user_descriptions (user_id, description)
       VALUES ($1, $2)
       ON CONFLICT (user_id)
       DO UPDATE SET description = EXCLUDED.description
       RETURNING id`,
      [user_id, description]
    );
    return {
      success: true,
      experience_id: res.rows[0].id,
      message: "Description added successfully",
    };
  } catch (err) {
    console.log("createDescription error:", err.message);
    return {
      success: false,
      message: "Failed to create description",
      error: err.message,
    };
  }
};

export const getDescriptionFunction = async (user_id) => {
  console.log(user_id);
  const { rows } = await pool.query(
    `SELECT id, description
    FROM user_descriptions WHERE user_id = $1`,
    [user_id]
  );
  return rows;
};

export const createQualificationFunction = async (user_id, qualification) => {
  // insert the qualifiction into qualifications table
  // update the user qualifications table, add this qualification to it
  try {
    let res = await pool.query(
      `SELECT id FROM qualifications WHERE name = $1`,
      [qualification]
    );

    let quaId;

    if (res.rows.length === 0) {
      const insertRes = await pool.query(
        `INSERT INTO qualifications (name) VALUES ($1) RETURNING id`,
        [qualification]
      );

      quaId = insertRes.rows[0].id;
    } else {
      quaId = res.rows[0].id;
    }

    await pool.query(
      `INSERT INTO user_qualifications (user_id, qualification_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id, quaId]
    );

    return { success: true, qualification_id: quaId };
  } catch (err) {
    console.error("createQualificationFunction error:", err.message);
    throw err;
  }
};

export const getQualificationsFunction = async () => {
  // get all the qualifications in the qualifications table
  const { rows } = await pool.query(
    `SELECT * FROM qualifications ORDER BY name`
  );
  return rows;
};

export const getQualificationsOfUserFunction = async (user_id) => {
  // get all qualifications of the given user
  const { rows } = await pool.query(
    `SELECT qua.id,qua.name
    FROM user_qualifications usqu
    JOIN qualifications qua ON usqu.qualification_id = qua.id
    WHERE usqu.user_id=$1`,
    [user_id]
  );
  return rows;
};

export const updateQualFunction = async (qualificationId, newName) => {
  const query = `UPDATE qualifications SET name = $1 WHERE id = $2 RETURNING *`;
  return await pool.query(query, [newName, qualificationId]);
};

export const deleteQualFunction = async (quaId) => {
  return await pool.query(
    `DELETE FROM qualifications WHERE id = $1 RETURNING *`,
    [quaId]
  );
};

export const updateSkillFunction = async (skillId, newName) => {
  const query = `UPDATE domains SET name = $1 WHERE id = $2 RETURNING *`;
  return await pool.query(query, [newName, skillId]);
};

export const deleteSkillFunction = async (userId, skillId) => {
  return await pool.query(
    `DELETE FROM user_skills WHERE user_id = $1 AND skill_id = $2 RETURNING *`,
    [userId, skillId]
  );
};

export const updateInterestFunction = async (interestId, newName) => {
  const query = `UPDATE domains SET name = $1 WHERE id = $2 RETURNING *`;
  return await pool.query(query, [newName, interestId]);
};

export const deleteInterestFunction = async (userId, interestId) => {
  return await pool.query(
    `DELETE FROM user_interests WHERE user_id = $1 AND interest_id = $2 RETURNING *`,
    [userId, interestId]
  );
};

export const createCodingLanguageFunction = async (user_id, codlang) => {
  // insert a new coding language into the coding language table
  // update the user coding languge table, add this coding language to it
  console.log(user_id);
  try {
    let res = await pool.query(
      `SELECT id FROM coding_languages WHERE name = $1`,
      [codlang]
    );

    let lanId;

    if (res.rows.length === 0) {
      const insertRes = await pool.query(
        `INSERT INTO coding_languages (name) VALUES ($1) RETURNING id`,
        [codlang]
      );

      lanId = insertRes.rows[0].id;
    } else {
      lanId = res.rows[0].id;
    }

    await pool.query(
      `INSERT INTO user_coding_languages (user_id, coding_language_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id, lanId]
    );

    return { success: true, coding_language_id: lanId };
  } catch (err) {
    console.error("createCodingLanguageFunction error:", err.message);
    throw err;
  }
};

export const getCodingLanguagesFunction = async () => {
  // retrive all coding languages in the coding language table
  const { rows } = await pool.query(
    `SELECT * FROM coding_languages ORDER BY name`
  );
  return rows;
};

export const getCodingLanguagesOfUserFunction = async (user_id) => {
  // retrive all the coding languages a user know from the user coding languages table
  const { rows } = await pool.query(
    `SELECT lan.id,lan.name
    FROM user_coding_languages usla
    JOIN coding_languages lan ON usla.coding_language_id = lan.id
    WHERE usla.user_id=$1`,
    [user_id]
  );
  return rows;
};
