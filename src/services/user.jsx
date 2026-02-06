import { API_TOKEN_KEY, api } from "./api.config";

export const fetchUsersService = async () => {
  try {
    const res = await api.get("users");
    console.log(res);

    return { success: true, users: res.data.data };
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Fetch users failed";
    return { success: false, errors: { users: message } };
  }
};
