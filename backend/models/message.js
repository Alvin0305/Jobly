import pool from "../db.js";

export const getMessageByIdFunction = async (message_id) => {
  const { rows } = await pool.query(`SELECT * FROM messages WHERE id = $1`, [
    message_id,
  ]);
  return rows[0];
};

export const createMessageFunction = async (messageData) => {
  const { sender_id, chat_id, content, reply_to, file_url } = messageData;
  const { rows } = await pool.query(
    `INSERT INTO messages (sender_id, chat_id, content, reply_to, file_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [sender_id, chat_id, content || null, reply_to || null, file_url || null]
  );

  return rows[0];
};

export const readMessagesFunction = async (chat_id, user_id) => {
  const { rows } = await pool.query(
    `
        INSERT INTO message_seen (message_id, user_id)
        SELECT m.id, $2 
        FROM messages AS m
          WHERE m.chat_id = $1
          AND m.sender_id != $2
          AND m.deleted = FALSE
          AND NOT EXISTS (
              SELECT 1 FROM message_seen ms
              WHERE ms.message_id = m.id 
              AND ms.user_id = $2
          )
          ORDER BY m.created_at ASC
          RETURNING *
        `,
    [chat_id, user_id]
  );
  return rows;
};

export const deleteMessageFunction = async (message_id) => {
  const { rows } = await pool.query(
    `UPDATE messages 
    SET is_deleted = True 
    WHERE id = $1 
    RETURNING *`,
    [message_id]
  );

  return rows[0];
};

export const updateMessageFunction = async (messageData) => {
  const { message_id, content } = messageData;
  const { rows } = await pool.query(
    `UPDATE messages 
    SET content = $1
    WHERE id = $2
    RETURNING *`,
    [content, message_id]
  );
  return rows[0];
};
