import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMakes } from "../../redux/operations";
import { fetchAllMakesSuccess } from "../../redux/advertsSlice";
import { selectAllMakes } from "../../redux/selectors";
import DropDownList, { getUniqueMakes } from "../DropDownList/DropDownList";
import InputMileage from "../InputMileage/InputMileage";
import Button from "../Button/Button";
import css from "./SearchForm.module.scss";

const SearchForm = ({
  setSelectedMake,
  setSelectedPrice,
  setFilteredMileage,
}) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAllMakes);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [fetchingMakes, setFetchingMakes] = useState(true);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const filteredMileage = adverts.filter((advert) => {
      const mileage = advert.mileage;
      const from = parseFloat(fromValue);
      const to = parseFloat(toValue);
      if (!isNaN(from) && !isNaN(to)) {
        return mileage >= from && mileage <= to;
      } else if (!isNaN(from)) {
        return mileage >= from;
      } else if (!isNaN(to)) {
        return mileage <= to;
      }
      return true;
    });

    const getMileage = filteredMileage.map((data) => data.mileage);
    setFilteredMileage(getMileage);
  };

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

  return (
    <form className={css.formContainer}>
      <DropDownList
        setSelectedMake={setSelectedMake}
        setSelectedPrice={setSelectedPrice}
        adverts={adverts}
      />
      <InputMileage
        adverts={adverts}
        fromValue={fromValue}
        toValue={toValue}
        setFromValue={setFromValue}
        setToValue={setToValue}
      />
      <Button
        children="Search"
        variant="searchBtn"
        type="submit"
        onClick={handleSearch}
      />
    </form>
  );
};

export default SearchForm;
