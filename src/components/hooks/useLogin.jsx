import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.index";
import { logoutService } from "../../services/auth";
import { validateLogin } from "../../utils/validation";

export default function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return null;
    }

    setLoading(true);
    const result = await loginService(form);
    setLoading(false);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    setErrors({});
    navigate("/bang-dieu-khien");
    return result.user;
  };

  const handleLogout = async () => {
    try {
      await logoutService();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Đăng xuất thất bại");
    }
  };

  return { form, errors, loading, handleChange, handleSubmit, handleLogout };
}
