import React from 'react';

export function Card({movie}) {
   return (
       <div key={movie.imdbID} className='card'>
          <div className='poster'>
             {movie.Poster === "N/A" ? <img src='placeholder.png' alt='poster'/> : <img src={movie.Poster} alt='poster'/> }
          </div>
          <span className='title'>{movie.Title}</span>
          <div className='desc'>
             <span>Year: {movie.Year}</span>
             <span>imdbID: {movie.imdbID}</span>
             <span>Type: {movie.Type}</span>
          </div>
       </div>
   );
}

