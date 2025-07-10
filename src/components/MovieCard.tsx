import React from "react";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import styles from "./MoviCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className={styles.card}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
        alt={movie.Title}
        className={styles.info}
      />
      <div className={styles.info}>
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
