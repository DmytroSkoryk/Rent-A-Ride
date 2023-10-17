import React, { useState } from "react";
import Select from "react-select";
import css from "./DropDownList.module.scss";

export function getUniqueMakes(adverts) {
  const uniqueMakes = new Set();
  adverts.forEach((advert) => {
    uniqueMakes.add(advert.make);
  });
  return Array.from(uniqueMakes).map((make) => ({
    label: make,
    value: make,
  }));
}

const DropDownList = ({ setSelectedMake, setSelectedPrice, adverts }) => {
  const [selectedMake, setSelectedMakeLocal] = useState(null);
  const [selectedPrice, setSelectedPriceLocal] = useState(null);
  const [selectedPricePlaceholder, setSelectedPricePlaceholder] =
    useState("To $");

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
    setSelectedPriceLocal(selectedOption.value);
    setSelectedPricePlaceholder(`To ${selectedOption.label}$`);
    setSelectedPrice({
      value: selectedOption.value,
      label: selectedOption.label,
    });
  };

  return (
    <div className={css.container}>
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
          placeholder={selectedPricePlaceholder}
          options={price}
          value={selectedPrice}
          onChange={handleChangePrice}
        />
      </label>
    </div>
  );
};

export default DropDownList;
