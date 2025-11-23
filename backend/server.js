import express from "express";
import notesRoutes from "./src/routes/notesRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://task-manager-tau-mauve.vercel.app",
      "https://task-manager-git-main-riteshkumar34s-projects.vercel.app",
      "https://task-git-dev-riteshkumar34s-projects.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// --- Routes ---
app.use("/api/notes", notesRoutes);  // Notes CRUD
app.use("/api/auth", authRoutes);        // Google Login Backend Route

// --- Start Server ---
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on PORT ${PORT}`);
  });
});
