import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

type AppState = {
  themeMode: ThemeMode;
  isLoading: boolean;
  error: string | null;
};

const initialState: AppState = {
  themeMode: (localStorage.getItem("themeMode") as ThemeMode) || "light",
  isLoading: false,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeThemeModeAC: (state, action) => {
      state.themeMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    setAppErrorAC: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectIsLoading: (state) => state.isLoading,
    selectAppError: (state) => state.error,
  },
});

export const { changeThemeModeAC, setAppErrorAC } = appSlice.actions;
export const { selectThemeMode, selectIsLoading, selectAppError } =
  appSlice.selectors;
export const appReducer = appSlice.reducer;
