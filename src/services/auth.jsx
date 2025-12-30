import axios from "axios";

// Kiểm tra môi trường
const IS_PROD = import.meta.env.VITE_NODE_ENV === "production";

// Chọn baseURL dựa trên ENV
const API_URL = IS_PROD ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_URL;

// Kiểm tra dev có dùng token không
const USE_TOKEN = import.meta.env.VITE_API_USE_TOKEN === "true";

// Tạo instance axios
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // để cookie gửi kèm
});

// Interceptor request: thêm token header nếu dev
if (USE_TOKEN) {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

// Interceptor response: tự logout khi 401 (dev)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && USE_TOKEN) {
      localStorage.removeItem("accessToken");
      // Optional: redirect login nếu muốn
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Login
 * @param {{email: string, password: string}} param0
 */
export const loginService = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    // Lưu token nếu dev
    if (USE_TOKEN && res.data.data.accessToken) {
      localStorage.setItem("accessToken", res.data.data.accessToken);
    }

    return { success: true, user: res.data.user ?? res.data };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Login failed";
    return { success: false, errors: { login: message } };
  }
};

export const userService = async () => {
  try {
    const res = await api.get("/auth/profile");
    return { success: true, user: res.data };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Fetch user failed";
    return { success: false, errors: { user: message } };
  }
};

export const logoutService = async () => {
  try {
    if (USE_TOKEN) localStorage.removeItem("accessToken");
    await api.post("/auth/logout", {});
    return { success: true };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Logout failed";
    return { success: false, errors: { logout: message } };
  }
};
