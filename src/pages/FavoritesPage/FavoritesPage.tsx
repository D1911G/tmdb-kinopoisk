import { useAppSelector } from "@/common/hooks";
import { selectFavorites } from "@/features/favorites/model/favorites-slice";
import MovieCard from "@/common/components/MovieCard";

export default function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie as any} />
          ))}
        </div>
      )}
    </div>
  );
}
