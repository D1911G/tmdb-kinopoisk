import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import s from "./Layout.module.css";
import { useAppSelector } from "@/common/hooks";
import { selectIsLoading } from "@/app/app-slice";
import { LinearProgress } from "@mui/material";

export const Layout = () => {
  const isLoading = useAppSelector(selectIsLoading);
  return (
    <div className={s.layout}>
      <Header></Header>
      {isLoading && <LinearProgress />}
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
