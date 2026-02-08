import { jwtDecode } from "jwt-decode";
const API_TOKEN_KEY = import.meta.env.VITE_USE_TOKEN_KEY;
const MOCK_DECODE = import.meta.env.VITE_USE_MOCK_DECODE

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

export const decodeToken = (token) => {
  try {
    if (MOCK_DECODE) {
          return JSON.parse(atob(token));
    } else {
      return jwtDecode(token);
    }
  } catch {
    return null;
  }
};


export const authStorage = {
  save(token, remember) {
    if (remember) {
      localStorage.setItem(API_TOKEN_KEY, token);
      sessionStorage.setItem(API_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(API_TOKEN_KEY, token);
    }
  },

  getToken() {
    return localStorage.getItem(API_TOKEN_KEY) || sessionStorage.getItem(API_TOKEN_KEY);
  },

  clear() {
    localStorage.removeItem(API_TOKEN_KEY);
    sessionStorage.removeItem(API_TOKEN_KEY);
  }
};
