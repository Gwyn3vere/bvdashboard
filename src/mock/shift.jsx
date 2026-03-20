// ============================================================
//  MOCK_DOCTOR_SHIFTS
//  Ca làm việc của bác sĩ — bảng trung gian giữa MOCK_DOCTOR_LIST
//  và MOCK_APPOINTMENTS. Được tạo từ "Cấu hình ca làm việc".
//
//  Cấu trúc 1 shift:
//  {
//    id:                  string,   // "shift-{doctorId}-{date}-{session}"
//    doctorId:            string,   // ref → MOCK_DOCTOR_LIST.id
//    date:                string,   // "YYYY-MM-DD"
//    session:             string,   // "morning" | "afternoon" | "fullday"
//    sessionLabel:        string,   // "Buổi sáng" | "Buổi chiều" | "Cả ngày"
//    startTime:           string,   // "HH:MM"
//    endTime:             string,   // "HH:MM"
//    slotDurationMinutes: number,   // 15 | 20 | 30 | 45 | 60
//    slots: Array<{                 // sinh từ startTime→endTime / duration
//      time:     string,            // "08:00-08:30"
//      isActive: boolean,           // false = slot bị khoá (nghỉ đột xuất)
//    }>,
//    totalSlots:          number,   // tổng slot isActive
//  }
//
//  Lưu ý: date dùng tuần gốc 09–15/03/2026 (giống MOCK_APPOINTMENTS).
//  shiftToCurrentWeek() trong mockAppointments.js sẽ shift sang tuần thật.
// ============================================================

// ── Helper ────────────────────────────────────────────────────
function genSlots(startTime, endTime, duration) {
  const slots = [];
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  let cur = sh * 60 + sm;
  const end = eh * 60 + em;
  const pad = (n) => String(n).padStart(2, "0");
  while (cur + duration <= end) {
    const from = `${pad(Math.floor(cur / 60))}:${pad(cur % 60)}`;
    const to = `${pad(Math.floor((cur + duration) / 60))}:${pad((cur + duration) % 60)}`;
    slots.push({ time: `${from}-${to}`, isActive: true });
    cur += duration;
  }
  return slots;
}

function makeShift(doctorId, date, session, startTime, endTime, duration) {
  const sessionLabel = { morning: "Buổi sáng", afternoon: "Buổi chiều", fullday: "Cả ngày" }[session];
  const slots = genSlots(startTime, endTime, duration);
  return {
    id: `shift-${doctorId}-${date}-${session}`,
    doctorId,
    date,
    session,
    sessionLabel,
    startTime,
    endTime,
    slotDurationMinutes: duration,
    slots,
    totalSlots: slots.filter((s) => s.isActive).length,
  };
}

