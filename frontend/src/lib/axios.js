import axios from "axios";

const BASE_URLS = {
  development: "http://localhost:5001/api",
  production: "https://task46.onrender.com/api",
};

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? BASE_URLS.development
      : BASE_URLS.production,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
