// ============================================================
//  MOCK_APPOINTMENTS — Generated từ SCHEDULE_CONFIG
//  295 lịch hẹn trải đều 7 ngày 09–15/03/2026
//  Đa dạng giờ 7h–17h để heatmap có màu sắc rõ ràng
// ============================================================

// ── Helpers ──────────────────────────────────────────────────
const MOCK_BASE_MONDAY = "2026-03-09";

const DOCTOR_MAP = {
  1: {
    name: "Nguyễn Văn A",
    title: "BS.CKII",
    departmentId: "noi",
    departmentName: "Khoa Nội",
    specialtyId: "noi-tong-quat",
    specialtyName: "Nội khoa",
    slotDurationMinutes: 30,
  },
  2: {
    name: "Trần Thị B",
    title: "ThS.BS",
    departmentId: "san",
    departmentName: "Khoa CSSKSS & Phụ Sản",
    specialtyId: "san-khoa",
    specialtyName: "Sản khoa",
    slotDurationMinutes: 60,
  },
  3: {
    name: "Lê Văn C",
    title: "BS.CKI",
    departmentId: "ngoai",
    departmentName: "Khoa Ngoại",
    specialtyId: "chan-thuong-chinh-hinh",
    specialtyName: "Chấn thương chỉnh hình",
    slotDurationMinutes: 30,
  },
  4: {
    name: "Phạm Thị D",
    title: "BS.CKI",
    departmentId: "nhi",
    departmentName: "Khoa Nhi",
    specialtyId: "nhi-tong-quat",
    specialtyName: "Nhi khoa",
    slotDurationMinutes: 30,
  },
  5: {
    name: "Hoàng Văn E",
    title: "ThS.BS",
    departmentId: "rhm-m-tmh",
    departmentName: "Khoa RHM - M - TMH",
    specialtyId: "tai-mui-hong",
    specialtyName: "Tai Mũi Họng",
    slotDurationMinutes: 30,
  },
  6: {
    name: "Võ Thị F",
    title: "BS.CKI",
    departmentId: "rhm-m-tmh",
    departmentName: "Khoa RHM - M - TMH",
    specialtyId: "rang-ham-mat",
    specialtyName: "Răng Hàm Mặt",
    slotDurationMinutes: 60,
  },
  7: {
    name: "Đặng Văn G",
    title: "BS",
    departmentId: "yhct-phcn",
    departmentName: "Khoa YHCT và PHCN",
    specialtyId: "yhct",
    specialtyName: "Y học cổ truyền",
    slotDurationMinutes: 60,
  },
  8: {
    name: "Nguyễn Thị H",
    title: "BS.CKII",
    departmentId: "noi",
    departmentName: "Khoa Nội",
    specialtyId: "noi-tim-mach",
    specialtyName: "Nội Tim mạch",
    slotDurationMinutes: 30,
  },
  9: {
    name: "Lê Quốc I",
    title: "ThS.BS",
    departmentId: "cdha",
    departmentName: "Khoa Chẩn đoán hình ảnh",
    specialtyId: "cdha",
    specialtyName: "Chẩn đoán hình ảnh",
    slotDurationMinutes: 30,
  },
  10: {
    name: "Trần Văn K",
    title: "BS.CKI",
    departmentId: "kham-benh",
    departmentName: "Khoa Khám Bệnh",
    specialtyId: "da-lieu",
    specialtyName: "Da liễu",
    slotDurationMinutes: 30,
  },
  12: {
    name: "Phạm Thị M",
    title: "BS.CKI",
    departmentId: "rhm-m-tmh",
    departmentName: "Khoa RHM - M - TMH",
    specialtyId: "mat",
    specialtyName: "Mắt",
    slotDurationMinutes: 30,
  },
  13: {
    name: "Võ Văn N",
    title: "ThS.BS",
    departmentId: "noi",
    departmentName: "Khoa Nội",
    specialtyId: "noi-tieu-hoa",
    specialtyName: "Nội Tiêu hóa",
    slotDurationMinutes: 60,
  },
  14: {
    name: "Ngô Thị Tuyết Nhung",
    title: "BS.CK Nội",
    departmentId: "noi",
    departmentName: "Khoa Nội",
    specialtyId: "noi-than-kinh",
    specialtyName: "Nội Thần kinh",
    slotDurationMinutes: 30,
  },
  15: {
    name: "Lê Văn P",
    title: "BS",
    departmentId: "xet-nghiem",
    departmentName: "Khoa Xét nghiệm",
    specialtyId: "xet-nghiem",
    specialtyName: "Xét nghiệm",
    slotDurationMinutes: 15,
  },
  16: {
    name: "Đào Thị Túy Duyên",
    title: "BS.CKI",
    departmentId: "nhi",
    departmentName: "Khoa Nhi",
    specialtyId: "nhi-tong-quat",
    specialtyName: "Nhi khoa",
    slotDurationMinutes: 30,
  },
  18: {
    name: "Phạm Văn S",
    title: "ThS.BS",
    departmentId: "noi",
    departmentName: "Khoa Nội",
    specialtyId: "noi-co-xuong-khop",
    specialtyName: "Nội Cơ xương khớp",
    slotDurationMinutes: 30,
  },
};