// ── MOCK_DOCTOR_SHIFTS ────────────────────────────────────────
export const MOCK_DOCTOR_SHIFTS = [
  // ════════════════ T2 09/03/2026 ════════════════

  // BS 1 – Nguyễn Văn A (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("1", "2026-03-09", "morning", "08:00", "11:00", 30),

  // BS 2 – Trần Thị B (60p) — chiều 13:30–17:30 (4 slots, có appt 14:00)
  makeShift("2", "2026-03-09", "afternoon", "13:30", "17:30", 60),

  // BS 4 – Phạm Thị D (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("4", "2026-03-09", "morning", "08:00", "11:00", 30),

  // BS 5 – Hoàng Văn E (30p) — sáng 08:00–11:30 (7 slots)
  makeShift("5", "2026-03-09", "morning", "08:00", "11:30", 30),

  // BS 7 – Đặng Văn G (60p) — chiều 13:00–17:00 (4 slots, có appt 14:00)
  makeShift("7", "2026-03-09", "afternoon", "13:00", "17:00", 60),

  // BS 8 – Nguyễn Thị H (30p) — sáng 07:30–11:00 (7 slots)
  makeShift("8", "2026-03-09", "morning", "07:30", "11:00", 30),

  // BS 18 – Phạm Văn S (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("18", "2026-03-09", "morning", "08:00", "11:00", 30),

  // ════════════════ T3 10/03/2026 ════════════════

  // BS 1 – Nguyễn Văn A (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("1", "2026-03-10", "morning", "08:00", "11:00", 30),

  // BS 2 – Trần Thị B (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("2", "2026-03-10", "morning", "08:00", "12:00", 60),

  // BS 4 – Phạm Thị D (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("4", "2026-03-10", "morning", "08:00", "11:00", 30),

  // BS 5 – Hoàng Văn E (30p) — sáng 08:00–11:30 (7 slots)
  makeShift("5", "2026-03-10", "morning", "08:00", "11:30", 30),

  // BS 6 – Võ Thị F (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("6", "2026-03-10", "morning", "08:00", "12:00", 60),

  // BS 7 – Đặng Văn G (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("7", "2026-03-10", "morning", "08:00", "12:00", 60),

  // BS 8 – Nguyễn Thị H (30p) — sáng 07:30–11:00 (7 slots)
  makeShift("8", "2026-03-10", "morning", "07:30", "11:00", 30),

  // BS 9 – Lê Quốc I (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("9", "2026-03-10", "morning", "08:00", "12:00", 60),

  // BS 10 – Trần Văn K (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("10", "2026-03-10", "morning", "08:00", "11:00", 30),

  // BS 13 – Võ Văn N (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("13", "2026-03-10", "morning", "08:00", "12:00", 60),

  // BS 14 – Ngô Thị Tuyết Nhung (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("14", "2026-03-10", "morning", "08:00", "11:00", 30),

  // BS 15 – Lê Văn P (15p) — sáng 07:00–11:00 (16 slots)
  makeShift("15", "2026-03-10", "morning", "07:00", "11:00", 15),

  // BS 18 – Phạm Văn S (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("18", "2026-03-10", "morning", "08:00", "11:00", 30),

  // ════════════════ T4 11/03/2026 ════════════════

  // BS 2 – Trần Thị B (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("2", "2026-03-11", "morning", "08:00", "12:00", 60),

  // BS 3 – Lê Văn C (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("3", "2026-03-11", "morning", "08:00", "11:00", 30),

  // BS 7 – Đặng Văn G (60p) — chiều 13:00–17:00 (4 slots)
  makeShift("7", "2026-03-11", "afternoon", "13:00", "17:00", 60),

  // BS 8 – Nguyễn Thị H (30p) — sáng 07:30–11:00 (7 slots)
  makeShift("8", "2026-03-11", "morning", "07:30", "11:00", 30),

  // BS 10 – Trần Văn K (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("10", "2026-03-11", "morning", "08:00", "11:00", 30),

  // BS 12 – Phạm Thị M (30p) — sáng 08:00–11:30 (7 slots)
  makeShift("12", "2026-03-11", "morning", "08:00", "11:30", 30),

  // BS 13 – Võ Văn N (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("13", "2026-03-11", "morning", "08:00", "12:00", 60),

  // ════════════════ T5 12/03/2026 ════════════════

  // BS 1 – Nguyễn Văn A (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("1", "2026-03-12", "morning", "08:00", "11:00", 30),

  // BS 2 – Trần Thị B (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("2", "2026-03-12", "morning", "08:00", "12:00", 60),

  // BS 4 – Phạm Thị D (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("4", "2026-03-12", "morning", "08:00", "11:00", 30),

  // BS 6 – Võ Thị F (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("6", "2026-03-12", "morning", "08:00", "12:00", 60),

  // BS 8 – Nguyễn Thị H (30p) — sáng 07:30–11:00 (7 slots)
  makeShift("8", "2026-03-12", "morning", "07:30", "11:00", 30),

  // BS 9 – Lê Quốc I (30p) — sáng 07:30–11:00 (7 slots)
  makeShift("9", "2026-03-12", "morning", "07:30", "11:00", 30),

  // BS 14 – Ngô Thị Tuyết Nhung (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("14", "2026-03-12", "morning", "08:00", "11:00", 30),

  // ════════════════ T6 13/03/2026 ════════════════

  // BS 2 – Trần Thị B (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("2", "2026-03-13", "morning", "08:00", "12:00", 60),

  // BS 12 – Phạm Thị M (30p) — sáng 08:00–11:30 (7 slots)
  makeShift("12", "2026-03-13", "morning", "08:00", "11:30", 30),

  // BS 13 – Võ Văn N (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("13", "2026-03-13", "morning", "08:00", "12:00", 60),

  // BS 15 – Lê Văn P (15p) — sáng 07:00–11:00 (16 slots)
  makeShift("15", "2026-03-13", "morning", "07:00", "11:00", 15),

  // BS 16 – Đào Thị Túy Duyên (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("16", "2026-03-13", "morning", "08:00", "11:00", 30),

  // BS 18 – Phạm Văn S (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("18", "2026-03-13", "morning", "08:00", "11:00", 30),

  // ════════════════ T7 14/03/2026 ════════════════

  // BS 1 – Nguyễn Văn A (30p) — sáng 08:00–11:00 (6 slots) + chiều 13:30–17:00 (7 slots)
  makeShift("1", "2026-03-14", "morning", "08:00", "11:00", 30),
  makeShift("1", "2026-03-14", "afternoon", "13:30", "17:00", 30),

  // BS 4 – Phạm Thị D (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("4", "2026-03-14", "morning", "08:00", "11:00", 30),

  // BS 5 – Hoàng Văn E (30p) — sáng 08:00–11:30 (7 slots)
  makeShift("5", "2026-03-14", "morning", "08:00", "11:30", 30),

  // BS 7 – Đặng Văn G (60p) — sáng 08:00–12:00 + chiều 13:00–17:00 (8 slots)
  makeShift("7", "2026-03-14", "morning", "08:00", "12:00", 60),
  makeShift("7", "2026-03-14", "afternoon", "13:00", "17:00", 60),

  // ════════════════ CN 15/03/2026 ════════════════

  // BS 6 – Võ Thị F (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("6", "2026-03-15", "morning", "08:00", "12:00", 60),

  // BS 7 – Đặng Văn G (60p) — sáng 08:00–12:00 (4 slots)
  makeShift("7", "2026-03-15", "morning", "08:00", "12:00", 60),

  // BS 8 – Nguyễn Thị H (30p) — sáng 07:30–11:00 (7 slots)
  makeShift("8", "2026-03-15", "morning", "07:30", "11:00", 30),

  // BS 15 – Lê Văn P (15p) — sáng 07:00–10:00 (12 slots)
  makeShift("15", "2026-03-15", "morning", "07:00", "10:00", 15),

  // BS 16 – Đào Thị Túy Duyên (30p) — sáng 08:00–11:00 (6 slots)
  makeShift("16", "2026-03-15", "morning", "08:00", "11:00", 30),
];

