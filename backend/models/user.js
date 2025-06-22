import pool from "../db.js";

export const createUser = async (
  firstname,
  lastname,
  email,
  password,
  role
) => {
  console.log(firstname, lastname, email, password, role);
  const { rows } = await pool.query(
    `INSERT INTO 
        users (firstname, lastname, email, password_hash, role) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [firstname, lastname, email, password, role]
  );
  console.log(rows[0]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  console.log(rows);
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  console.log(rows);
  return rows[0];
};

export const addToLoginLogs = async (user_id, status) => {
  const { rows } = await pool.query(
    `INSERT INTO login_logs (user_id, status)
    VALUES ($1, $2)
    RETURNING *`,
    [user_id, status]
  );
  return rows[0];
};

export const markUserAsOnline = async (user_id) => {
  const { rows } = await pool.query(
    `UPDATE users SET is_active = True WHERE id = $1 RETURNING *`,
    [user_id]
  );
  return rows[0];
};

export const markUserAsOffline = async (user_id) => {
  const { rows } = await pool.query(
    `UPDATE users SET is_active = False WHERE id = $1 RETURNING *`,
    [user_id]
  );
  return rows[0];
};

export const getUserFollowersFunction = async (user_id) => {
  // get all the followers of the user with given id from the friendlist table
  const {rows} = await pool.query(
    `SELECT u.* FROM friends f
    JOIN users u ON f.follower_id = u.id
    WHERE f.following_id = $1`,
    [user_id]
  );
  return rows;
};

export const getUserFollowingFunction = async (user_id) => {
  // get all the users who follows the given user from the friendlist table

  const { rows } = await pool.query(
    `SELECT users.*
    FROM friends
    JOIN users ON friends.following_id = users.id
    WHERE friends.follower_id = $1`,
    [user_id]
  );
  return rows;
};

export const getMutualFriendsFunction = async (user_id) => {
  // get all the mutual friends of the user with given id
  // add the number of mutual friends count also in the result
  const {rows} = await pool.query(
    `SELECT u.*, COUNT(*) OVER() AS mutual_count
    FROM users u
    JOIN friends f1 ON f1.following_id = u.id
    JOIN friends f2 ON f2.follower_id = u.id
    WHERE f1.follower_id = $1 AND f2.following_id = $1`,
    [user_id]
  );
  return rows;
};

export const updateUserFunction = async (user_id, userData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // === 1. Update base user fields ===
    const fields = [
      'firstname', 'lastname', 'email', 'password_hash',
      'headline', 'summary', 'image', 'school',
      'college', 'is_private', 'role', 'is_active'
    ];
    const updates = [];
    const values = [];
    let i = 1;

    for (const field of fields) {
      if (userData[field] !== undefined) {
        updates.push(`${field} = $${i}`);
        values.push(userData[field]);
        i++;
      }
    }

    if (updates.length > 0) {
      await client.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = $${i}`,
        [...values, user_id]
      );
    }

    // === 2. Helper functions ===
    const getOrInsert = async (table, name) => {
      const res = await client.query(`SELECT id FROM ${table} WHERE name = $1`, [name]);
      if (res.rows.length > 0) return res.rows[0].id;

      const insertRes = await client.query(`INSERT INTO ${table} (name) VALUES ($1) RETURNING id`, [name]);
      return insertRes.rows[0].id;
    };

    const resetAndAssociate = async (linkTable, columnName, table, items) => {
      await client.query(`DELETE FROM ${linkTable} WHERE user_id = $1`, [user_id]);
      for (const name of items) {
        const id = await getOrInsert(table, name);
        await client.query(
          `INSERT INTO ${linkTable} (user_id, ${columnName}) VALUES ($1, $2)`,
          [user_id, id]
        );
      }
    };

    // === 3. Related Arrays (languages, qualifications, interests, coding_languages) ===
    if (Array.isArray(userData.languages)) {
      await resetAndAssociate('user_languages', 'language_id', 'languages', userData.languages);
    }

    if (Array.isArray(userData.qualifications)) {
      await resetAndAssociate('user_qualifications', 'qualification_id', 'qualifications', userData.qualifications);
    }

    if (Array.isArray(userData.interests)) {
      await resetAndAssociate('user_interests', 'interest_id', 'domains', userData.interests);
    }

    if (Array.isArray(userData.coding_languages)) {
      await resetAndAssociate('user_coding_languages', 'coding_language_id', 'coding_languages', userData.coding_languages);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating user:', err);
    throw err;
  } finally {
    client.release();
  }
};


