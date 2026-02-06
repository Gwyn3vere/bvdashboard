import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsersService = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`, { withCredentials: true });
    console.log(res);

    return { success: true, users: res.data.data };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Fetch users failed";
    return { success: false, errors: { users: message } };
  }
};
