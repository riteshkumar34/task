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
const provider = new GoogleAuthProvider();

// Google Popup Login Function (important)
export const googlePopupLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const token = await user.getIdToken();

    return { user, token };
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};
