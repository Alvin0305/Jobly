export const likePost = async (user_id, post_id) => {
  // insert to post like table
  // add to notifications
  // emit post_liked signal to send a notification to the post creator
};

export const commentPost = async (user_id, comment) => {
  // insert into comments table
  // add to notifications
  // emit post_commented signal to send a notification to the post creator
};

export const sendConnectionRequest = async (sender_id, receiverId) => {
  // add to notifications
  // emit reveive_connection_request to send a notification to the receiver
};
