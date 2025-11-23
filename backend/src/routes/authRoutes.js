import express from "express";
import admin from "../../firebase.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // 1️⃣ Firebase token verify
    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email;
    const name = decoded.name;
    const photo = decoded.picture;

    // 2️⃣ DB me user find karo
    let user = await User.findOne({ email });

    // 3️⃣ Agar nahi mila → create karo
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: photo,
      });
    }

    // 4️⃣ JWT create
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: jwtToken,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Google auth failed" });
  }
});

export default router;
