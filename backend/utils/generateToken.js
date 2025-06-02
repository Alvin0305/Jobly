import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  console.log(`generating token for ${userId}`);
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
