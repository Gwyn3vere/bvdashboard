import { dashboardLayout } from "../components/layouts";
// Pages
import { Overview } from "../pages/Overview";
import { Dashboard } from "../pages/Dashboard";
import { Staff, Create } from "../pages/Staff";

const privateRoutes = [
  {
    path: "/bang-dieu-khien",
    component: Dashboard,
    layout: dashboardLayout,
    role: ["admin", "user"]
  },
  {
    path: "/tong-quan",
    component: Overview,
    layout: dashboardLayout,
    role: ["admin", "user"]
  },
  {
    path: "/quan-ly-nhan-su",
    component: Staff,
    layout: dashboardLayout,
    role: ["admin", "user"]
  },
  {
    path: "/quan-ly-nhan-su/them-moi",
    component: Create,
    layout: dashboardLayout,
    role: ["admin", "user"]
  }
];

export default privateRoutes;
