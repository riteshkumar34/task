import admin from "firebase-admin";

let serviceAccount = null;

try {
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
} catch (e) {
  console.error(" Firebase key parse error:", e);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;
