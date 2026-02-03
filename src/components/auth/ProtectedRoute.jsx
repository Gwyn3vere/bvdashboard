import { Navigate } from "react-router-dom";
import { authStorage, decodeMockToken } from "../../utils/mockToken";

export default function ProtectedRoute({ children }) {
  const token = authStorage.getToken();

  // chưa login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const payload = decodeMockToken(token);

  // token lỗi / hết hạn
  if (!payload || payload.exp < Date.now()) {
    authStorage.clear();
    return <Navigate to="/" replace />;
  }

  return children;
}
