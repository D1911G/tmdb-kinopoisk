import { baseApi } from "@/app/baseApi";
import type { MoviesResponse } from "@/common/types";

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, number>({
      query: (page = 1) => ({
        url: "/movie/popular",
        params: { page },
      }),
      providesTags: ["Movie"],
    }),
    getTopRatedMovies: builder.query<MoviesResponse, number>({
      query: (page = 1) => ({
        url: "/movie/top_rated",
        params: { page },
      }),
      providesTags: ["Movie"],
    }),
    getUpcomingMovies: builder.query<MoviesResponse, number>({
      query: (page = 1) => ({
        url: "/movie/upcoming",
        params: { page },
      }),
      providesTags: ["Movie"],
    }),
    getNowPlayingMovies: builder.query<MoviesResponse, number>({
      query: (page = 1) => ({
        url: "/movie/now_playing",
        params: { page },
      }),
      providesTags: ["Movie"],
    }),
    searchMovies: builder.query<
      MoviesResponse,
      { query: string; page: number }
    >({
      query: ({ query, page = 1 }) => ({
        url: "/search/movie",
        params: { query, page },
      }),
      providesTags: ["Movie"],
    }),
    getMovieDetails: builder.query<any, string>({
      query: (id) => `/movie/${id}`,
    }),
    getMovieCredits: builder.query<any, string>({
      query: (id) => `/movie/${id}/credits`,
    }),
    getSimilarMovies: builder.query<any, string>({
      query: (id) => `/movie/${id}/similar`,
    }),
    getFilteredMovies: builder.query<
      MoviesResponse,
      {
        sort_by: string;
        vote_average_gte: number;
        vote_average_lte: number;
        with_genres: string;
        page: number;
      }
    >({
      query: (params) => ({
        url: "/discover/movie",
        params: {
          sort_by: params.sort_by,
          "vote_average.gte": params.vote_average_gte,
          "vote_average.lte": params.vote_average_lte,
          with_genres: params.with_genres,
          page: params.page,
        },
      }),
      providesTags: ["Movie"],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetFilteredMoviesQuery,
} = moviesApi;