const PATIENT_POOL = [
  {
    fullName: "Lê Hoàng Nam",
    dateOfBirth: "1978-11-22",
    gender: "male",
    phone: "0923456789",
    email: "",
    address: "78 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng",
    insuranceCode: "DN4011055544433",
  },
  {
    fullName: "Đỗ Thị Mai",
    dateOfBirth: "1956-09-28",
    gender: "female",
    phone: "0956789012",
    email: "",
    address: "34 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    insuranceCode: "DN4011033344455",
  },
  {
    fullName: "Võ Thành Đạt",
    dateOfBirth: "1982-07-07",
    gender: "male",
    phone: "0945678901",
    email: "dat.vo@outlook.com",
    address: "56 Phan Đình Phùng, Liên Chiều, Đà Nẵng",
    insuranceCode: "DN4011098765432",
  },
  {
    fullName: "Phạm Thu Hương",
    dateOfBirth: "1995-03-15",
    gender: "female",
    phone: "0934567890",
    email: "",
    address: "12 Hoàng Diệu, Hải Châu, Đà Nẵng",
    insuranceCode: "",
  },
  {
    fullName: "Hoàng Văn Bình",
    dateOfBirth: "1968-04-15",
    gender: "male",
    phone: "0977123456",
    email: "binh.hv@gmail.com",
    address: "101 Tôn Đức Thắng, Liên Chiều, Đà Nẵng",
    insuranceCode: "DN4011076543210",
  },
  {
    fullName: "Bùi Quang Huy",
    dateOfBirth: "1988-01-19",
    gender: "male",
    phone: "0967890123",
    email: "",
    address: "90 Lý Thường Kiệt, Cẩm Lệ, Đà Nẵng",
    insuranceCode: "DN4011066677888",
  },
  {
    fullName: "Trần Thị Liên",
    dateOfBirth: "1972-06-30",
    gender: "female",
    phone: "0908765432",
    email: "",
    address: "55 Ngô Quyền, Sơn Trà, Đà Nẵng",
    insuranceCode: "DN4011088899900",
  },
  {
    fullName: "Lý Minh Khải",
    dateOfBirth: "1980-02-14",
    gender: "male",
    phone: "0901111222",
    email: "khai.ly@yahoo.com",
    address: "44 Hùng Vương, Hải Châu, Đà Nẵng",
    insuranceCode: "",
  },
  {
    fullName: "Vũ Thị Nga",
    dateOfBirth: "1993-06-05",
    gender: "female",
    phone: "0978901234",
    email: "nga.vu@gmail.com",
    address: "23 Trường Sa, Ngũ Hành Sơn, Đà Nẵng",
    insuranceCode: "",
  },
  {
    fullName: "Đinh Văn Tùng",
    dateOfBirth: "1965-12-11",
    gender: "male",
    phone: "0989012345",
    email: "",
    address: "67 Núi Thành, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011002233441",
  },
  {
    fullName: "Lê Thị Phương",
    dateOfBirth: "1997-03-20",
    gender: "female",
    phone: "0912987654",
    email: "phuong.le@gmail.com",
    address: "20 Phan Châu Trinh, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011010203040",
  },
  {
    fullName: "Ngô Thị Bích Ngọc",
    dateOfBirth: "1989-11-11",
    gender: "female",
    phone: "0911223344",
    email: "",
    address: "33 Hà Huy Tập, Thanh Khê, Đà Nẵng",
    insuranceCode: "DN4011055566677",
  },
  {
    fullName: "Hoàng Thị Yến",
    dateOfBirth: "1998-04-30",
    gender: "female",
    phone: "0990123456",
    email: "yen.hoang@gmail.com",
    address: "15 Trần Cao Vân, Thanh Khê, Đà Nẵng",
    insuranceCode: "",
  },
  {
    fullName: "Trương Thị Nhung",
    dateOfBirth: "1975-10-08",
    gender: "female",
    phone: "0912222333",
    email: "nhung.truong@gmail.com",
    address: "88 Lê Duẩn, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011044455566",
  },
  {
    fullName: "Phạm Ngọc Sơn",
    dateOfBirth: "2001-07-14",
    gender: "male",
    phone: "0355667788",
    email: "son.pn@gmail.com",
    address: "7 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng",
    insuranceCode: "",
  },
  {
    fullName: "Lưu Thị Kim Chi",
    dateOfBirth: "1970-08-18",
    gender: "female",
    phone: "0944556677",
    email: "",
    address: "19 Lê Hồng Phong, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011030405060",
  },
  {
    fullName: "Trần Đức Thắng",
    dateOfBirth: "1960-02-28",
    gender: "male",
    phone: "0966778899",
    email: "",
    address: "52 Núi Thành, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011070809100",
  },
  {
    fullName: "Nguyễn Thị Hồng Vân",
    dateOfBirth: "1975-12-03",
    gender: "female",
    phone: "0903112233",
    email: "van.nth@gmail.com",
    address: "88 Hoàng Hoa Thám, Liên Chiều, Đà Nẵng",
    insuranceCode: "DN4011085960700",
  },
  {
    fullName: "Phan Thị Hoa",
    dateOfBirth: "1960-05-20",
    gender: "female",
    phone: "0933221100",
    email: "",
    address: "99 Lê Duẩn, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011099887766",
  },
  {
    fullName: "Bùi Văn Thịnh",
    dateOfBirth: "1955-10-10",
    gender: "male",
    phone: "0922113344",
    email: "",
    address: "44 Tôn Đức Thắng, Liên Chiều, Đà Nẵng",
    insuranceCode: "DN4011088990011",
  },
  {
    fullName: "Nguyễn Thị Thu Hiền",
    dateOfBirth: "1995-04-08",
    gender: "female",
    phone: "0911223300",
    email: "hien.nth@gmail.com",
    address: "28 Trường Sa, Ngũ Hành Sơn, Đà Nẵng",
    insuranceCode: "DN4011012300456",
  },
  {
    fullName: "Lý Quốc Khánh",
    dateOfBirth: "1988-07-03",
    gender: "male",
    phone: "0900112233",
    email: "",
    address: "17 Điện Biên Phủ, Hải Châu, Đà Nẵng",
    insuranceCode: "",
  },
  {
    fullName: "Huỳnh Văn Phúc",
    dateOfBirth: "2010-06-20",
    gender: "male",
    phone: "0944332211",
    email: "",
    address: "50 Lê Lợi, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4041045678901",
    guardianName: "Huỳnh Thị Lan",
    guardianRelation: "Mẹ",
  },
  {
    fullName: "Vũ Thị Lan Anh",
    dateOfBirth: "1972-09-14",
    gender: "female",
    phone: "0966554433",
    email: "",
    address: "36 Ngô Quyền, Sơn Trà, Đà Nẵng",
    insuranceCode: "DN4011023412345",
  },
  {
    fullName: "Cao Văn Hùng",
    dateOfBirth: "1963-11-01",
    gender: "male",
    phone: "0977889900",
    email: "",
    address: "23 Lê Đình Dương, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011034523456",
  },
  {
    fullName: "Nguyễn Thị Kim Thanh",
    dateOfBirth: "1958-03-25",
    gender: "female",
    phone: "0911002233",
    email: "",
    address: "55 Hoàng Văn Thụ, Thanh Khê, Đà Nẵng",
    insuranceCode: "DN4011045634567",
  },
  {
    fullName: "Lê Thị Ngọc Ánh",
    dateOfBirth: "1998-07-11",
    gender: "female",
    phone: "0355223344",
    email: "anh.ltn@gmail.com",
    address: "3 Trần Phú, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011056756789",
  },
  {
    fullName: "Trương Văn Lợi",
    dateOfBirth: "1952-06-06",
    gender: "male",
    phone: "0944221100",
    email: "",
    address: "80 Núi Thành, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011067867890",
  },
  {
    fullName: "Võ Thị Hương Giang",
    dateOfBirth: "1985-02-18",
    gender: "female",
    phone: "0922334400",
    email: "giang.vth@gmail.com",
    address: "25 Phan Đình Phùng, Liên Chiều, Đà Nẵng",
    insuranceCode: "DN4011078978901",
  },
  {
    fullName: "Nguyễn Minh Tuấn",
    dateOfBirth: "1985-05-12",
    gender: "male",
    phone: "0901234567",
    email: "tuan.nm@gmail.com",
    address: "123 Lê Lợi, Hải Châu, Đà Nẵng",
    insuranceCode: "DN4011012345678",
  },
];

