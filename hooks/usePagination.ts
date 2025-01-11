"use client";

import { useState, useMemo } from "react";

export const usePagination = <T>(data: T[], initialItemPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const totalPage = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  return {
    currentPageData,
    paginate,
    currentPage,
    totalPage,
    setCurrentPage,
    setItemsPerPage,
  };
};
