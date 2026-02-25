import { useState } from "react";
import { useForm, usePagination, useValidation } from "./index";

export default function useMultiStep({ totalSteps, initialValues, editValues, validate }) {
  // Tái sử dụng các hook có sẵn
  const { values, setFieldValue, resetForm } = useForm({
    initialValues,
    editValues,
  });

  const { validate: runValidate, validateField, setAllTouched, getFieldError } = useValidation(validate);

  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = totalSteps;
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalSteps;

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalSteps));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  function handleNext() {
    const isValid = runValidate(values, currentPage);
    if (isValid) {
      nextPage();
    } else {
      setAllTouched(values);
      setToast({ type: "INFO", message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
    }
  }

  function handleSubmit(e, onSuccess) {
    e.preventDefault();
    const isValid = runValidate(values, currentPage);
    if (!isValid) {
      setAllTouched(values);
      setToast({ type: "INFO", message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
      return;
    }
    onSuccess?.(values);
  }

  function reset() {
    resetForm();
  }

  return {
    // Form
    values,
    setFieldValue,
    reset,
    // Validation
    validateField,
    getFieldError,
    // Pagination/Step
    currentPage,
    totalPages,
    totalSteps,
    isFirst,
    isLast,
    handleNext,
    prevPage,
    // Submit
    handleSubmit,
    // Toast
    toast,
    setToast,
  };
}
