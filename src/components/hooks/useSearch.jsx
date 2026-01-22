import { removeVietnameseTones } from "../../utils/normalization";

function useSearch(data, keyword, getText, defaultLimit = Infinity) {
  const normalizedKeyword = removeVietnameseTones(keyword).trim().toLowerCase();

  if (!normalizedKeyword) {
    return data.slice(0, defaultLimit);
  }

  return data.filter((item) => {
    const text = removeVietnameseTones(getText(item)).toLowerCase();

    return text.includes(normalizedKeyword);
  });
}

export default useSearch;
