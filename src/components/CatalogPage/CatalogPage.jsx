import React, { useState } from "react";
import css from "../CatalogPage/CatalogPage.module.scss";
import CarsList from "../CarsList/CarsList";
import SearchForm from "../SearchForm/SearchForm";

const CatalogPage = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [filteredMileage, setFilteredMileage] = useState(null);

  return (
    <div className={css.container}>
      <SearchForm
        setSelectedMake={setSelectedMake}
        setSelectedPrice={setSelectedPrice}
        setFilteredMileage={setFilteredMileage}
      />
      <CarsList
        selectedMake={selectedMake}
        selectedPrice={selectedPrice}
        getMileage={filteredMileage}
      />
    </div>
  );
};

export default CatalogPage;
