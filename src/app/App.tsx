import { Route, Routes } from "react-router-dom";
import { Path } from "../common/Path";
import { Layout } from "../layout/Layout";
import MainPage from "../pages/MainPage/MainPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import FilteredPage from "../pages/FilteredPage/FilteredPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import Error404 from "../pages/Error404/Error404";
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar";

import { createTheme, ThemeProvider } from "@mui/material";
import { selectThemeMode } from "./app-slice";
import { useAppSelector } from "../common/hooks";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = createTheme({ palette: { mode: themeMode } });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={Path.Main} element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path={Path.Category} element={<CategoryPage />} />
            <Route path={Path.Filtered} element={<FilteredPage />} />
            <Route path={Path.Search} element={<SearchPage />} />
            <Route path={Path.Favorites} element={<FavoritesPage />} />
            <Route path={Path.MovieDetails} element={<MovieDetailsPage />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
        <ErrorSnackbar />
      </ThemeProvider>
    </>
  );
};
