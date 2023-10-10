import { NavLink, Outlet } from "react-router-dom";
import css from "../Layout/Layout.module.scss";

const Layout = () => {
  return (
    <div>
      <header className={css.container}>
        <NavLink to="/rent_a_ride" className={css.logo}>
          Rent-A-Ride
        </NavLink>
        <nav className={css.navContainer}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </nav>
      </header>
      <div className={css.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
