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
    `SELECT c.*, 
    u1.firstname as user1_firstname, 
    u2.firstname as user2_firstname,
    u1.image as user1_image, 
    u2.image as user2_image
    FROM chats AS c 
    JOIN users AS u1 ON c.user1_id = u1.id
    JOIN users AS u2 ON c.user2_id = u2.id
    WHERE user1_id = $1
    OR user2_id = $1`,
    [user1_id]
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

export const pinMessageFunction = async (message_id) => {
  const { rows: chat } = await pool.query(
    `SELECT chat_id FROM messages WHERE id = $1`,
    [message_id]
  );

  await pool.query(
    `UPDATE messages 
    SET is_pinned = false
    WHERE chat_id = $1 
    AND is_pinned = true`,
    [chat[0].chat_id]
  );

  const { rows } = await pool.query(
    `UPDATE messages 
    SET is_pinned = true
    WHERE id = $1
    RETURNING *`,
    [message_id]
  );
  return rows[0];
};

export const unpinMessageFunction = async (message_id) => {
  const { rows } = await pool.query(
    `UPDATE messages 
      SET is_pinned = false
      WHERE id = $1
      RETURNING *`,
    [message_id]
  );
  return rows[0];
};
