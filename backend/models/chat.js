import pool from "../db.js";

export const createChatFunction = async (user1_id, user2_id) => {
  const { rows } = await pool.query(
    `INSERT INTO chats (user1_id, user2_id)
    VALUES ($1, $2)
    RETURNING *`,
    [user1_id, user2_id]
  );
  return rows[0];
};

export const getUserChatsFunction = async (user1_id) => {
  const { rows } = await pool.query(
    `
    SELECT 
      c.*,
      u1.firstname AS user1_firstname,
      u1.lastname AS user1_lastname,
      u2.firstname AS user2_firstname,
      u2.lastname AS user2_lastname,
      u1.image AS user1_image,
      u2.image AS user2_image,
      m.content AS last_message,
      m.created_at AS last_message_time,
      ll.login_at AS user2_last_seen
    FROM chats c
    JOIN users u1 ON c.user1_id = u1.id
    JOIN users u2 ON c.user2_id = u2.id

    -- Get latest message for each chat
    LEFT JOIN LATERAL (
      SELECT content, created_at
      FROM messages
      WHERE chat_id = c.id
      ORDER BY created_at DESC
      LIMIT 1
    ) m ON true

    -- Get latest login of user2 (the other user)
    LEFT JOIN LATERAL (
      SELECT login_at
      FROM login_logs
      WHERE user_id = c.user2_id
        AND status = 'Success'
      ORDER BY login_at DESC
      LIMIT 1
    ) ll ON true

    WHERE c.user1_id = $1 OR c.user2_id = $1
    ORDER BY m.created_at DESC NULLS LAST
    `,
    [user1_id]
  );
  return rows;
};

export const getPublicAccountsFunction = async (user_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE is_private = false AND id != $1`,
    [user_id]
  );
  return rows;
};

export const getMessagesInChatFunction = async (chat_id) => {
  const { rows } = await pool.query(
    `SELECT m.*, 
    m1.sender_id as reply_sender_id, 
    m1.content as reply 
    FROM messages AS m 
    LEFT JOIN messages AS m1 ON m.reply_to = m1.id
    WHERE m.chat_id = $1 
    ORDER BY m.created_at`,
    [chat_id]
  );
  return rows;
};

export const getPinnedMessageFunction = async (chat_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM messages 
      WHERE chat_id = $1 AND is_pinned = true`,
    [chat_id]
  );
  console.log("pinned");
  console.log(rows);
  return rows[0];
};

export const fetchMediaInChatFunction = async (chat_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM messages 
            WHERE chat_id = $1 AND file_url IS NOT NULL`,
    [chat_id]
  );
  return rows;
};

export const clearChatFunction = async (chat_id) => {
  const { rows } = await pool.query(
    `DELETE FROM messages 
    WHERE chat_id = $1
    RETURNING *`,
    [chat_id]
  );
  return rows;
};
