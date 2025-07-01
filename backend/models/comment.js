import pool from "../db.js";

export const getCommentsFunction = async (post_id) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.firstname, u.lastname 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.post_id = $1 
       ORDER BY c.time DESC`,
      [post_id]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching comments from DB:", err); // better debugging
    throw err;
  }
};

export const addCommentFunction = async (post_id, user_id, comment) => {
  const { rows } = await pool.query(
    `INSERT INTO 
      comments (post_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING * `,
    [post_id, user_id, comment]
  );
  const { rows: userDetails } = await pool.query(
    `
    SELECT firstname, lastname, image FROM users WHERE id = $1`,
    [user_id]
  );
  rows[0].firstname = userDetails[0].firstname;
  rows[0].lastname = userDetails[0].lastname;
  rows[0].image = userDetails[0].image;
  return rows[0];
};
