import { LuBook, LuBookCheck, LuEye, LuBookKey, LuBookText } from "react-icons/lu";

export const mockNews = [
  {
    id: 1,
    banner: "https://picsum.photos/300/150?random=1",
    title: "Tuyên truyền phòng chống dịch bệnh",
    author: "Nguyễn Văn A",
    date: "2024-06-01",
    status: "Đã xuất bản",
    view: 120
  },
  {
    id: 2,
    banner: "https://picsum.photos/300/150?random=2",
    title: "Chiến dịch tiêm chủng mở rộng cho trẻ em",
    author: "Trần Thị B",
    date: "2024-05-20",
    status: "Đã xuất bản",
    view: 85
  },
  {
    id: 3,
    banner: "https://picsum.photos/300/150?random=3",
    title: "Nâng cao năng lực y tế cộng đồng tại các vùng sâu",
    author: "Lê Văn C",
    date: "2024-04-15",
    status: "Đang xem xét",
    view: 0
  },
  {
    id: 4,
    banner: "https://picsum.photos/300/150?random=4",
    title: "Hướng dẫn phòng ngừa sốt xuất huyết mùa mưa",
    author: "Phạm Thị D",
    date: "2024-06-10",
    status: "Đã xuất bản",
    view: 45
  },
  {
    id: 5,
    banner: "https://picsum.photos/300/150?random=5",
    title: "Cập nhật về phòng chống COVID-19 và biến chủng mới",
    author: "Nguyễn Thị E",
    date: "2024-03-30",
    status: "Đã xuất bản",
    view: 200
  },
  {
    id: 6,
    banner: "https://picsum.photos/300/150?random=6",
    title: "Chương trình chăm sóc sức khỏe tâm thần cho học sinh",
    author: "Hoàng Văn F",
    date: "2024-02-18",
    status: "Bản nháp",
    view: 0
  },
  {
    id: 7,
    banner: "https://picsum.photos/300/150?random=7",
    title: "Phát hiện sớm và quản lý bệnh đái tháo đường",
    author: "Trương Thị G",
    date: "2024-01-25",
    status: "Đã xuất bản",
    view: 95
  },
  {
    id: 8,
    banner: "https://picsum.photos/300/150?random=8",
    title: "An toàn thực phẩm: Kiểm soát tại các bếp ăn công cộng",
    author: "Đỗ Văn H",
    date: "2024-05-05",
    status: "Đã xuất bản",
    view: 60
  },
  {
    id: 9,
    banner: "https://picsum.photos/300/150?random=9",
    title: "Đào tạo y tế từ xa cho nhân viên tuyến đầu",
    author: "Vũ Thị I",
    date: "2024-04-28",
    status: "Đang xem xét",
    view: 0
  },
  {
    id: 10,
    banner: "https://picsum.photos/300/150?random=10",
    title: "Khuyến cáo dinh dưỡng cho người cao tuổi",
    author: "Bùi Văn J",
    date: "2024-06-05",
    status: "Đã xuất bản",
    view: 30
  }
];

export const NEWS_TOTAL_STATUS = [
  { icon: <LuBook />, title: "Tổng bài đăng", desc: "+15 bài đăng trong tháng này", total: 132 },
  { icon: <LuBookCheck />, title: "Đã xuất bản", desc: "70% tổng số bài viết", total: 89 },
  { icon: <LuBookKey />, title: "Bản phê duyệt", desc: "Cần chờ phê duyệt", total: 28 },
  { icon: <LuBookText />, title: "Bản nháp", desc: "Cần hoàn thiện", total: 5 },
  { icon: <LuEye />, title: "Tổng lượt xem", desc: "+3.2k so với tháng trước", total: 15800 }
];
