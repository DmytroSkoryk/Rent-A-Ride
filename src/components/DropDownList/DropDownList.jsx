import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMakes } from "../../redux/operations";
import { fetchAllMakesSuccess } from "../../redux/advertsSlice";
import Select from "react-select";
import { selectAllMakes } from "../../redux/selectors";
import makeStyles from "./styles";

const DropDownList = ({ setSelectedMake, style }) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAllMakes);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [selectedMake, setSelectedMakeLocal] = useState(null);
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

  const options = getUniqueMakes(adverts);

  const handleChange = (selectedOption) => {
    setSelectedMakeLocal(selectedOption);
    setSelectedMake(selectedOption);
  };

  const styles = makeStyles({ style });

  return (
    <div>
      <Select
        styles={styles}
        placeholder="Enter the text"
        options={options}
        value={selectedMake}
        onChange={handleChange}
      />
    </div>
  );
};

export default DropDownList;
