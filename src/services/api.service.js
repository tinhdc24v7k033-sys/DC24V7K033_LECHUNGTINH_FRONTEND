import axios from "axios";

export default (baseUrl) => {
  const api = axios.create({
    baseURL: "http://localhost:3000" + baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 🔥 Gắn token vào mọi request
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // 🔥 Bắt lỗi response (nếu token hết hạn)
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // token hết hạn → logout
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return api;
};