const SYMPTOMS_POOL = [
  "Mệt mỏi, chán ăn kéo dài 3 tuần.",
  "Đau đầu, hoa mắt, chóng mặt.",
  "Huyết áp cao, hay đau đầu buổi sáng.",
  "Đánh trống ngực, hồi hộp bất thường.",
  "Đau dạ dày mãn tính, ợ chua sau ăn.",
  "Viêm họng mãn tính, khàn tiếng.",
  "Đau răng, ê buốt khi ăn đồ lạnh.",
  "Đau lưng mãn tính, cứng khớp buổi sáng.",
  "Nhìn mờ khi nhìn xa, hay nheo mắt.",
  "Xét nghiệm định kỳ kiểm soát đường huyết.",
  "Bé sốt nhẹ, ho khan, chảy nước mũi.",
  "Thai định kỳ tam cá nguyệt.",
  "Tái khám sau điều trị tăng huyết áp.",
  "Kiểm tra phát triển định kỳ.",
  "Ngạt mũi mãn tính, ngủ ngáy.",
  "Siêu âm kiểm tra định kỳ.",
  "Điều trị phục hồi chức năng.",
  "Khám sức khoẻ tổng quát định kỳ.",
  "Đau vai gáy, tê bì tay.",
  "Nổi mẩn đỏ, ngứa vùng cổ.",
];

