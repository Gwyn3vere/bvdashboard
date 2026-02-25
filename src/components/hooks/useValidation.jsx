import { useState, useCallback } from "react";

export default function useValidation(validateFn) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback(
    (values, ...args) => {
      const validationErrors = validateFn(values, ...args);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    },
    [validateFn],
  );

  const validateField = useCallback(
    (name, values, ...args) => {
      const validationErrors = validateFn(values, ...args);
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name],
      }));
    },
    [validateFn],
  );

  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched((prev) => ({
      ...prev,
      [name]: isTouched,
    }));
  }, []);

  const setAllTouched = useCallback((values) => {
    const allTouched = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
  }, []);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const getFieldError = useCallback(
    (name) => {
      return touched[name] && errors[name] ? errors[name] : null;
    },
    [errors, touched],
  );

  return {
    errors,
    touched,
    validate,
    validateField,
    setFieldTouched,
    setAllTouched,
    resetValidation,
    getFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
}
