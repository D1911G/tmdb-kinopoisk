import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import s from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={s.layout}>
      <Header></Header>
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
