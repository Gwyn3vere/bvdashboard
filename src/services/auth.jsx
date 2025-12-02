import { mockAccounts } from "../mock/account";
import { validateLogin } from "../utils/validation";

// Mock authentication service
export const loginService = async ({ email, password }) => {
  const errors = validateLogin({ email, password });
  if (Object.keys(errors).length) {
    return { success: false, errors };
  }

  const user = mockAccounts.find((u) => u.email === email && u.password === password);
  if (!user) {
    return { success: false, errors: { login: "Email hoặc password không đúng" } };
  }

  return { success: true, user };
};
