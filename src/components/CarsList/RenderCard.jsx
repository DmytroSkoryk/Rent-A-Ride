import css from "./CarsList.module.scss";
import Button from "../Button/Button";
import HeartBtn from "../HeartBtn/HeartBtn";

const RenderCard = ({
  adver,
  openModal,
  addFavoriteCard,
  selectedFavoriteCards,
}) => {
  return (
    <li key={adver.id} className={css.card}>
      <div className={css.cardImgWrapper}>
        <img src={adver.img} alt="cars" className={css.cardImg} />
        <div className={css.heartBtnContainer}>
          <HeartBtn
            onClick={() => addFavoriteCard(adver)}
            selectedFavoriteCards={selectedFavoriteCards}
            cardId={adver.id}
          />
        </div>
      </div>
      <div className={css.nameContainer}>
        <div className={css.nameAndYear}>
          <p>{adver.make}</p>
          <p className={css.model}>{adver.model},</p>
          <p>{adver.year}</p>
        </div>
        <p className={css.price}>{adver.rentalPrice}</p>
      </div>

      <div className={css.info}>
        <div className={css.infoTop}>
          <p>{adver.address.split(", ")[1]}</p>
          <p>{adver.address.split(", ")[2]}</p>
          <p>{adver.rentalCompany}</p>
        </div>
        <div className={css.infoBottom}>
          <p>{adver.type}</p>
          <p>{adver.make}</p>
          <p>{adver.id}</p>
          <p>{adver.functionalities[0].split(" ").slice(0, 2).join(" ")} </p>
        </div>
      </div>
      <Button children="Learn more" onClick={() => openModal(adver)} />
    </li>
  );
};

export default RenderCard;
