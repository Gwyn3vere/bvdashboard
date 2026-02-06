import { Navigate } from "react-router-dom";
import { authStorage, decodeToken } from "../../utils/mockToken";

export default function PublicRoute({ children }) {
  const token = authStorage.getToken();

  if (!token) return children;

  const payload = decodeToken(token);

  // token hợp lệ → redirect dashboard
  if (payload && payload.exp * 1000 > Date.now()) {
    return <Navigate to="/bang-dieu-khien" replace />;
  }

  return children;
}
