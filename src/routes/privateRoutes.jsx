import { dashboardLayout } from "../components/layouts";
// Pages
import { Dashboard } from "../pages/Dashboard";
import { Appointment } from "../pages/Appointment";
import { Staff } from "../pages/Staff";
import { Doctor, Calendar } from "../pages/Doctor";
import { News, Post, Article, Waiting, MyPost } from "../pages/News";
import { Banner } from "../pages/Banner";
import { Medical } from "../pages/Medical";

const privateRoutes = [
  {
    path: "/bang-dieu-khien",
    component: Dashboard,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-lich-hen",
    component: Appointment,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-nhan-su",
    component: Staff,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-bac-si",
    component: Doctor,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-bac-si/lich-lam-viec",
    component: Calendar,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-tin-tuc",
    component: News,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-tin-tuc/duyet-bai",
    component: Waiting,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-tin-tuc/dang-bai",
    component: Post,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-tin-tuc/cap-nhat-bai-viet/:id",
    component: Post,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-tin-tuc/:id",
    component: Article,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-tin-tuc/bai-viet-cua-toi",
    component: MyPost,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-banner",
    component: Banner,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
  {
    path: "/quan-ly-chuyen-mon",
    component: Medical,
    layout: dashboardLayout,
    role: ["admin", "user"],
  },
];

export default privateRoutes;
