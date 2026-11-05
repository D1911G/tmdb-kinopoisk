import { createSlice } from "@reduxjs/toolkit";

type FavoriteMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

const loadFavorites = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  favorites: loadFavorites(),
};

export const favoriteSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    addFavoriteAC: (state, action) => {
      const movie = action.payload;
      const isExist = state.favorites.some((m) => m.id === movie.id);
      if (!isExist) {
        state.favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavoriteAC: (state, action) => {
      const id = action.payload;
      state.favorites = state.favorites.filter((m) => m.id !== id);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  selectors: {
    selectFavorites: (state) => state.favorites,
  },
});
export const { addFavoriteAC, removeFavoriteAC } = favoriteSlice.actions;
export const { selectFavorites } = favoriteSlice.selectors;
export const favoriteReducer = favoriteSlice.reducer;
