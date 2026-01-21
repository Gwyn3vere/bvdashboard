export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "Email không được để trống";
  if (!password) errors.password = "Password không được để trống";
  return errors;
};

export const validateDoctor = (doctor) => {
  const errors = {};

  // Trang 1 - MainForm
  if (!doctor.name?.trim()) errors.name = "Tên bác sĩ không được để trống";
  if (!doctor.title) errors.title = "Chức danh không được để trống";
  if (!doctor.department) errors.department = "Khoa không được để trống";
  if (!doctor.specialty) errors.specialty = "Chuyên khoa không được để trống";
  if (!doctor.tags || doctor.tags.length === 0) errors.tags = "Vui lòng chọn ít nhất 1 tag";
  if (!doctor.experienceYears || doctor.experienceYears < 0) errors.experienceYears = "Kinh nghiệm không hợp lệ";
  if (!doctor.facility?.trim()) errors.facility = "Cơ sở công tác không được để trống";
  if (!doctor.languages || doctor.languages.length === 0) errors.languages = "Vui lòng chọn ít nhất 1 ngôn ngữ";

  return errors;
};

export const validateStaff = (staff) => {
  const errors = {};

  if (!staff.name?.trim()) errors.name = "Tên nhân viên không được để trống";
  if (!staff.email) errors.email = "Email không được để trống";
  if (!staff.password) errors.password = "Mật khẩu không được để trống";
  if (!staff.position) errors.position = "Chức vụ không được để trống";
  if (!staff.role) errors.role = "Vai trò không được để trống";

  return errors;
};
