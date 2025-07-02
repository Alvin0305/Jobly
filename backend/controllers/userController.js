
import {
  deleteUserFunction,
  getMutualFriendsFunction,
  getUserFollowersFunction,
  getUserFollowingFunction,
  getUserNotificationsFunction,
  searchUsersFunctions,
  updateUserFunction,
  getUserByIdFunction,
} from "../models/user.js";

export const getUserFollowing = async (req, res) => {
  // use the get user following function in the user model to get the users who follow the given user
  const user_id = req.params.id || req.user?.id;

  try {
    const following = await getUserFollowingFunction(user_id);
    res.status(200).json(following);
  } catch (err) {
    console.log("Error fetching following: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserFollowers = async (req, res) => {
  // use the get user followers function in the user model to get the users who follow the given user
  const user_id = req.params.id || req.user?.id;
  console.log(user_id);

  if (!user_id)
    return res.status(401).json({ error: "User is not authorized" });

  try {
    const followers = await getUserFollowersFunction(user_id);
    res.status(200).json({ followers });
  } catch (err) {
    console.error("Error in getUserFollowers :", err.message);
    res.status(500).json({ error: "Failed to fetch followers" });
  }
};

export const getMutualFriends = async (req, res) => {
  // use the get mutual friends function in the user model to get the mutual friends
  const user_id = req.params.id || req.user?.id;

  if (!user_id) return res.status(400).json({ error: "Unauthorized user" });

  try {
    const mutualFrnds = await getMutualFriendsFunction(user_id);
    const mutualCnt = mutualFrnds.length;

    res
      .status(200)
      .json({ mutual_count: mutualCnt, mutual_friends: mutualFrnds });
  } catch (err) {
    console.error("Error fetching mutual friends: ", err.message);
    res.status(500).json({ error: "Failed to fetch mutual friends " });
  }
};

export const updateUser = async (req, res) => {
  // use the update user function in the user model to update the user

  const userId = req.user.id;
  const userData = req.body;

  try {
    await updateUserFunction(userId, userData);
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user.", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  // use the delete user function in the user model to delete the user

  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) return res.status(400).json({ error: "Invalid user id" });

  try {
    await deleteUserFunction(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

export const getUserNotifications = async (req, res) => {
  // use the get user notification function in the user model to get the notifications of the user
  const userId = req.user.id;

  try {
    const notifications = await getUserNotificationsFunction(userId);
    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error in route:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const searchUsers = async (req, res) => {
  //use the search user function in the user model to get the search result for users
  const { searchValue, tags, isEmployee } = req.body;
  const { limit, offset } = req.query;

  try {
    const users = await searchUsersFunctions(
      searchValue || "",
      Array.isArray(tags) ? tags : [],
      typeof isEmployee === "boolean" ? isEmployee : null,
      offset,
      limit
    );
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error in searchUsers route:", err);
    res.status(500).json({ error: "Search failed" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await getUserByIdFunction(id);

    if (!user) return res.status(404).json({ error: "user not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUser : ", err);
    res.status(500).json({ error: "Failed to fetch other user's details" });
  }
};

export const userPrivacy = async(req,res) => {
 
  try{
    const user_id = req.user.id;
    if(!user_id) {
      return res
      .status(401)
      .json({ error: "Unauthorized: user_id missing from token" });
    }
    const privateResult = await userPrivacyFunction(user_id);
    return res.status(200).json({
      message:"Privacy setting updated",
      is_private:privacyResult.is_private
    })

  }catch(err) {
    console.error("Error in user privacy",err);
    return res.status(500).json({error:"INternal server error"});
  }

}
