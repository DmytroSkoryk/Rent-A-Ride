import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMakes } from "../../redux/operations";
import { fetchAllMakesSuccess } from "../../redux/advertsSlice";
import { selectAllCars } from "../../redux/selectors";
import DropDownList, { getUniqueMakes } from "../DropDownList/DropDownList";
import InputMileage from "../InputMileage/InputMileage";
import Button from "../Button/Button";
import css from "./SearchForm.module.scss";

const SearchForm = ({ setfilteredResults }) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAllCars);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [fetchingMakes, setFetchingMakes] = useState(true);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

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
    const selectedMakeValue = selectedMake ? selectedMake.value : null;
    const selectedPriceValue = selectedPrice ? selectedPrice.value : null;
    const getMileage = filteredMileage.map((data) => data.mileage);

    const filteredResults = adverts.filter((advert) => {
      const makeMatch = selectedMakeValue
        ? advert.make === selectedMakeValue
        : true;
      const priceMatch = selectedPriceValue
        ? advert.rentalPrice === selectedPriceValue
        : true;
      const mileageMatch = getMileage
        ? getMileage.includes(parseFloat(advert.mileage))
        : true;

      return makeMatch && priceMatch && mileageMatch;
    });

    setfilteredResults(filteredResults);
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
        disabled={
          !(
            selectedMake !== null ||
            selectedPrice !== null ||
            fromValue ||
            toValue !== ""
          )
        }
      />
    </form>
  );
};

export default SearchForm;
