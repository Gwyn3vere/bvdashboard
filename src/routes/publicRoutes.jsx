import { loginLayout } from "../components/layouts";
// Pages
import { LoginForm } from "../pages/";

const publicRoutes = [
  {
    path: "/",
    component: LoginForm,
    layout: loginLayout,
    role: ["admin", "user"]
  }
];

export default publicRoutes;
