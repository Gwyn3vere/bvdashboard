import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function PublicRoute({ children }) {
  const { user, initialized } = useAuthStore();

  if (user && initialized) {
    return <Navigate to="/bang-dieu-khien" replace />;
  }

  return children;
}
