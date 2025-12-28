import { formatPercent, formatNumber } from "../utils/format";

export const patientData = [
  { month: "Tháng 1", recovered: 480, newPatient: 230 },
  { month: "Tháng 2", recovered: 220, newPatient: 380 },
  { month: "Tháng 3", recovered: 590, newPatient: 200 },
  { month: "Tháng 4", recovered: 360, newPatient: 270 },
  { month: "Tháng 5", recovered: 710, newPatient: 200 },
  { month: "Tháng 6", recovered: 880, newPatient: 510 },
  { month: "Tháng 7", recovered: 750, newPatient: 380 },
  { month: "Tháng 8", recovered: 410, newPatient: 770 },
  { month: "Tháng 9", recovered: 600, newPatient: 250 },
  { month: "Tháng 10", recovered: 260, newPatient: 500 },
  { month: "Tháng 11", recovered: 400, newPatient: 280 },
  { month: "Tháng 12", recovered: 200, newPatient: 920 }
];

export const appointmentData = [
  { month: "01", attended: 500, cancelled: 200 },
  { month: "02", attended: 382, cancelled: 56 },
  { month: "03", attended: 200, cancelled: 150 },
  { month: "04", attended: 726, cancelled: 132 },
  { month: "05", attended: 385, cancelled: 28 },
  { month: "06", attended: 400, cancelled: 150 },
  { month: "07", attended: 550, cancelled: 220 },
  { month: "08", attended: 820, cancelled: 100 },
  { month: "09", attended: 200, cancelled: 80 },
  { month: "10", attended: 650, cancelled: 250 },
  { month: "11", attended: 400, cancelled: 200 },
  { month: "12", attended: 350, cancelled: 100 }
];

// Mock data - Thay bằng data thực từ API
// CHÚ Ý: Đây là 3 metrics RIÊNG BIỆT với 3 mẫu số KHÁC NHAU
export const PatientPercentageData = {
  newPatient: {
    actual: formatNumber(450), // Số khách hàng mới
    total: formatNumber(700), // Tổng lượt khám trong tuần
    percentage: formatPercent((450 / 700) * 100), // 450/700 = 64%
    label: "New Patient",
    description: "Tỷ lệ khách hàng mới trong tổng lượt khám"
  },
  recovered: {
    actual: formatNumber(680), // Số ca khỏi bệnh
    total: formatNumber(931), // Tổng ca hoàn thành điều trị
    percentage: formatPercent((680 / 931) * 100), // 680/931 = 73%
    label: "Recovered",
    description: "Tỷ lệ bệnh nhân khỏi trong tổng ca hoàn thành"
  },
  inTreatment: {
    actual: formatNumber(320), // Số giường đang sử dụng
    total: formatNumber(666), // Tổng số giường bệnh
    percentage: formatPercent((320 / 666) * 100), // 320/666 = 48%
    label: "In Treatment",
    description: "Tỷ lệ giường bệnh đang sử dụng"
  }
};
