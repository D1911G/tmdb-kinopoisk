import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAppErrorAC } from "./app-slice";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    })(args, api, extraOptions);

    // Обработка ошибок
    if (result.error) {
      if (result.error.status === "FETCH_ERROR") {
        api.dispatch(
          setAppErrorAC("Network error. Check your internet connection."),
        );
      } else if (result.error.status === 401) {
        api.dispatch(setAppErrorAC("Invalid token. Check your API key."));
      } else if (result.error.status === 404) {
        api.dispatch(setAppErrorAC("Not found. Please check the endpoint."));
      } else {
        api.dispatch(setAppErrorAC(`Error: ${result.error.status}`));
      }
    }

    return result;
  },
  tagTypes: ["Movie", "Favorite"],
  endpoints: () => ({}),
});
