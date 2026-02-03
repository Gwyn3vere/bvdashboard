export const generateMockToken = (user) => {
  return btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 1000 * 60 * 60 // 1 giờ
    })
  );
};

export const decodeMockToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

const TOKEN_KEY = "access_token";

export const authStorage = {
  save(token, remember) {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }
};
