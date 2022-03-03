import React from "react";

export function Pagination({
  moviesPerPage,
  totalMovies,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) {
  const pageCounts = Math.ceil(+totalMovies / moviesPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= pageCounts; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        {currentPage !== 1 ? (
          <button onClick={prevPage}>
            <img src="angle-left-solid.svg" alt="angle-left" />
          </button>
        ) : null}

        {pageNumbers.map((number) => (
          <li
            className="page-item q"
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}

        {currentPage !== pageCounts ? (
          <button onClick={nextPage}>
            <img src="angle-right-solid.svg" alt="angle-right" />
          </button>
        ) : null}
      </ul>
    </>
  );
}
