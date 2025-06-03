import pool from "../db.js";

export const createUser = async (
  firstname,
  lastname,
  email,
  password,
  role
) => {
  console.log(firstname, lastname, email, password, role);
  const { rows } = await pool.query(
    `INSERT INTO 
        users (firstname, lastname, email, password_hash, role) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [firstname, lastname, email, password, role]
  );
  console.log(rows[0]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  console.log(rows);
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  console.log(rows);
  return rows[0];
};

export const addLogFunction = async (user_id) => {
  // insert user_id into login logs table
  // after implementation, call this function in login and register
};

export const markUserAsOnline = async (user_id) => {
  // update the is_active value in users table for the user_id
  // after implementation, call this function in login and register
};

export const markUserAsOffline = async (user_id) => {
  // update the is_active value in users table for the user_id
  // after implementation of this function and log out function, call this function in log out function
};

export const getUserFollowersFunction = async (user_id) => {
  // get all the followers of the user with given id from the friendlist table
};

export const getUserFollowingFunction = async (user_id) => {
  // get all the users who follows the given user from the friendlist table

  const {rows} = await pool.query(
    `SELECT users.*
    FROM friends
    JOIN users ON friends.following_id = users.id
    WHERE friends.follower_id = $1`,
    [user_id]
  );
  return rows;
};

export const getMutualFriendsFunction = async (user_id) => {
  // get all the mutual friends of the user with given id
  // add the number of mutual friends count also in the result
};

export const updateUserFunction = async (user_id, userData) => {
  // update all the details of the user accordingly.
  // If the user variable contain a new language, add the language into the user language table.
  // If the language is not in the languages table, add it to the languages table first
};

export const deleteUserFunction = async (user_id) => {
  // delete the user from the users table
};

export const getUserNotificationsFunction = async (user_id) => {
  // get notifications of the user from the notification table
};

export const searchUsersFunctions = async (searchValue, tags, isEmployee) => {
  // get the users based on the searchValue, skills (tags) and whether they are
  // looking for an employee or employer or both
};
