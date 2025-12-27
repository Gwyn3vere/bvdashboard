export const formatDateVN = (isoDate) => {
  if (!isoDate) return "—";

  const [yyyy, mm, dd] = isoDate.split("-");
  return `${dd}-${mm}-${yyyy}`;
};

export const formatPercent = (value, { decimals = 0, rounding = "round" } = {}) => {
  if (value == null || Number.isNaN(value)) return "0%";

  const factor = 10 ** decimals;

  const rounded =
    rounding === "ceil"
      ? Math.ceil(value * factor) / factor
      : rounding === "floor"
      ? Math.floor(value * factor) / factor
      : Math.round(value * factor) / factor;

  return rounded;
};

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
