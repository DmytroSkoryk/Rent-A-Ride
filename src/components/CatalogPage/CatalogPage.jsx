import React, { useState } from "react";
import css from "../CatalogPage/CatalogPage.module.scss";
import CarsList from "../CarsList/CarsList";
import DropDownList from "../DropDownList/DropDownList";

const CatalogPage = () => {
  const [selectedMake, setSelectedMake] = useState(null);

  return (
    <div className={css.container}>
      <DropDownList setSelectedMake={setSelectedMake} />
      <CarsList selectedMake={selectedMake} />
    </div>
  );
};

export default CatalogPage;