// ── Helpers ───────────────────────────────────────────────────

// ── Shift sang tuần hiện tại (giống mockAppointments.js) ─────
// Khi có API thật: xóa toàn bộ phần này, dùng data từ API trực tiếp.
const MOCK_BASE_MONDAY = "2026-03-09";

function shiftToCurrentWeek(shifts) {
  const pad = (n) => String(n).padStart(2, "0");

  const getMonday = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const diff = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - diff);
    return d;
  };

  const baseMon = getMonday(MOCK_BASE_MONDAY);
  const todayMon = getMonday(new Date());
  const offsetDays = Math.round((todayMon - baseMon) / (1000 * 60 * 60 * 24));

  if (offsetDays === 0) return shifts;

  return shifts.map((s) => {
    const [y, m, d] = s.date.split("-").map(Number);
    const shifted = new Date(y, m - 1, d + offsetDays);
    const newDate = `${shifted.getFullYear()}-${pad(shifted.getMonth() + 1)}-${pad(shifted.getDate())}`;
    return {
      ...s,
      id: s.id.replace(s.date, newDate),
      date: newDate,
    };
  });
}

// DOCTOR_SHIFTS: dùng cái này thay vì MOCK_DOCTOR_SHIFTS thô.
// Khi có API thật: xóa dòng này, import từ API.
export const DOCTOR_SHIFTS = shiftToCurrentWeek(MOCK_DOCTOR_SHIFTS);

/**
 * Lấy tất cả shifts của 1 bác sĩ trong 1 ngày.
 * @param {string} doctorId
 * @param {string} date  "YYYY-MM-DD"
 */
export function getShiftsByDoctorDate(doctorId, date) {
  return DOCTOR_SHIFTS.filter((s) => s.doctorId === doctorId && s.date === date);
}

/**
 * Tính tổng slot của 1 bác sĩ trong 1 ngày (gộp nhiều ca).
 * Dùng cho fillRate trong getDoctorsByDate.
 * @param {string} doctorId
 * @param {string} date
 */
export function getTotalSlotsByDoctorDate(doctorId, date) {
  return getShiftsByDoctorDate(doctorId, date).reduce((sum, s) => sum + s.totalSlots, 0);
}

/**
 * Lấy slotDurationMinutes của bác sĩ trong ngày.
 * (Lấy từ ca đầu tiên — giả sử 1 bác sĩ dùng cùng duration trong ngày.)
 * @param {string} doctorId
 * @param {string} date
 */
export function getSlotDurationByDoctorDate(doctorId, date) {
  const shift = DOCTOR_SHIFTS.find((s) => s.doctorId === doctorId && s.date === date);
  return shift?.slotDurationMinutes ?? null;
}

/**
 * Lấy sessionLabel gộp của bác sĩ trong ngày.
 * Ví dụ: ["Buổi sáng", "Buổi chiều"] → "Buổi sáng + Buổi chiều"
 * @param {string} doctorId
 * @param {string} date
 */
export function getSessionLabelByDoctorDate(doctorId, date) {
  const shifts = getShiftsByDoctorDate(doctorId, date);
  if (shifts.length === 0) return null;
  return shifts.map((s) => s.sessionLabel).join(" + ");
}
