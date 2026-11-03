import { Link } from "react-router-dom";
import type { Movie } from "../types";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const posterUrl = movie.poster_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w300${movie.poster_path}`
    : "https://placehold.co/300x450";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div>
        <img src={posterUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <span>{movie.vote_average}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Add to favorites:", movie.id);
          }}
        >
          ❤️
        </button>
      </div>
    </Link>
  );
}
