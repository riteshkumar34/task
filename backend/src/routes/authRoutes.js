import express from "express";
const router = express.Router();

router.post("/google", (req, res) => {
  res.json({ ok: true, route: "Google Auth Route Working" });
});

export default router;
