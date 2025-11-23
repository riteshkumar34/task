import React, { useState } from "react";
import api from "../lib/axios.js";
import { googlePopupLogin } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);
    try {
      // Step 1: Firebase Google login
      const { token: firebaseToken } = await googlePopupLogin();

      // Step 2: Send token to backend
      const res = await api.post("/auth/google", { token: firebaseToken });

      // Step 3: Save JWT
      localStorage.setItem("token", res.data.token);

      // Step 4: Redirect
      window.location.href = "/";
    } catch (err) {
      console.log("Google login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className="bg-white shadow-2xl p-10 rounded-3xl w-full max-w-sm text-center transform transition-transform hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Task Manager</h1>
        <p className="text-gray-500 mb-8">
          Login with your Google account to continue
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 px-6 py-3 w-full rounded-xl hover:bg-gray-100 shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle size={28} />
          <span className="font-semibold text-lg">
            {loading ? "Loading..." : "Login with Google"}
          </span>
        </button>

        <p className="mt-6 text-gray-400 text-sm">
          By logging in, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
