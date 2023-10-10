import css from "../HomePage/HomePage.module.scss";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <section className={css.container}>
      <h1 className={css.title}>Rent-A-Ride: your journey on our wheels </h1>
      <div className={css.textContainer}>
        <p className={css.text}>
          Looking for the perfect car for an unforgettable journey? Look no
          further! Whether you're traveling for business, leisure, or
          relaxation, we have a car that suits your needs. Reserve your vehicle
          today and embark on the best journey of your life!
        </p>
      </div>
      <div className={css.btnContainer}>
        <NavLink to="/catalog">
          <Button children="Click here" />
        </NavLink>
      </div>
    </section>
  );
};
export default HomePage;
