import { useState, useEffect, useCallback, useRef } from "react";

export default function useForm({ initialValues = {}, editValues = null, transformEditValues }) {
  const [values, setValues] = useState(() => ({ ...initialValues }));
  const prevEditValuesRef = useRef(null);

  // Handle edit mode
  useEffect(() => {
    if (!editValues) return;

    // tránh set lại khi cùng 1 editValues
    if (prevEditValuesRef.current === editValues) return;

    const nextValues = transformEditValues ? transformEditValues(editValues) : editValues;

    setValues({
      ...initialValues,
      ...nextValues
    });

    prevEditValuesRef.current = editValues;
  }, [editValues, initialValues, transformEditValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    prevEditValuesRef.current = null;
    setValues({ ...initialValues });
  }, [initialValues]);

  return {
    values,
    setValues,
    setFieldValue,
    resetForm
  };
}
