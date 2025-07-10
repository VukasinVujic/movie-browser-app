import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../api/movies";

interface MovieDetails {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p> Loading... </p>;
  if (error) return <p style={{ color: "red" }}> {error} </p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>
        {movie.Title} ({movie.Year})
      </h2>
      <img src={movie.Poster} alt={movie.Title} style={{ width: 200 }} />
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director}
      </p>
      <p>
        <strong>Actors:</strong> {movie.Actors}
      </p>
      <p>
        <strong>IMDb Rating:</strong> {movie.imdbRating}
      </p>
      <p>
        <strong>Plot:</strong> {movie.Plot}
      </p>
    </div>
  );
};

export default MovieDetail;
