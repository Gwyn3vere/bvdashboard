import { loginLayout } from "../components/layouts";
// Pages
import { Login } from "../pages/Login";

const publicRoutes = [
  {
    path: "/",
    component: Login,
    layout: loginLayout,
    role: ["admin", "user"]
  }
];

export default publicRoutes;
