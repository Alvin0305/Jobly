export const likePost = async (user_id, post_id) => {
  // insert to post like table
  // add to notifications
  // emit post_liked signal
};

export const commentPost = async (user_id, comment) => {
  // insert into comments table
  // add to notifications
  // emit post_commented signal
};

export const sendConnectionRequest = async (sender_id, receiverId) => {
  // add to notifications
  // emit reveive_connection_request
};
