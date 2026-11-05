import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { appReducer, appSlice } from "./app-slice";
import {
  favoriteReducer,
  favoriteSlice,
} from "@/features/favorites/model/favorites-slice";

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [favoriteSlice.name]: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
