export const joinUserOnLoggin = async ({ user_id, socket }) => {
  socket.join(`user_${user_id}`);
  console.log(`User logged in and has id 'user_${user_id}'`);
};
