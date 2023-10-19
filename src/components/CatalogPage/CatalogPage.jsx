import React, { useState } from "react";
import css from "../CatalogPage/CatalogPage.module.scss";
import CarsList from "../CarsList/CarsList";
import SearchForm from "../SearchForm/SearchForm";

const CatalogPage = () => {
  const [filteredResults, setfilteredResults] = useState(null);

  return (
    <div className={css.container}>
      <SearchForm setfilteredResults={setfilteredResults} />
      <CarsList filteredResults={filteredResults} />
    </div>
  );
};

export default CatalogPage;
