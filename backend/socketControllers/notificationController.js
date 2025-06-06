import { alreadyFollowing, getPostOwner, getUserName, insertComment, insertConnectionNotification, insertNotification, insertPostLike, reqExists } from "../models/notification";

export const likePost = async (user_id, post_id,io) => {
  // insert to post like table
  // add to notifications
  // emit post_liked signal to send a notification to the post creator

  try{
    await insertPostLike(post_id,user_id);

    const receiver = await getPostOwner(post_id);

    if(!receiver || receiver.owner_id === user_id)
      return;

    const sender = await getUserName(user_id);
    const content = `${sender.firstname} liked your post`;

    const notification = await insertNotification({sender_id:user_id, receiver_id:receiver.owner_id, content, post_id,type:"Like"});

    io.to(`user_${receiver}.owner_id`).emit("post_liked",{notification});

    console.log(`Notification sent to user ${receiver.owner_id}`);
  }catch(err){
      console.error("Error in likePost :", err);
  }

  // i.e., io.to(`user_${post_creater_id}`).emit("post_liked", {
  //  user_id, post_details, ... other fields that might be needed in front end to show in the notification
  // });
  //  ---- take the post creater id from the post using post id or take it as parameter.
};

export const commentPost = async (user_id, comment,io) => {
  // insert into comments table
  // add to notifications
  // emit post_commented signal to send a notification to the post creator

  try{
    const {post_id, content} = comment;
    
    const insertCmnt = await insertComment({post_id,user_id,content});

    const owner = await getPostOwner(post_id);
    if (!owner || owner.owner_id === user_id)
      return;
    
    const sender = await getUserName(user_id);
    const cmntContent = `${sender.firstname} commented on your post`;

    const notification = await insertNotification({sender_id:user_id, receiver_id:owner.owner_id, content:cmntContent, post_id, type:"Comment"});

    io.to(`user_${owner}.owner_id`).emit("post_commented",{notification, comment:insertCmnt});
    console.log("comment notification sent successfully");

  }catch(err){
    console.error("Error in commentPost : ",err);
  }
  // i.e., io.to(`user_${post_creater_id}`).emit("post_commented", {
  //  user_id, post_details, ... other fields that might be needed in front end to show in the notification
  // });
  //  ---- take the post creater id from the post using post id or take it as parameter.
};

export const sendConnectionRequest = async (sender_id, receiver_id,io) => {
  // add to notifications
  // emit reveive_connection_request to send a notification to the receiver

  try{
    const alreadyFrnds = await alreadyFollowing(sender_id,receiver_id);
    const alreadyReq = await reqExists(sender_id,receiver_id);
    if(alreadyFrnds || alreadyReq)
    {
      console.log("Can't send request again");
      return;
    }

    const sender = await getUserName(user_id);
    const reqContent = `${sender.firstname} sent a friend request`;

    const notification = await insertConnectionNotification({sender_id, receiver_id, content:reqContent, type:"Friend-request"});

    io.to(`user_${owner}.owner_id`).emit("requested_friend_connection",{notification});
    console.log("Friend request sent successfully");

  }catch(err){
    console.error("Error in sendConnectionRequest : ",err);
  }
  // i.e., io.to(`user_${receiverId}`).emit("receive_connection", {
  //  sender_id, ... other fields that might be needed in front end to show in the notification
  // });
};
