function useSearch(data, keyword, getText, defaultLimit = 9) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return data.slice(0, defaultLimit);
  }

  return data.filter((item) => {
    const text = getText(item).toLowerCase();

    return text.includes(normalizedKeyword);
  });
}

export default useSearch;
