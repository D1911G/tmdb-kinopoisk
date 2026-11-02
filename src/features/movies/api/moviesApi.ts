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
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = moviesApi;
