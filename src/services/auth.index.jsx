import * as realAuth from "./auth";
import * as mockAuth from "./auth.mock";

const useMock = import.meta.env.VITE_USE_MOCK_API === "true";

const authService = useMock ? mockAuth : realAuth;

export const loginService = authService.loginService;
export const userService = authService.userService;
