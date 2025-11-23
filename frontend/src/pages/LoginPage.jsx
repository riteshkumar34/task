import React from "react";
import api from "../lib/axios";
import { googlePopupLogin } from "../firebase";   
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {

  const handleGoogleLogin = async () => {
    try {
      const { user, token: firebaseToken } = await googlePopupLogin();
      const res = await api.post("/auth/google", { token: firebaseToken });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.log("Google login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-2xl p-10 rounded-2xl w-[380px] text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Task Manager Login</h1>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 px-6 py-3 w-full rounded-lg hover:bg-gray-100 shadow-md transition duration-300"
        >
          <FcGoogle size={28} />
          <span className="font-semibold text-lg">Login with Google</span>
        </button>

        <p className="mt-6 text-gray-500 text-sm">
          By logging in, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
