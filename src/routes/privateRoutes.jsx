import { dashboardLayout } from "../components/layouts";
// Pages
import { Dashboard } from "../pages/Dashboard";
import { Staff } from "../pages/Staff";
import { Doctor } from "../pages/Doctor";
import { News, Post } from "../pages/News";
import { Banner } from "../pages/Banner";

const privateRoutes = [
  {
    path: "/bang-dieu-khien",
    component: Dashboard,
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
    path: "/quan-ly-bac-si",
    component: Doctor,
    layout: dashboardLayout,
    role: ["admin", "user"]
  },
  {
    path: "/quan-ly-tin-tuc",
    component: News,
    layout: dashboardLayout,
    role: ["admin", "user"]
  },
  {
    path: "/quan-ly-tin-tuc/dang-bai",
    component: Post,
    layout: dashboardLayout,
    role: ["admin", "user"]
  },
  {
    path: "/quan-ly-banner",
    component: Banner,
    layout: dashboardLayout,
    role: ["admin", "user"]
  }
];

export default privateRoutes;
