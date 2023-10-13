import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMakes } from "../../redux/operations";
import { fetchAllMakesSuccess } from "../../redux/advertsSlice";
import Select from "react-select";
import { selectAllMakes } from "../../redux/selectors";
import css from "./DropDownList.module.scss";

const DropDownList = ({ setSelectedMake, setSelectedPrice }) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAllMakes);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedMake, setSelectedMakeLocal] = useState(null);
  const [selectedPrice, setSelectedPriceLocal] = useState(null);
  const [fetchingMakes, setFetchingMakes] = useState(true);

  useEffect(() => {
    if (fetchingMakes) {
      dispatch(fetchAllMakes())
        .unwrap()
        .then((data) => {
          dispatch(fetchAllMakesSuccess(data));
          const uniqueMakes = getUniqueMakes(data);
          setUniqueMakes(uniqueMakes);
          setFetchingMakes(false);
        })
        .catch((e) => console.log("error: ", e));
    }
  }, [dispatch, fetchingMakes]);

  function getUniqueMakes(adverts) {
    const uniqueMakes = new Set();
    adverts.forEach((advert) => {
      uniqueMakes.add(advert.make);
    });
    return Array.from(uniqueMakes).map((make) => ({
      label: make,
      value: make,
    }));
  }

  function getUniquePrice(adverts) {
    const uniquePrice = new Set();
    adverts.forEach((advert) => {
      uniquePrice.add(advert.rentalPrice);
    });
    return Array.from(uniquePrice).map((price) => ({
      label: parseInt(price.slice(1)),
      value: price,
    }));
  }

  const brand = getUniqueMakes(adverts);
  const price = getUniquePrice(adverts).sort((a, b) => a.label - b.label);

  const handleChangeMakes = (selectedOption) => {
    setSelectedMakeLocal(selectedOption);
    setSelectedMake(selectedOption);
  };

  const handleChangePrice = (selectedOption) => {
    setSelectedPriceLocal(selectedOption);
    setSelectedPrice({
      value: selectedOption.value,
      label: selectedOption.label,
    });
  };

  return (
    <form className={css.formContainer}>
      <label htmlFor="brand_car" className={css.label}>
        Car brand
        <Select
          unstyled
          classNamePrefix="style"
          placeholder="Enter the text"
          options={brand}
          value={selectedMake}
          onChange={handleChangeMakes}
        />
      </label>
      <label htmlFor="price" className={css.label}>
        Price/ 1 hour
        <Select
          unstyled
          classNamePrefix="style-price"
          placeholder={"To $"}
          options={price}
          value={selectedPrice}
          onChange={handleChangePrice}
        />
      </label>
    </form>
  );
};

export default DropDownList;
