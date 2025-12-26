import { mockAccounts } from "../mock/manage";

/**
 * Mock login service
 */
export const loginService = async ({ email, password }) => {
  // giả lập độ trễ mạng (simulate network latency)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockAccounts.find((acc) => acc.email === email && acc.password === password);

  if (!user) {
    return {
      success: false,
      errors: {
        login: "Email hoặc mật khẩu không đúng"
      }
    };
  }

  // không trả password về client
  const { password: _, ...safeUser } = user;

  return {
    success: true,
    user: safeUser
  };
};

/**
 * Mock get current user (/auth/me)
 */
export const userService = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // giả lập user đang đăng nhập (lấy account đầu tiên)
  const { password: _, ...safeUser } = mockAccounts[0];

  return {
    success: true,
    user: safeUser
  };
};
