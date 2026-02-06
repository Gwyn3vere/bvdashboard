import { API_TOKEN_KEY, api } from "./api.config";

/**
 * Login
 * @param {{email: string, password: string}} param0
 */
export const loginService = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    // Lưu token nếu dev
    if (USE_TOKEN && res.data.data.access_token) {
      sessionStorage.setItem(API_TOKEN_KEY, res.data.data.access_token);
    }

    return { success: true, access_token: res.data.data.access_token ?? res.data };
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
    if (USE_TOKEN) localStorage.removeItem(API_TOKEN_KEY);
    await api.post("/auth/logout", {});
    return { success: true };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Logout failed";
    return { success: false, errors: { logout: message } };
  }
};
