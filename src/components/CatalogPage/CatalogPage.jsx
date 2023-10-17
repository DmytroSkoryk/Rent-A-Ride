import React, { useState } from "react";
import css from "../CatalogPage/CatalogPage.module.scss";
import CarsList from "../CarsList/CarsList";
import SearchForm from "../SearchForm/SearchForm";

const CatalogPage = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  return (
    <div className={css.container}>
      <SearchForm
        setSelectedMake={setSelectedMake}
        setSelectedPrice={setSelectedPrice}
      />
      <CarsList selectedMake={selectedMake} selectedPrice={selectedPrice} />
    </div>
  );
};

export default CatalogPage;
