import { useSearchParams } from "react-router-dom";
import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} from "@/features/movies/api/moviesApi";
import MovieCard from "@/common/components/MovieCard";
import { MovieCardSkeleton } from "@/common/components/MovieCardSkeleton";
import s from "./CategoryPage.module.css";
export default function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "popular";
  const page = Number(searchParams.get("page")) || 1;

  const { data: popularData, isLoading: isPopularLoading } =
    useGetPopularMoviesQuery(page);
  const { data: topRatedData, isLoading: isTopRatedLoading } =
    useGetTopRatedMoviesQuery(page);
  const { data: upcomingData, isLoading: isUpcomingLoading } =
    useGetUpcomingMoviesQuery(page);
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } =
    useGetNowPlayingMoviesQuery(page);

  const categoryTitles = {
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
    upcoming: "Upcoming Movies",
    now_playing: "Now Playing Movies",
  };

  const dataMap = {
    popular: { data: popularData, isLoading: isPopularLoading },
    top_rated: { data: topRatedData, isLoading: isTopRatedLoading },
    upcoming: { data: upcomingData, isLoading: isUpcomingLoading },
    now_playing: { data: nowPlayingData, isLoading: isNowPlayingLoading },
  };

  const current = dataMap[category as keyof typeof dataMap] || dataMap.popular;

  // if (current.isLoading) return <div>Loading...</div>;

  const changeCategory = (newCategory: string) => {
    setSearchParams((prev) => ({ ...prev, category: newCategory, page: "1" }));
  };
  const changePage = (newPage: number) => {
    setSearchParams((prev) => ({ ...prev, page: String(newPage) }));
  };

  return (
    <div className={s.container}>
      <div className={s.buttons}>
        <button
          onClick={() => changeCategory("popular")}
          disabled={category === "popular"}
        >
          Popular movies
        </button>
        <button
          onClick={() => changeCategory("top_rated")}
          disabled={category === "top_rated"}
        >
          Top rated movies
        </button>
        <button
          onClick={() => changeCategory("upcoming")}
          disabled={category === "upcoming"}
        >
          Upcoming movies
        </button>
        <button
          onClick={() => changeCategory("now_playing")}
          disabled={category === "now_playing"}
        >
          Now playing movies
        </button>
      </div>
      <div>
        <h1 className={s.title}>
          {categoryTitles[category as keyof typeof categoryTitles] ||
            categoryTitles.popular}
        </h1>
        {current.isLoading ? (
          <div>
            {Array(20)
              .fill(null)
              .map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <div className={s.grid}>
            {current.data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <div className={s.pagination}>
        <button onClick={() => changePage(page - 1)} disabled={page === 1}>
          Назад
        </button>
        <span>
          Страница {page} из {current.data?.total_pages || 1}
        </span>
        <button
          onClick={() => changePage(page + 1)}
          disabled={page === current.data?.total_pages}
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
