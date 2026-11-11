import { NavLink } from "react-router-dom";
import { Path } from "../../common/Path";
import logo from "../../assets/logo.svg";
import { changeThemeModeAC, selectThemeMode } from "../../app/app-slice";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import s from "./Header.module.css";

export default function Header() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);

  const changeTheme = () => {
    dispatch(changeThemeModeAC(themeMode === "light" ? "dark" : "light"));
  };

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <NavLink to={Path.Main}>
          <img src={logo} alt="TMDB Logo" width={100} height={20} />
        </NavLink>
      </div>

      <nav className={s.nav}>
        <NavLink
          to={Path.Main}
          className={({ isActive }) => (isActive ? s.active : "")}
          end
        >
          Main
        </NavLink>
        <NavLink
          to={Path.Category}
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          Category movies
        </NavLink>
        <NavLink
          to={Path.Filtered}
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          Filtered movies
        </NavLink>
        <NavLink
          to={Path.Search}
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          Search
        </NavLink>
        <NavLink
          to={Path.Favorites}
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          Favorites
        </NavLink>
      </nav>

      <button className={s.themeBtn} onClick={changeTheme}>
        {themeMode === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
