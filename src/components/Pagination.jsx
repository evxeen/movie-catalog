import React from 'react';

export function Pagination({moviesPerPage, totalMovies, paginate}) {
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage) ; i++) {
      pageNumbers.push(i)
   }

   return (
          <ul className="pagination">
             {pageNumbers.map((number) => (
                 <li className='page-item' key={number} onClick={() => paginate(number)}>
                        {number}
                 </li>
             ))}
          </ul>
   );
}

