import React, { useState } from "react";
import css from "../CatalogPage/CatalogPage.module.scss";
import CarsList from "../CarsList/CarsList";
import DropDownList from "../DropDownList/DropDownList";

const CatalogPage = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  return (
    <div className={css.container}>
      <DropDownList
        setSelectedMake={setSelectedMake}
        setSelectedPrice={setSelectedPrice}
      />
      <CarsList selectedMake={selectedMake} selectedPrice={selectedPrice} />
    </div>
  );
};

export default CatalogPage;
