import React, { useState } from "react";
import api from "../lib/axios.js";
import { googlePopupLogin } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { token: firebaseToken } = await googlePopupLogin();
      const res = await api.post("/auth/google", { token: firebaseToken });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.log("Google login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className="bg-white shadow-2xl p-10 rounded-3xl w-full max-w-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Task Manager</h1>
        <p className="text-gray-500 mb-8">
          Sign in with your Google account to manage your tasks efficiently.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-900 px-6 py-3 w-full rounded-xl hover:bg-gray-50 shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle size={28} />
          <span className="font-semibold text-lg">
            {loading ? "Logging in..." : "Login with Google"}
          </span>
        </button>

        <p className="mt-6 text-gray-400 text-sm">
          By logging in, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-gray-700">
            Terms & Conditions
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
