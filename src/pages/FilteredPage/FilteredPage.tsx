import { useSearchParams } from "react-router-dom";
import { useGetFilteredMoviesQuery } from "@/features/movies/api/moviesApi";
import MovieCard from "@/common/components/MovieCard";
import { useEffect, useState } from "react";
import s from "./FilteredPage.module.css";
import { MovieCardSkeleton } from "@/common/components/MovieCardSkeleton";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
export default function FilteredPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "popularity.desc";
  const voteGte = Number(searchParams.get("vote_gte")) || 0;
  const voteLte = Number(searchParams.get("vote_lte")) || 10;
  const genres = searchParams.get("genres") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [localFrom, setLocalFrom] = useState(voteGte);
  const [localTo, setLocalTo] = useState(voteLte);

  const { data, isLoading } = useGetFilteredMoviesQuery({
    sort_by: sortBy,
    vote_average_gte: voteGte,
    vote_average_lte: voteLte,
    with_genres: genres,
    page: page,
  });
  const toggleGenre = (genreId: number) => {
    const genreString = String(genreId);
    let newGenres: string[];

    if (genres) {
      newGenres = genres.split(",");
    } else {
      newGenres = [];
    }

    if (newGenres.includes(genreString)) {
      newGenres = newGenres.filter((g) => g !== genreString);
    } else {
      newGenres.push(genreString);
    }

    const newParams = new URLSearchParams(searchParams);
    if (newGenres.length > 0) {
      newParams.set("genres", newGenres.join(","));
    } else {
      newParams.delete("genres");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };
  const resetFilters = () => {
    setSearchParams({});

    setLocalFrom(0);
    setLocalTo(10);
  };
  useEffect(() => {
    setLocalFrom(voteGte);
    setLocalTo(voteLte);
  }, [voteGte, voteLte]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (localFrom !== voteGte) {
        newParams.set("vote_gte", String(localFrom));
      }
      if (localTo !== voteLte) {
        newParams.set("vote_lte", String(localTo));
      }

      newParams.set("page", "1");

      setSearchParams(newParams);
    }, 200);

    return () => clearTimeout(timer);
  }, [localFrom, localTo]);

  return (
    <div className={s.container}>
      {/* ЛЕВАЯ КОЛОНКА — ФИЛЬТРЫ */}
      <div className={s.sidebar}>
        <h3>Filters</h3>

        {/* Сортировка */}
        <div>
          <label>Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("sort", e.target.value);
              newParams.set("page", "1");
              setSearchParams(newParams);
            }}
          >
            <option value="popularity.desc">Popularity (Desc)</option>
            <option value="popularity.asc">Popularity (Asc)</option>
            <option value="vote_average.desc">Rating (Desc)</option>
            <option value="vote_average.asc">Rating (Asc)</option>
            <option value="primary_release_date.desc">
              Release Date (Desc)
            </option>
            <option value="primary_release_date.asc">Release Date (Asc)</option>
            <option value="original_title.asc">Title (A-Z)</option>
            <option value="original_title.desc">Title (Z-A)</option>
          </select>
        </div>

        {/* Рейтинг */}
        <div style={{ marginTop: "20px" }}>
          <label>Rating</label>
          <div>
            <input
              type="number"
              placeholder="От"
              min={0}
              max={10}
              step={0.1}
              value={localFrom}
              onChange={(e) => setLocalFrom(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="До"
              min={0}
              max={10}
              step={0.1}
              value={localTo}
              onChange={(e) => setLocalTo(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Жанры */}
        <div style={{ marginTop: "20px" }}>
          <label>Genres</label>
          <div>
            <div className={s.genresContainer}>
              {GENRES.map((genre) => {
                const isActive = genres.split(",").includes(String(genre.id));
                return (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`${s.genreBtn} ${isActive ? s.genreBtnActive : ""}`}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Сброс */}
        <button onClick={resetFilters} style={{ marginTop: "20px" }}>
          Reset Filters
        </button>
      </div>
      {/* //результаты */}
      <div className={s.results}>
        <h2>Filtered Movies</h2>

        {/* Карточки */}
        <div className={s.grid}>
          {isLoading ? (
            Array(20)
              .fill(null)
              .map((_, i) => <MovieCardSkeleton key={i} />)
          ) : data?.results.length === 0 ? (
            <p>No movies found with these filters.</p>
          ) : (
            data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>

        {/* Пагинация */}
        {data && data.total_pages > 0 && (
          <div className={s.pagination}>
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("page", String(page - 1));
                setSearchParams(newParams);
              }}
              disabled={page === 1}
            >
              Назад
            </button>
            <span style={{ margin: "0 10px" }}>
              Страница {page} из {data.total_pages}
            </span>
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("page", String(page + 1));
                setSearchParams(newParams);
              }}
              disabled={page === data.total_pages}
            >
              Вперед
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