// If the user variable contain a new language, add the language into the user language table.
  // If the language is not in the languages table, add it to the languages table first


export const deleteUserFunction = async (user_id) => {
  // delete the user from the users table
  const client = await pool.connect();

  try{
    await client.query('BEGIN');
    await client.query('DELETE FROM users WHERE id = $1',[user_id]);
    await client.query('COMMIT');
  }catch(err){
    await client.query("ROLLBACK");
    console.error('Error deleting user : ',err);
    throw err;
  }finally{
    client.release();
  }
};

export const getUserNotificationsFunction = async (user_id) => {
  // get notifications of the user from the notification table
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT 
        n.id,
        n.content,
        n.type,
        n.post_id,
        n.sender_id,
        s.firstname AS sender_firstname,
        s.lastname AS sender_lastname,
        s.image AS sender_image,
        n.receiver_id
      FROM notifications n
      JOIN users s ON n.sender_id = s.id
      WHERE n.receiver_id = $1
      ORDER BY n.id DESC
      `,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching notifications:', err);
    throw err;
  } finally {
    client.release();
  }
};

export const searchUsersFunctions = async (searchValue = '', tags = [], isEmployee = null) => {
  // get the users based on the searchValue, skills (tags) and whether they are
  // looking for an employee or employer or both
  const client = await pool.connect();
  try {
    let query = `
      SELECT DISTINCT u.id, u.firstname, u.lastname, u.headline, u.image, u.role
      FROM users u
      LEFT JOIN user_interests ui ON u.id = ui.user_id
      LEFT JOIN domains d ON ui.interest_id = d.id
      WHERE u.is_active = true
    `;
    
    const values = [];
    let paramIndex = 1;

    // === 1. Text search ===
    if (searchValue.trim() !== '') {
      const keyword = `%${searchValue.toLowerCase()}%`;
      query += ` AND (
        LOWER(u.firstname) LIKE $${paramIndex}
        OR LOWER(u.lastname) LIKE $${paramIndex}
        OR LOWER(u.headline) LIKE $${paramIndex}
        OR LOWER(u.summary) LIKE $${paramIndex}
      )`;
      values.push(keyword);
      paramIndex++;
    }

    // === 2. Role filter ===
    if (isEmployee !== null) {
      query += ` AND u.role = $${paramIndex}`;
      values.push(isEmployee ? 'Employee' : 'Employer');
      paramIndex++;
    }

    // === 3. Skills/tags filter ===
    if (tags.length > 0) {
      const tagConditions = tags.map((_, i) => `LOWER(d.name) = $${paramIndex + i}`);
      query += ` AND (${tagConditions.join(' OR ')})`;
      values.push(...tags.map(t => t.toLowerCase()));
    }

    // === 4. Sort ===
    query += ` ORDER BY u.firstname, u.lastname`;

    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error in searchUsersFunctions:', err);
    throw err;
  } finally {
    client.release();
  }
};

export const userPrivacyFunction = async(user_id) =>{
  try{
    const res = await pool.query (
      `select is-private from users where id = $1`,
      [user_id]
    )
    if(result.rows.length === 0) {
      throw new Error('User not found');
    }
    const currentPrivacy = result.rows[0].is_private;
    const updatedPrivacy = !currentPrivacy;

    await pool.query(
      `update users set is_private = $1 where id = $2`,
      [updatedPrivacy,user_id]
    )
    return {success: true, is_private:updatedPrivacy};
  }catch(err) {
    console.error('Eroor updating privacy:',err)
    throw err;
  }
}

