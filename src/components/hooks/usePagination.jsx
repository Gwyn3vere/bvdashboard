import { useState, useEffect } from "react";

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pagedData = data.slice(startIndex, endIndex);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Side Effect
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // Điều hướng trang
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    currentPage,
    totalPages,
    pagedData,
    pages,
    setCurrentPage,
    nextPage,
    prevPage
  };
}

export default usePagination;
