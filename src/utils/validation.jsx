export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "Email không được để trống";
  if (!password) errors.password = "Password không được để trống";
  return errors;
};

export const validateDoctor = (values, step) => {
  const errors = {};

  if (step === 1) {
    if (!values.name?.trim()) errors.name = "Vui lòng nhập họ tên";
    if (!values.title?.trim()) errors.title = "Vui lòng chọn Nghề nghiệp / Học hàm / Học vị";
  }

  if (step === 2) {
    if (!values.department?.trim()) errors.department = "Vui lòng chọn khoa";
    if (!values.position?.trim()) errors.position = "Vui lòng chọn chức vụ";
    if (!values.tags || values.tags.length === 0) errors.tags = "Vui lòng nhập tags chuyên môn";
    if (!values.languages || values.languages.length === 0)
      errors.languages = "Vui lòng nhập tít nhất 1 ngôn ngữ làm việc";
  }

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
