import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
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
    markUserAsOnline(user.id);
    res.json({
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
    console.log(user);
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log(user);
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Incorrect Password" });
    markUserAsOnline(user.id);
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
