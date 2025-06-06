export const likePost = async (user_id, post_id) => {
  // insert to post like table
  // add to notifications
  // emit post_liked signal to send a notification to the post creator
  // i.e., io.to(`user_${post_creater_id}`).emit("post_liked", {
  //  user_id, post_details, ... other fields that might be needed in front end to show in the notification
  // });
  //  ---- take the post creater id from the post using post id or take it as parameter.
};

export const commentPost = async (user_id, comment) => {
  // insert into comments table
  // add to notifications
  // emit post_commented signal to send a notification to the post creator
  // i.e., io.to(`user_${post_creater_id}`).emit("post_commented", {
  //  user_id, post_details, ... other fields that might be needed in front end to show in the notification
  // });
  //  ---- take the post creater id from the post using post id or take it as parameter.
};

export const sendConnectionRequest = async (sender_id, receiverId) => {
  // add to notifications
  // emit reveive_connection_request to send a notification to the receiver
  // i.e., io.to(`user_${receiverId}`).emit("receive_connection", {
  //  sender_id, ... other fields that might be needed in front end to show in the notification
  // });
};
