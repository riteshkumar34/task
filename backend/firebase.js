import admin from "firebase-admin";
import fs from "fs";
import path from "path";

let serviceAccount;

if (process.env.FIREBASE_ADMIN_KEY) {
  // Production: env variable se
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
  } catch (e) {
    console.error("Firebase key parse error from ENV:", e);
  }
} else {
  // Local development: serviceAccountKey.json se
  try {
    const filePath = path.join(process.cwd(), "serviceAccountKey.json");
    const data = fs.readFileSync(filePath, "utf-8");
    serviceAccount = JSON.parse(data);
  } catch (e) {
    console.error("Firebase key read error from file:", e);
  }
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
