import MovieCard from "@/common/components/MovieCard";
import { useGetPopularMoviesQuery } from "@/features/movies/api/moviesApi";
import React from "react";

export default function CategoryPage() {
  const { data, isLoading, error } = useGetPopularMoviesQuery(1);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <div>
        <button>Popular movies</button>
        <button>Top rated movies</button>
        <button>Upcoming movies</button>
        <button>Now playing movies</button>
      </div>
      <div>
        {data?.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
      <div>PAGINATION</div>
    </div>
  );
}
