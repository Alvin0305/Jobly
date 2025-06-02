export const joinChat = async (user_id, chat_id) => {
  // emit a user_joined signal
};

export const readMessages = async (user_id, chat_id) => {
  // update the message seen value
  // emit a message_read signal
};

export const sendMessage = async (sender_id, chat_id, content, file_url) => {
  // add the message to the messages table
  // emit a receive_message signal
};

export const deleteMessage = async (message_id) => {
  // update the is_deleted attribute of the message in messages table
  // emit message_delete signal
};

export const updateMessage = async (message_id, content) => {
  // update the content of the message in messages table
  // emit message_updated signal
};

export const disconnect = async (chat_id, user_id) => {
  // just print the chat id and user id
};