const SERVICE_MAP = {
  1: { id: "sv-001", name: "Khám nội khoa tổng quát", price: 150000 },
  2: { id: "sv-027", name: "Khám thai định kỳ", price: 150000 },
  3: { id: "sv-024", name: "Khám chấn thương chỉnh hình", price: 160000 },
  4: { id: "sv-047", name: "Khám nhi tổng quát", price: 130000 },
  5: { id: "sv-072", name: "Khám tai mũi họng tổng quát", price: 140000 },
  6: { id: "sv-062", name: "Khám răng hàm mặt tổng quát", price: 100000 },
  7: { id: "sv-055", name: "Châm cứu", price: 200000 },
  8: { id: "sv-004", name: "Khám tim mạch tổng quát", price: 180000 },
  9: { id: "sv-076", name: "Siêu âm tổng quát", price: 180000 },
  10: { id: "sv-037", name: "Điều trị dị ứng da", price: 180000 },
  12: { id: "sv-069", name: "Đo thị lực & khúc xạ", price: 110000 },
  13: { id: "sv-010", name: "Nội soi dạ dày", price: 550000 },
  14: { id: "sv-013", name: "Khám thần kinh tổng quát", price: 180000 },
  15: { id: "sv-081", name: "Sinh hoá máu", price: 250000 },
  16: { id: "sv-047", name: "Khám nhi tổng quát", price: 130000 },
  18: { id: "sv-017", name: "Khám cơ xương khớp", price: 160000 },
};

