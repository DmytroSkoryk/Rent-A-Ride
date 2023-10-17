import React from "react";
import css from "./InputMileage.module.scss";

const InputMileage = ({
  fromValue,
  toValue,
  setFromValue,
  setToValue,
  adverts,
}) => {
  const mileage = adverts.map((advert) => advert.mileage);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "from") {
      setFromValue(value);
    } else if (name === "to") {
      setToValue(value);
    }
  };

  const filteredMileage = mileage.filter((m) => {
    const from = parseFloat(fromValue);
    const to = parseFloat(toValue);
    if (!isNaN(from) && !isNaN(to)) {
      return m >= from && m <= to;
    }
    return true;
  });

  console.log("Filtered Mileage:", filteredMileage);

  return (
    <label htmlFor="from/to" className={css.label}>
      Car mileage / km
      <div className={css.inputContainer}>
        <div className={css.inputFromContainer}>
          <p>From</p>
          <input
            type="number"
            name="from"
            className={`${css.inputFrom} ${css.input}`}
            value={fromValue}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.inputToContainer}>
          <p>To</p>
          <input
            type="number"
            name="to"
            className={`${css.inputTo} ${css.input}`}
            value={toValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </label>
  );
};

export default InputMileage;
