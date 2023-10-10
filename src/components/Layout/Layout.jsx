import { NavLink, Outlet } from "react-router-dom";
import css from "../Layout/Layout.module.scss";

const Layout = () => {
  return (
    <div>
      <header className={css.container}>
        <NavLink to="/" className={css.logo}>
          Rent-A-Ride
        </NavLink>
        <nav className={css.navContainer}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? css.activeLink : css.notActiveLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? css.activeLink : css.notActiveLink
            }
          >
            Catalog
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? css.activeLink : css.notActiveLink
            }
          >
            Favorites
          </NavLink>
        </nav>
      </header>
      <div className={css.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
