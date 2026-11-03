import MovieCard from "@/common/components/MovieCard";
import { Path } from "@/common/Path";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const MainPage = () => {
  const {
    data: popularData,
    isLoading: isPopularLoading,
    error: popularError,
  } = useGetPopularMoviesQuery(1);
  const {
    data: topRatedData,
    isLoading: isTopRatedLoading,
    error: topRatedError,
  } = useGetTopRatedMoviesQuery(1);
  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useGetUpcomingMoviesQuery(1);
  const {
    data: nowPlayingData,
    isLoading: isNowPlayingLoading,
    error: nowPlayingError,
  } = useGetNowPlayingMoviesQuery(1);

  const isLoading =
    isPopularLoading ||
    isTopRatedLoading ||
    isUpcomingLoading ||
    isNowPlayingLoading;
  const hasError =
    popularError || topRatedError || upcomingError || nowPlayingError;

  const randomMovie = useMemo(() => {
    if (!popularData?.results.length) return undefined;
    return popularData.results[
      Math.floor(Math.random() * popularData.results.length)
    ];
  }, [popularData]);
  const backdropUrl = randomMovie?.backdrop_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/original${randomMovie.backdrop_path}`
    : "";

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`${Path.Search}?query=${searchQuery}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error</div>;

  return (
    <div>
      <div style={{ backgroundImage: `url(${backdropUrl})` }}>
        <h1>WELCOME!</h1>
        <h3>Browse highlighted titles from TMDB</h3>
        <div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie"
          />
          <button disabled={!searchQuery.trim()} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div>
        <div>
          <h4>Popular movies</h4>
          <Link to={Path.Category}>View more</Link>
        </div>
        {popularData?.results.slice(0, 6).map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
      <div>
        <div>
          <h4>Top rated movies</h4>
          <Link to={Path.Category}>View more</Link>
        </div>
        {topRatedData?.results.slice(0, 6).map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
      <div>
        <div>
          <h4>Upcoming movies</h4>
          <Link to={Path.Category}>View more</Link>
        </div>
        {upcomingData?.results.slice(0, 6).map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
      <div>
        <div>
          <h4>Now playing movies</h4>
          <Link to={Path.Category}>View more</Link>
        </div>
        {nowPlayingData?.results.slice(0, 6).map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
