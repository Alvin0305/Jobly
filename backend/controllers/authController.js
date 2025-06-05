import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import {
  addToLoginLogs,
  createUser,
  findUserByEmail,
  findUserById,
  markUserAsOffline,
  markUserAsOnline,
} from "../models/user.js";

export const getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await findUserById(id);
    if (!user) return res.status(404).json({ error: `No data found` });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const existing = await findUserByEmail(email);
    if (existing)
      return res
        .status(401)
        .json({ error: "Already have an account, try login" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await createUser(
      firstname,
      lastname,
      email,
      password_hash,
      role
    );
    if (!user) return res.status(400).json({ error: "Error in creating user" });
    await markUserAsOnline(user.id);
    return res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.log(`Register User failed due to ${err}`);
    res
      .status(500)
      .json({ error: `Registering user failed due to ${err.message}` });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      await addToLoginLogs(user.id, "Failed");
      return res.status(401).json({ error: "Incorrect Password" });
    }
    await markUserAsOnline(user.id);
    await addToLoginLogs(user.id, "Success");

    res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Login failed with error ${err.message}` });
  }
};

export const logoutUser = async (req, res) => {
  const id = req.user?.id;

  try {
    const offlineUser = await markUserAsOffline(id);
    if (!offlineUser)
      return res.status(400).json({ error: "Failed to log out user" });
    res.json({ message: "User logged out successfully" });
  } catch (err) {
    console.log("Failed to mark offline");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
