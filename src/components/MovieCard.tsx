import React from "react";
import { Movie } from "../types/movie";
import styles from "./MoviCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
        alt={movie.Title}
        className={styles.info}
      />
    </div>
  );
};

export default MovieCard;
