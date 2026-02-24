const metaRoutes = {
  "/bang-dieu-khien": {
    breadcrumb: [{ label: "Bảng điều khiển" }],
  },
  "/quan-ly-lich-hen": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý lịch hẹn" },
    ],
  },
  "/quan-ly-nhan-su": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý nhân sự" },
    ],
  },
  "/quan-ly-bac-si": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý bác sĩ" },
    ],
  },
  "/quan-ly-bac-si/lich-lam-viec": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý bác sĩ", href: "/quan-ly-bac-si" },
      { label: "Lịch làm việc" },
    ],
  },
  "/quan-ly-tin-tuc": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý tin tức" },
    ],
  },
  "/quan-ly-tin-tuc/duyet-bai": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
      { label: "Duyệt bài" },
    ],
  },
  "/quan-ly-tin-tuc/dang-bai": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
      { label: "Đăng bài" },
    ],
  },
  "/quan-ly-tin-tuc/cap-nhat-bai-viet/:id": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
      { label: "Cập nhật bài viết" },
    ],
  },
  "/quan-ly-tin-tuc/:id": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
      { label: "Chi tiết bài viết" },
    ],
  },
  "/quan-ly-tin-tuc/bai-viet-cua-toi": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
      { label: "Bài viết của tôi" },
    ],
  },
  "/quan-ly-banner": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý banner" },
    ],
  },
  "/quan-ly-chuyen-mon": {
    breadcrumb: [
      { label: "Bảng điều khiển", href: "/bang-dieu-khien" },
      { label: "Quản lý chuyên môn" },
    ],
  },
};

export default metaRoutes;
