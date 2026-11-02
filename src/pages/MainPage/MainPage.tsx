import { useGetPopularMoviesQuery } from "@/features/movies/api/moviesApi";

export const MainPage = () => {
  const { data, isLoading, error } = useGetPopularMoviesQuery(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {data?.results.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default MainPage;
