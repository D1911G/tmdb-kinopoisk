import { createSlice } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

type AppState = {
  themeMode: ThemeMode;
};

const initialState: AppState = {
  themeMode: (localStorage.getItem("themeMode") as ThemeMode) || "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeThemeModeAC: (state, action) => {
      state.themeMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
});

export const { changeThemeModeAC } = appSlice.actions;
export const { selectThemeMode } = appSlice.selectors;
export const appReducer = appSlice.reducer;
