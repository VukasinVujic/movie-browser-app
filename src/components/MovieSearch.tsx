import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, clearMovies } from "../features/movies/moviesSlice";
import type { AppDispatch, RootState } from "../store";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  const clearSearch = () => {
    setQuery("");
    dispatch(clearMovies());
  };

  return (
    <div>
      <h1>Movi Browser</h1>
      <input
        type="text"
        placeholder="Search movies.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error...</p>}

      {!loading && !error && movies.length === 0 && (
        <p> No movies found. try another search</p>
      )}
      <ul>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
