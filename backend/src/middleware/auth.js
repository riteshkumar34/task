import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // 1️⃣ Request headers me se token le lo
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) throw new Error("No token provided");

    // 2️⃣ Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ User find karke req.user me attach karo
    req.user = await User.findById(decoded.id);

    next(); // request aage jaaye
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};
