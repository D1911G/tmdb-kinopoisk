import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMoviesQuery } from "@/features/movies/api/moviesApi";
import MovieCard from "@/common/components/MovieCard";
import { useAppDispatch } from "@/common/hooks";
import { baseApi } from "@/app/baseApi";
import { MovieCardSkeleton } from "@/common/components/MovieCardSkeleton";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const [inputValue, setInputValue] = useState(query);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const { data, isLoading, error } = useSearchMoviesQuery(
    { query, page },
    { skip: !query },
  );
  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchParams({ query: inputValue.trim(), page: "1" });
    }
  };

  const handleReset = () => {
    setInputValue("");
    setSearchParams({});
    dispatch(baseApi.util.resetApiState());
  };

  return (
    <div>
      <div>
        <h2>Search Results</h2>
      </div>
      <div>
        <input
          type="search"
          placeholder="Search for a movie"
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
            if (value === "") {
              handleReset();
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        ></input>
        <button onClick={handleSearch} disabled={!inputValue.trim()}>
          Search
        </button>
      </div>
      <div>
        {!query && <p>Enter a movie title to start searching.</p>}

        {isLoading && (
          <div>
            {Array(20)
              .fill(null)
              .map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
          </div>
        )}

        {error && <p>Error occurred</p>}

        {!isLoading && query && data?.results.length === 0 && (
          <p>No matches found for "{query}"</p>
        )}

        {!isLoading && data && data.results.length > 0 && (
          <div>
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      {!isLoading && data && data.results.length > 0 && (
        <div>
          <button
            onClick={() => setSearchParams({ query, page: String(page - 1) })}
            disabled={page === 1}
          >
            Назад
          </button>
          <span>
            Страница {page} из {data.total_pages || 1}
          </span>
          <button
            onClick={() => setSearchParams({ query, page: String(page + 1) })}
            disabled={page === data.total_pages}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}
