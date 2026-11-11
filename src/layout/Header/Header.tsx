import { NavLink } from "react-router-dom";
import { Path } from "../../common/Path";
import logo from "../../assets/logo.svg";
import { changeThemeModeAC, selectThemeMode } from "../../app/app-slice";
import { useAppDispatch, useAppSelector } from "../../common/hooks";

export default function Header() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);

  const changeTheme = () => {
    dispatch(changeThemeModeAC(themeMode === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <div>
        <NavLink to={Path.Main}>
          <img src={logo} alt="TMDB Logo" width={50} height={50}></img>
        </NavLink>
      </div>
      <div>
        <NavLink
          to={Path.Main}
          className={({ isActive }) => (isActive ? "active" : "")}
          end
        >
          Main
        </NavLink>
        <NavLink
          to={Path.Category}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Category movies
        </NavLink>
        <NavLink
          to={Path.Filtered}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Filtered movies
        </NavLink>
        <NavLink
          to={Path.Search}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Search
        </NavLink>
        <NavLink
          to={Path.Favorites}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Favorites
        </NavLink>
      </div>
      <button onClick={changeTheme}>
        {themeMode === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
