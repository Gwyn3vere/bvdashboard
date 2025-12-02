export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "Email không được để trống";
  if (!password) errors.password = "Password không được để trống";
  return errors;
};
