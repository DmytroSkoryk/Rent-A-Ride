import css from "./Button.module.scss";
import clsx from "clsx";

const Button = ({ children, onClick, variant }) => {
  return (
    <button
      type="button"
      className={clsx(css.btn, css[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
