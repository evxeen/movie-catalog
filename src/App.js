import "./App.scss";
import { useEffect, useRef, useState } from "react";

import { Card } from "./components/Card";
import { Pagination } from "./components/Pagination";
import { Preloader } from "./components/Preloader";
import { ErrorMessage } from "./components/ErrorMessage";
import { getData } from "./helpers";

function App() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [error, setError] = useState("");
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  const updateData = async (page = 1) => {
    setMovies(await getData(ref.current?.value, page));
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = await getData(ref.current?.value, currentPage);
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    updateData(pageNumber);
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    updateData(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    updateData(currentPage - 1);
  };

  return (
    <div className="App">
      <section className="container">
        <header>
          <div>
            <h1>Movie catalog</h1>
            <form onSubmit={(e) => searchMovie(e)}>
              <input
                type="text"
                name="search"
                placeholder="enter movie name"
                ref={ref}
                autoComplete="off"
              />
            </form>
          </div>
          <div>
            <img src="user-solid.svg" alt="user" />
            <span>Alexandr Borisenko</span>
            <img src="angle.svg" alt="angle" />
          </div>
        </header>

        <section className="content">
          <div className="search-result">
            {movies.totalResults && !error ? (
              <h2>
                You searching for: <i>{ref.current?.value}</i>,{" "}
                {movies.totalResults} result found
              </h2>
            ) : null}
          </div>
          <div className="cards">
            {!error &&
              !loading &&
              movies.Search &&
              movies.Search.map((movie) => (
                <Card key={movie.imdbID} movie={movie} />
              ))}
          </div>

          {error ? <ErrorMessage errorMessage={error} /> : null}

          {loading ? <Preloader /> : null}

          {!error && movies.Search && (
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={movies.totalResults}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
            />
          )}
        </section>
      </section>
    </div>
  );
}

export default App;
