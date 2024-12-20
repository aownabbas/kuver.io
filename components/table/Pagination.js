import React, { useState } from 'react';

function usePagination(data, totalitems, itemsPerPage) {
  // const set = new Set([data]);
  // console.log({ data }.data.gisstsItems, 'set data');

  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(
    // data?.length
    totalitems / itemsPerPage);
    // console.log(data, totalitems, itemsPerPage, 'set data');

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    // console.log(data?.slice(begin, end), "slice");
    // return data?.slice(begin, end);
    return data?.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
