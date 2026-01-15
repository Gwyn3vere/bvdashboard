import { useState, useEffect } from "react";

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

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    setFieldValue,
    resetForm
  };
}
