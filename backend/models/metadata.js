import pool from "../db.js";

export const getDomainsFunction = async () => {
  // get all domain in domain table
  const {rows} = await pool.query(
    `SELECT * FROM domains ORDER BY name`
  );
  return rows;
}

export const createInterestFunction = async (user_id, name) => {
  // insert a new domain into the domain table
  // update the user interest table, add this interst to it
  try{
    let res = await pool.query(
      `SELECT id FROM domains WHERE name = $1`,
      [name]
    );

    let domainId;

    if(res.rows.length === 0){
      const insertRes = await pool.query(
        `INSERT INTO domains (name) VALUES ($1) RETURNING id`,
        [name]
      );

      domainId= insertRes.rows[0].id;
    }
    else{
      domainId = res.rows[0].id;
    }
     
    await pool.query(
      `INSERT INTO user_interests (user_id, interest_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id,domainId]
    );

    return { success: true, interest_id: domainId };

  }catch(err){
    console.error("createInterestFunction error:", err.message);
    throw err;
  }
  
};

export const getInterestsOfUserFunction = async (user_id) => {
  // retrive all the interests of the user from the user interests table
  const {rows} = await pool.query(
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

  try{
    let res = await pool.query(
      `SELECT id FROM domains WHERE name = $1`,
      [name]
    );

    let domainId;

    if(res.rows.length === 0){
      const insertRes = await pool.query(
        `INSERT INTO domains (name) VALUES ($1) RETURNING id`,
        [name]
      );

      domainId= insertRes.rows[0].id;
    }
    else{
      domainId = res.rows[0].id;
    }
     
    await pool.query(
      `INSERT INTO user_skills (user_id, skill_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id,domainId]
    );

    return { success: true, skill_id: domainId };

  }catch(err){
    console.error("createInterestFunction error:", err.message);
    throw err;
  }
};

export const getSkillsOfUserFunction = async (user_id) => {
  // retrive all the skills of the user from the user skills table
  const {rows} = await pool.query(
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
  try{
    let res = await pool.query(
      `SELECT id FROM languages WHERE name = $1`,
      [language]
    );

    let lanId;

    if(res.rows.length === 0){
      const insertRes = await pool.query(
        `INSERT INTO languages (name) VALUES ($1) RETURNING id`,
        [language]
      );

      lanId= insertRes.rows[0].id;
    }
    else{
      lanId = res.rows[0].id;
    }
     
    await pool.query(
      `INSERT INTO user_languages (user_id, language_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id,lanId]
    );

    return { success: true, language_id: lanId };

  }catch(err){
    console.error("createLanguageFunction error:", err.message);
    throw err;
  }
};

export const getLanguagesFunction = async () => {
  // retrive all languages in the language table
  const {rows} = await pool.query(
    `SELECT * FROM languages ORDER BY name`
  );
  return rows;
};

export const getLanguagesByUserFunction = async (user_id) => {
  // retrive all the languages of the user from the user languages table
  console.log(user_id);
  const {rows} = await pool.query(
    `SELECT lan.id,lan.name
    FROM user_languages usla
    JOIN languages lan ON usla.language_id = lan.id
    WHERE usla.user_id=$1`,
    [user_id]
  );
  return rows;
};

export const createQualificationFunction = async (user_id, qualification) => {
  // insert the qualifiction into qualifications table
  // update the user qualifications table, add this qualification to it
  try{
    let res = await pool.query(
      `SELECT id FROM qualifications WHERE name = $1`,
      [qualification]
    );

    let quaId;

    if(res.rows.length === 0){
      const insertRes = await pool.query(
        `INSERT INTO qualifications (name) VALUES ($1) RETURNING id`,
        [qualification]
      );

      quaId= insertRes.rows[0].id;
    }
    else{
      quaId = res.rows[0].id;
    }
     
    await pool.query(
      `INSERT INTO user_qualifications (user_id, qualification_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [user_id,quaId]
    );

    return { success: true, qualification_id: quaId };

  }catch(err){
    console.error("createQualificationFunction error:", err.message);
    throw err;
  }
};

export const getQualificationsFunction = () => {
  // get all the qualifications in the qualifications table
};

export const getQualificationsOfUserFunction = async (user_id) => {
  // get all qualifications of the given user
};

export const createCodingLanguageFunction = async (user_id, language) => {
  // insert a new coding language into the coding language table
  // update the user coding languge table, add this coding language to it
};

export const getCodingLanguagesFunction = async () => {
  // retrive all coding languages in the coding language table
};

export const getCodingLanguagesOfUserFunction = async (user_id) => {
  // retrive all the coding languages a user know from the user coding languages table
};
