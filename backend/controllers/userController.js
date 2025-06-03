import { getUserFollowingFunction } from "../models/user.js";

export const getUserFollowing = async (req, res) => {
  // use the get user following function in the user model to get the users who follow the given user

  const {id} = req.params;

  try{
    const following = await getUserFollowingFunction(id);
    res.status(200).json(following);
  }catch(err){
    console.log("Error fetching following: ",err);
    res.status(500).json({ error:"Internal server error"});
  }
};

export const getUserFollowers = async (req, res) => {
  
}

export const getMutualFriends = async (req, res) => {
  // use the get mutual friends function in the user model to get the mutual friends
};

export const updateUser = async (req, res) => {
  // use the update user function in the user model to update the user
};

export const deleteUser = async (req, res) => {
  // use the delete user function in the user model to delete the user
};

export const getUserNotifications = async (req, res) => {
  // use the get user notification function in the user model to get the notifications of the user
};

export const searchUsers = async (req, res) => {
  //use the search user function in the user model to get the search result for users
};
