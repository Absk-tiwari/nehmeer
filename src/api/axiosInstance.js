import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nehmeer-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Token attach
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;