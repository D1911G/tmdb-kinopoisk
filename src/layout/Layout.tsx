import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import s from "./Layout.module.css";
import { useAppSelector } from "@/common/hooks";
import { selectIsLoading, selectThemeMode } from "@/app/app-slice"; // 👈 добавили selectThemeMode
import { LinearProgress } from "@mui/material";
import { useEffect } from "react";

export const Layout = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const themeMode = useAppSelector(selectThemeMode); // 👈 достаем тему

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <div className={s.layout}>
      <Header />
      {isLoading && <LinearProgress />}
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
