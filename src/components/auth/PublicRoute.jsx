import { Navigate } from "react-router-dom";
import { authStorage, decodeMockToken } from "../../utils/mockToken";

export default function PublicRoute({ children }) {
  const token = authStorage.getToken();

  if (!token) return children;

  const payload = decodeMockToken(token);

  // token hợp lệ → redirect dashboard
  if (payload && payload.exp > Date.now()) {
    return <Navigate to="/bang-dieu-khien" replace />;
  }

  return children;
}
