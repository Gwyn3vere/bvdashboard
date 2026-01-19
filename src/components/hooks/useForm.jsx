import { useState, useEffect, useCallback } from "react";

export default function useForm({ initialValues = {}, editValues = null, transformEditValues }) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (editValues) {
      const nextValues = transformEditValues ? transformEditValues(editValues) : editValues;

      setValues({
        ...initialValues,
        ...nextValues
      });
    } else {
      setValues(initialValues);
    }
  }, [editValues, initialValues, transformEditValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    setValues,
    setFieldValue,
    resetForm
  };
}
