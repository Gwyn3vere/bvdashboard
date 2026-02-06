// services/api.config.js hoặc utils/api.js
import axios from "axios";

// Kiểm tra môi trường
const IS_PROD = import.meta.env.VITE_NODE_ENV === "production";

// Chọn baseURL dựa trên ENV
const API_URL = IS_PROD ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_URL;
const API_TOKEN_KEY = import.meta.env.VITE_USE_TOKEN_KEY;

// Kiểm tra dev có dùng token không
const USE_TOKEN = import.meta.env.VITE_API_USE_TOKEN === "true";

// ✅ TẠO 1 INSTANCE DUY NHẤT
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// ✅ Interceptor request: thêm token header
if (USE_TOKEN) {
  api.interceptors.request.use((config) => {
    // Đọc từ CẢ 2 storage
    const token = localStorage.getItem(API_TOKEN_KEY) || sessionStorage.getItem(API_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}

// ✅ Interceptor response: xử lý 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && USE_TOKEN) {
      localStorage.removeItem(API_TOKEN_KEY);
      sessionStorage.removeItem(API_TOKEN_KEY);

      // Redirect to login
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

// Export để dùng ở mọi nơi
export { API_TOKEN_KEY };
