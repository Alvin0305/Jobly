import pool from "../db.js";

export const insertPostLike = async (post_id, user_id) => {
  await pool.query(
    `INSERT INTO post_likes (post_id, liked_by)
        VALUES ($1,$2)
        ON CONFLICT (post_id, liked_by) DO NOTHING`,
    [post_id, user_id]
  );
};

export const deletePostLike = async (post_id, user_id) => {
  await pool.query(
    `DELETE FROM post_likes 
        WHERE liked_by = $1 AND post_id = $2`,
    [user_id, post_id]
  );
};

export const getPostOwner = async (post_id) => {
  const { rows } = await pool.query(
    `SELECT p.user_id AS owner_id, u.firstname AS owner_name
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = $1`,
    [post_id]
  );
  return rows[0];
};

export const getUserName = async (user_id) => {
  const { rows } = await pool.query(
    `SELECT firstname FROM users WHERE id = $1`,
    [user_id]
  );
  return rows[0];
};

export const insertNotification = async ({
  sender_id,
  receiver_id,
  content,
  post_id,
  type,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO notifications (sender_id, receiver_id,content,post_id,type)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *`,
    [sender_id, receiver_id, content, post_id, type]
  );
  return rows[0];
};

export const insertComment = async ({ post_id, user_id, content }) => {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id,user_id,content)
        VALUES ($1,$2,$3)
        RETURNING *`,
    [post_id, user_id, content]
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

export const reqExists = async (requestor_id, acceptor_id) => {
  const { rows } = await pool.query(
    `SELECT 1 FROM requests 
        WHERE requestor_id = $1 AND acceptor_id = $2 AND status='pending'`,
    [requestor_id, acceptor_id]
  );
  return rows.length > 0;
};

export const alreadyFollowing = async (follower_id, following_id) => {
  const { rows } = await pool.query(
    `SELECT 1 FROM friends WHERE follower_id = $1 AND following_id = $2`,
    [follower_id, following_id]
  );
  return rows.length > 0;
};

export const insertConnectionNotification = async ({
  sender_id,
  receiver_id,
  content,
  type,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO notifications (sender_id, receiver_id, content, type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
    [sender_id, receiver_id, content, type]
  );
  return rows[0];
};
