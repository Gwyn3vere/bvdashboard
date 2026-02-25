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
  // if (!doctor.specialty) errors.specialty = "Chuyên khoa không được để trống";
  if (!doctor.tags || doctor.tags.length === 0) errors.tags = "Vui lòng chọn ít nhất 1 tag";
  if (!doctor.experienceYears || doctor.experienceYears < 0) errors.experienceYears = "Kinh nghiệm không hợp lệ";
  if (!doctor.facility?.trim()) errors.facility = "Cơ sở công tác không được để trống";
  if (!doctor.languages || doctor.languages.length === 0) errors.languages = "Vui lòng chọn ít nhất 1 ngôn ngữ";

  return errors;
};

export function validateStaff(values, step) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (step === 1) {
    if (!values.name?.trim()) errors.name = "Vui lòng nhập họ tên";
  }

  if (step === 2) {
    if (!values.email?.trim()) {
      errors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email không đúng định dạng";
    }
    if (!values.password?.trim()) errors.password = "Vui lòng nhập mật khẩu";
  }

  if (step === 3) {
    if (!values.position) errors.position = "Vui lòng chọn chức vụ";
    if (!values.role?.trim()) errors.role = "Vui lòng chọn vai trò";
    if (!values.department?.trim()) errors.department = "Vui lòng chọn phòng ban";
  }

  return errors;
}

export const validateExpertise = (expertise) => {
  const errors = {};

  if (!expertise.id?.trim()) errors.id = "Mã ID không được để trống";
  if (!expertise.value) errors.value = "Vlue không được để trống";
  if (!expertise.name) errors.name = "Tên khối không được để trống";
  return errors;
};
