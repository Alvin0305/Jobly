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
    UPDATE messages
    SET seen = true,
    seen_at = NOW()
    WHERE chat_id = $1
    AND sender_id != $2
    AND seen = false
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
  const { id, content } = messageData;
  const { rows } = await pool.query(
    `UPDATE messages 
    SET content = $1,
    is_edited = true
    WHERE id = $2
    RETURNING *`,
    [content, id]
  );
  return rows[0];
};

export const pinMessageFunction = async (message_id) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const { rows: chat } = await client.query(
      `SELECT chat_id FROM messages WHERE id = $1`,
      [message_id]
    );

    if (!chat.length) {
      throw new Error("Message not found");
    }

    await client.query(
      `UPDATE messages 
    SET is_pinned = false
    WHERE chat_id = $1 
    AND is_pinned = true`,
      [chat[0].chat_id]
    );

    const { rows } = await client.query(
      `UPDATE messages 
    SET is_pinned = true
    WHERE id = $1
    RETURNING *`,
      [message_id]
    );

    await client.query("COMMIT");

    return rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
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
