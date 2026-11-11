import { Link } from "react-router-dom";
import type { Movie } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addFavoriteAC,
  removeFavoriteAC,
  selectFavorites,
  type FavoriteMovie,
} from "@/features/favorites/model/favorites-slice";
import s from "./MovieCard.module.css";
type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const posterUrl = movie.poster_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w300${movie.poster_path}`
    : "https://placehold.co/300x450";

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const isFavorite = favorites.some(
    (fav: FavoriteMovie) => fav.id === movie.id,
  );
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
    <Link to={`/movie/${movie.id}`} className={s.card}>
      <img src={posterUrl} alt={movie.title} className={s.poster} />
      <div className={s.info}>
        <h3 className={s.title}>{movie.title}</h3>
        <span className={s.rating}>{movie.vote_average.toFixed(1)}</span>
        <button onClick={toggleFavorite} className={s.favoriteBtn}>
          {isFavorite ? "💖" : "🤍"}
        </button>
      </div>
    </Link>
  );
}
