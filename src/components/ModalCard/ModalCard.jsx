import css from "../ModalCard/ModalCard.module.scss";
import Button from "../Button/Button";

const ModalCard = ({ selectedCard }) => {
  const phoneNumber = "+380730000000";
  return (
    <div className={css.modalCardContainer}>
      <div className={css.modalCardImgWrapper}>
        <img src={selectedCard.img} alt="cars" className={css.modalCardImg} />
      </div>
      <div className={css.modalNameContainer}>
        <div className={css.modalNameAndYear}>
          <p>{selectedCard.make}</p>
          <p className={css.model}>{selectedCard.model},</p>
          <p>{selectedCard.year}</p>
        </div>
      </div>

      <div className={css.info}>
        <div className={css.infoTop}>
          <p>{selectedCard.address.split(", ")[1]}</p>
          <p>{selectedCard.address.split(", ")[2]}</p>
          <p>id: {selectedCard.id}</p>
          <p>Year: {selectedCard.year}</p>
          <p>Type: {selectedCard.type}</p>
        </div>
        <div className={css.infoBottom}>
          <p>Fuel consumption: {selectedCard.fuelConsumption}</p>
          <p>Engine size: {selectedCard.engineSize}</p>
        </div>
        <p className={css.description}>{selectedCard.description}</p>
        <p className={css.title}>Accessories and functionalities:</p>
        <div className={css.infoTop}>
          <p>{selectedCard.accessories[0].split(", ")}</p>
          <p>{selectedCard.accessories[1].split(", ")}</p>
          <p>{selectedCard.accessories[2].split(", ")}</p>
        </div>
        <div className={css.infoBottom}>
          <p>{selectedCard.functionalities[0].split(", ")}</p>
          <p>{selectedCard.functionalities[1].split(", ")}</p>
          <p>{selectedCard.functionalities[2].split(", ")}</p>
        </div>
        <p className={css.title}>Rental Conditions:</p>
        <div className={css.rentalTop}>
          <p>
            {selectedCard.rentalConditions.split("\n")[0].split(":")[0]}:{" "}
            <span className={css.data}>
              {selectedCard.rentalConditions.split("\n")[0].split(":")[1]}
            </span>
          </p>
          <p>{selectedCard.rentalConditions.split("\n")[1]}</p>
        </div>
        <div className={css.rentalBottom}>
          <p>{selectedCard.rentalConditions.split("\n")[2]}</p>
          <p>
            Mileage:{" "}
            <span className={css.data}>
              {selectedCard.mileage.toLocaleString("en-US")}
            </span>
          </p>
          <p>
            Price: <span className={css.data}>{selectedCard.rentalPrice}</span>
          </p>
        </div>
        <a href={`tel:${phoneNumber}`}>
          <Button children="Rental car" variant="rentalBtn" />
        </a>
      </div>
    </div>
  );
};

export default ModalCard;