// ── Lịch làm việc — (doctorId, dayOffset, slots[], statuses[]) ──
// dayOffset: 0=T2, 1=T3, 2=T4, 3=T5, 4=T6, 5=T7, 6=CN
const SCHEDULE_CONFIG = [
  ["15", 0, ["07:00", "07:15", "07:30", "07:45", "08:00"], ["DONE", "DONE", "DONE", "CONFIRMED", "CONFIRMED"]], // T2 09/03 - Lê Văn P
  [
    "8",
    0,
    ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00"],
    ["DONE", "CONFIRMED", "CONFIRMED", "PENDING", "PENDING", "CONFIRMED"],
  ], // T2 09/03 - Nguyễn Thị H
  [
    "1",
    0,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["DONE", "CONFIRMED", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T2 09/03 - Nguyễn Văn A
  ["4", 0, ["08:00", "08:30", "09:00", "09:30", "10:00"], ["DONE", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T2 09/03 - Phạm Thị D
  ["2", 0, ["14:00", "15:00", "16:00"], ["CONFIRMED", "PENDING", "CONFIRMED"]], // T2 09/03 - Trần Thị B
  ["7", 0, ["14:00", "15:00", "16:00"], ["DONE", "CONFIRMED", "PENDING"]], // T2 09/03 - Đặng Văn G
  ["18", 0, ["08:00", "08:30", "09:00", "09:30"], ["DONE", "CONFIRMED", "CANCELLED", "PENDING"]], // T2 09/03 - Phạm Văn S
  ["5", 0, ["08:00", "08:30", "09:00", "09:30", "10:00"], ["DONE", "CONFIRMED", "CONFIRMED", "PENDING", "CONFIRMED"]], // T2 09/03 - Hoàng Văn E
  [
    "15",
    1,
    ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45"],
    ["DONE", "DONE", "DONE", "DONE", "CONFIRMED", "CONFIRMED", "PENDING", "PENDING"],
  ], // T3 10/03 - Lê Văn P
  [
    "8",
    1,
    ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T3 10/03 - Nguyễn Thị H
  [
    "1",
    1,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "DONE", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T3 10/03 - Nguyễn Văn A
  ["13", 1, ["08:00", "09:00", "10:00", "11:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T3 10/03 - Võ Văn N
  [
    "14",
    1,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T3 10/03 - Ngô Thị Tuyết Nhung
  [
    "4",
    1,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "DONE"],
  ], // T3 10/03 - Phạm Thị D
  ["10", 1, ["08:00", "08:30", "09:00", "09:30", "10:00"], ["PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T3 10/03 - Trần Văn K
  [
    "5",
    1,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T3 10/03 - Hoàng Văn E
  ["6", 1, ["08:00", "09:00", "10:00", "11:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "CANCELLED"]], // T3 10/03 - Võ Thị F
  ["7", 1, ["08:00", "09:00", "10:00", "11:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T3 10/03 - Đặng Văn G
  [
    "9",
    1,
    ["09:00", "10:00", "11:00", "13:30", "14:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T3 10/03 - Lê Quốc I
  [
    "2",
    1,
    ["08:00", "09:00", "10:00", "14:00", "15:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T3 10/03 - Trần Thị B
  ["18", 1, ["08:00", "08:30", "09:00", "09:30", "10:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "DONE", "PENDING"]], // T3 10/03 - Phạm Văn S
  ["12", 1, ["08:00", "08:30", "09:00", "09:30"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T3 10/03 - Phạm Thị M
  [
    "8",
    2,
    ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T4 11/03 - Nguyễn Thị H
  [
    "2",
    2,
    ["08:00", "09:00", "10:00", "14:00", "15:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T4 11/03 - Trần Thị B
  [
    "3",
    2,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T4 11/03 - Lê Văn C
  ["7", 2, ["14:00", "15:00", "16:00", "17:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T4 11/03 - Đặng Văn G
  ["10", 2, ["08:00", "08:30", "09:00", "09:30"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T4 11/03 - Trần Văn K
  [
    "12",
    2,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T4 11/03 - Phạm Thị M
  ["13", 2, ["08:00", "09:00", "10:00", "11:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T4 11/03 - Võ Văn N
  [
    "4",
    2,
    ["08:00", "08:30", "09:00", "09:30", "10:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T4 11/03 - Phạm Thị D
  [
    "14",
    2,
    ["09:00", "09:30", "10:00", "10:30", "13:30", "14:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T4 11/03 - Ngô Thị Tuyết Nhung
  [
    "15",
    3,
    ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T5 12/03 - Lê Văn P
  [
    "1",
    3,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T5 12/03 - Nguyễn Văn A
  [
    "8",
    3,
    ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T5 12/03 - Nguyễn Thị H
  [
    "2",
    3,
    ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T5 12/03 - Trần Thị B
  [
    "4",
    3,
    ["08:00", "08:30", "09:00", "09:30", "10:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T5 12/03 - Phạm Thị D
  [
    "6",
    3,
    ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T5 12/03 - Võ Thị F
  [
    "9",
    3,
    ["07:30", "08:00", "08:30", "09:00", "09:30", "13:30", "14:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T5 12/03 - Lê Quốc I
  ["14", 3, ["09:00", "09:30", "10:00", "10:30"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // T5 12/03 - Ngô Thị Tuyết Nhung
  [
    "15",
    4,
    ["07:00", "07:15", "07:30", "07:45", "08:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T6 13/03 - Lê Văn P
  [
    "13",
    4,
    ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T6 13/03 - Võ Văn N
  [
    "18",
    4,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T6 13/03 - Phạm Văn S
  [
    "16",
    4,
    ["08:00", "08:30", "09:00", "09:30", "10:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T6 13/03 - Đào Thị Túy Duyên
  [
    "2",
    4,
    ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T6 13/03 - Trần Thị B
  [
    "12",
    4,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T6 13/03 - Phạm Thị M
  [
    "5",
    4,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T6 13/03 - Hoàng Văn E
  [
    "1",
    5,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "13:30", "14:00", "14:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T7 14/03 - Nguyễn Văn A
  [
    "4",
    5,
    ["08:00", "08:30", "09:00", "09:30", "10:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T7 14/03 - Phạm Thị D
  [
    "5",
    5,
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // T7 14/03 - Hoàng Văn E
  [
    "7",
    5,
    ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED", "PENDING"],
  ], // T7 14/03 - Đặng Văn G
  ["6", 6, ["08:00", "09:00", "10:00", "11:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // CN 15/03 - Võ Thị F
  ["7", 6, ["08:00", "09:00", "10:00", "11:00"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // CN 15/03 - Đặng Văn G
  [
    "8",
    6,
    ["07:30", "08:00", "08:30", "09:00", "09:30"],
    ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING", "CONFIRMED"],
  ], // CN 15/03 - Nguyễn Thị H
  ["15", 6, ["07:00", "07:15", "07:30", "07:45"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // CN 15/03 - Lê Văn P
  ["16", 6, ["08:00", "08:30", "09:00", "09:30"], ["CONFIRMED", "PENDING", "CONFIRMED", "PENDING"]], // CN 15/03 - Đào Thị Túy Duyên
];

// ── Generator ─────────────────────────────────────────────────
function addMinutes(timeStr, minutes) {
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function buildAppointments() {
  const base = new Date("2026-03-09T00:00:00.000Z");
  let counter = 1;
  const result = [];

  for (const [doctorId, dayOffset, slots, statuses] of SCHEDULE_CONFIG) {
    const doc = DOCTOR_MAP[doctorId];
    const svc = SERVICE_MAP[doctorId];
    const apptDate = new Date(base);
    apptDate.setDate(apptDate.getDate() + dayOffset);
    const dateStr = apptDate.toISOString().slice(0, 10);

    slots.forEach((slotStart, i) => {
      const status = statuses[i];
      const slotEnd = addMinutes(slotStart, doc.slotDurationMinutes);
      const patient = PATIENT_POOL[counter % PATIENT_POOL.length];
      const symptoms = SYMPTOMS_POOL[counter % SYMPTOMS_POOL.length];

      result.push({
        id: `appt-${String(counter).padStart(3, "0")}`,
        status,
        createdAt: `${dateStr}T06:30:00.000Z`,
        updatedAt: `${dateStr}T07:00:00.000Z`,
        confirmedAt: ["PENDING", "CANCELLED"].includes(status) ? null : `${dateStr}T07:30:00.000Z`,
        cancelledAt: status === "CANCELLED" ? `${dateStr}T09:00:00.000Z` : null,
        doneAt: status === "DONE" ? `${dateStr}T${slotEnd}:00.000Z` : null,
        cancelReason: status === "CANCELLED" ? "Bệnh nhân bận đột xuất." : null,
        departmentId: doc.departmentId,
        departmentName: doc.departmentName,
        specialtyId: doc.specialtyId,
        specialtyName: doc.specialtyName,
        serviceId: svc.id,
        serviceName: svc.name,
        servicePrice: svc.price,
        doctorId,
        doctorName: doc.name,
        doctorTitle: doc.title,
        appointmentDate: dateStr,
        slotStart,
        slotEnd,
        slotDurationMinutes: doc.slotDurationMinutes,
        patient,
        symptoms,
        note: "",
      });
      counter++;
    });
  }
  return result;
}

export const MOCK_APPOINTMENTS = buildAppointments();

const MOCK_BASE_MONDAY_SHIFT = "2026-03-09";

function shiftToCurrentWeek(appointments) {
  const pad = (n) => String(n).padStart(2, "0");
  const getMonday = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const diff = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - diff);
    return d;
  };
  const baseMon = getMonday(MOCK_BASE_MONDAY_SHIFT);
  const todayMon = getMonday(new Date());
  const offsetDays = Math.round((todayMon - baseMon) / (1000 * 60 * 60 * 24));
  if (offsetDays === 0) return appointments;
  return appointments.map((a) => {
    const [y, m, d] = a.appointmentDate.split("-").map(Number);
    const shifted = new Date(y, m - 1, d + offsetDays);
    const newDate = `${shifted.getFullYear()}-${pad(shifted.getMonth() + 1)}-${pad(shifted.getDate())}`;
    return { ...a, appointmentDate: newDate };
  });
}

export const APPOINTMENTS = shiftToCurrentWeek(MOCK_APPOINTMENTS);

export function getAppointments(filters = {}) {
  const { date, doctorId, departmentId, specialtyId, status } = filters;
  return APPOINTMENTS.filter((a) => {
    if (date && a.appointmentDate !== date) return false;
    if (doctorId && a.doctorId !== doctorId) return false;
    if (departmentId && a.departmentId !== departmentId) return false;
    if (specialtyId && a.specialtyId !== specialtyId) return false;
    if (status && a.status !== status) return false;
    return true;
  });
}

export function getAppointmentById(id) {
  return APPOINTMENTS.find((a) => a.id === id) ?? null;
}
