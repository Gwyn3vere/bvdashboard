import { MOCK_STAFF_ACCOUNT } from "../mock/staffs";
import {
  generateMockToken,
  authStorage,
  decodeToken,
} from "../utils/mockToken";

/**
 * Mock login service
 */
export const loginService = async ({ email, password }) => {
  // giả lập độ trễ mạng (simulate network latency)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_STAFF_ACCOUNT.find(
    (acc) => acc.email === email && acc.password === password,
  );

  if (!user) {
    return {
      success: false,
      errors: {
        login: "Email hoặc mật khẩu không đúng",
      },
    };
  }

  // không trả password về client
  const { password: _, ...safeUser } = user;

  return {
    success: true,
    user: safeUser,
    access_token: generateMockToken(user),
  };
};

/**
 * Mock get current user (/auth/me)
 */
export const userService = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const token = authStorage.getToken();
  if (!token) {
    return { success: false };
  }

  const payload = decodeToken(token);
  if (!payload || payload.exp * 1000 < Date.now()) {
    authStorage.clear();
    return { success: false };
  }

  const user = MOCK_STAFF_ACCOUNT.find((acc) => acc.id === payload.sub);
  if (!user) {
    return { success: false };
  }

  const { password: _, ...safeUser } = user;

  return {
    success: true,
    user: safeUser,
  };
};
