"use client";

import { useState } from "react";

export const usePagination = <T>(data: T[], itemPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const totalPage = Math.ceil(data.length / itemPerPage);

  return {
    currentPageData,
    paginate,
    currentPage,
    totalPage,
    setCurrentPage,
  };
};
