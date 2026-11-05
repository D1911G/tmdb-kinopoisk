import { Link } from "react-router-dom";
import type { Movie } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addFavoriteAC,
  removeFavoriteAC,
  selectFavorites,
} from "@/features/favorites/model/favorites-slice";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const posterUrl = movie.poster_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w300${movie.poster_path}`
    : "https://placehold.co/300x450";

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavoriteAC(movie.id));
    } else {
      dispatch(
        addFavoriteAC({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        }),
      );
    }
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <div>
        <img src={posterUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <span>{movie.vote_average}</span>
        <button onClick={toggleFavorite}>{isFavorite ? "💖" : "🤍"}</button>
      </div>
    </Link>
  );
}
