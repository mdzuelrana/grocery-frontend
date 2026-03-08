import axios from "axios";

const api = axios.create({
  baseURL: "https://bismillah-grocery.vercel.app",
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("access");

    // Only skip login endpoint
    if (token && config.url !== "/auth/jwt/create/") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);

export default api;