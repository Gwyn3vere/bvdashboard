import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helper";

export default function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/bang-dieu-khien" replace />;
  }
  return children;
}
