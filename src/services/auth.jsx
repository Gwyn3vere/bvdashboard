import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginService = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
    return { success: true, user: res.data };
  } catch (error) {
    return { success: false, errors: { login: error.response.data.message || "Login failed" } };
  }
};

export const userService = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });

    return { success: true, user: res.data };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Fetch user failed";

    return { success: false, errors: { user: message } };
  }
};
