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
    console.error('Error fetching comments from DB:', err); // better debugging
    throw err;
  }
};