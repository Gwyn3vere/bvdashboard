import { useState, useCallback } from "react";

export default function useModalManager(initialState) {
  const [modal, setModal] = useState(initialState);

  const open = useCallback((key) => {
    setModal((prev) => ({ ...prev, [key]: true }));
  }, []);

  const close = useCallback((key) => {
    setModal((prev) => ({ ...prev, [key]: false }));
  }, []);

  const toggle = useCallback((key) => {
    setModal((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return {
    modal,
    open,
    close,
    toggle,
  };
}
