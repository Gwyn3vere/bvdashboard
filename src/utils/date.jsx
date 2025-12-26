export const formatDateVN = (isoDate) => {
  if (!isoDate) return "—";

  const [yyyy, mm, dd] = isoDate.split("-");
  return `${dd}-${mm}-${yyyy}`;
};
