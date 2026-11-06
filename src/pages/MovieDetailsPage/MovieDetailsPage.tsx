import MovieCard from "@/common/components/MovieCard";
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from "@/features/movies/api/moviesApi";

import { useNavigate, useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading } = useGetMovieDetailsQuery(id!);
  const { data: credits } = useGetMovieCreditsQuery(id!);
  const { data: similar } = useGetSimilarMoviesQuery(id!);

  if (isLoading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  const cast = credits?.cast.slice(0, 6) || [];
  const similarMovies = similar?.results.slice(0, 6) || [];

  const posterUrl = movie.poster_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w500${movie.poster_path}`
    : "https://placehold.co/500x750";

  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button>
      <img src={posterUrl} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>Год: {movie.release_date?.slice(0, 4)}</p>
      <p>Рейтинг: {movie.vote_average}</p>
      <p>Жанры: {movie.genres?.map((g) => g.name).join(", ")}</p>
      <p>Продолжительность: {movie.runtime} мин.</p>
      <p>{movie.overview}</p>
      <h2>Cast</h2>
      <div>
        {cast.map((actor) => {
          const photo = actor.profile_path
            ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w200${actor.profile_path}`
            : "https://placehold.co/200x300";

          return (
            <div key={actor.id}>
              <img src={photo} alt={actor.name} />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </div>
          );
        })}
      </div>
      <h2>Similar Movies</h2>
      <div>
        {similarMovies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
