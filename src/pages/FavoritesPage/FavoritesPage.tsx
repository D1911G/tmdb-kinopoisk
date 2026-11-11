import { useAppSelector } from "@/common/hooks";
import { selectFavorites } from "@/features/favorites/model/favorites-slice";
import MovieCard from "@/common/components/MovieCard";
import s from "./FavoritesPage.module.css";
export default function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Favorites</h1>
      {favorites.length === 0 ? (
        <p className={s.emptyMessage}>No favorite movies yet.</p>
      ) : (
        <div className={s.grid}>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie as any} />
          ))}
        </div>
      )}
    </div>
  );
}
