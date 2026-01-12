// src/firebase.js

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCA66rqs_86qcEoGpLpAN8rrgNvrb2DeE4",
  authDomain: "taskmanager-a2ae7.firebaseapp.com",
  projectId: "taskmanager-a2ae7",
  storageBucket: "taskmanager-a2ae7.firebasestorage.app",
  messagingSenderId: "596936948098",
  appId: "1:596936948098:web:4c2f3755707cb89feb779b",
  measurementId: "G-Q5BEDLQ8KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth Setup
export const auth = getAuth(app);

// Google provider
const provider = new GoogleAuthProvider();

// Prevent COOP popup errors
provider.setCustomParameters({
  prompt: "select_account" // always ask account → no silent fail
});

// 🔥 Optimized popup login function
export const googlePopupLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const token = await user.getIdToken();

    return { user, token };

  } catch (error) {
    // Handle popup closed by user → NO ERROR THROW
    if (error.code === "auth/popup-closed-by-user") {
      console.warn("User closed popup manually.");
      return null; // Return null instead of throwing
    }

    // Handle popup blocked
    if (error.code === "auth/popup-blocked") {
      console.warn("Popup blocked by browser.");
      return null;
    }

    // Other errors (network etc)
    console.error("Unexpected Google login error:", error);
    return null;
  }
};
