import './App.scss';
import {useEffect, useRef, useState} from "react";

import {Card} from "./components/Card";
import {Pagination} from "./components/Pagination";
import {Preloader} from "./components/Preloader";
import {ErrorMessage} from "./components/ErrorMessage";
import {getData} from "./helpers";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [error, setError] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  })

  const searchMovie = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      setLoading(true);
      const data = await getData(ref.current?.value);
      console.log(data);
      if(data.Response === 'False') {
        setLoading(false);
        setError(true);
        return
      }
      setMovies(data.Search);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovie = movies.slice(firstMovieIndex, lastMovieIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="App">
      <section className='container'>

        <header>
          <div>
            <h1>Movie catalog</h1>
            <form onSubmit={(e) => searchMovie(e)}>
              <input
                  type='text'
                  name="search"
                  placeholder='enter movie name'
                  ref={ref}
                  autoComplete="off"
              />
            </form>
          </div>
          <div>
            <img src='user-solid.svg' alt='user'/>
            <span>Evgeniy Lysenko</span>
            <img src='angle.svg' alt='angle'/>
          </div>
        </header>

        <section className='content'>
          <div className='search-result'>
          {movies.length && !error ? <h2>You searching for: <i>{ref.current?.value}</i>, {movies.length} result found</h2> : null}
          </div>
          <div className='cards'>
            {!error && !loading && currentMovie && currentMovie.map(movie => (
                <Card key={movie.imdbID} movie={movie}/>))}
          </div>

          {error ? <ErrorMessage /> : null}

          {loading ? <Preloader /> : null}

          {!error && <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={movies.length}
              paginate={paginate}
          />}
        </section>

      </section>
    </div>
  );
}

export default App;


