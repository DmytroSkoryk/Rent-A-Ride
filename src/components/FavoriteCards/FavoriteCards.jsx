import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "../FavoriteCards/FavoriteCards.module.scss";
import Button from "../Button/Button";
import HeartBtn from "../HeartBtn/HeartBtn";
import Modal from "../Modal/Modal";
import * as selectors from "../../redux/selectors";
import {
  removeSelectedFavoriteCard,
  updateSelectedFavoriteCard,
} from "../../redux/advertsSlice";

const FavoriteCards = () => {
  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);
  const selectedFavoriteCards = useSelector(selectors.selectFavoriteCards);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedFavoriteCards =
      JSON.parse(localStorage.getItem("selectedFavoriteCards")) || [];
    dispatch(updateSelectedFavoriteCard(savedFavoriteCards));
  }, [dispatch]);

  const openModal = (adver) => {
    setSelectedCard(adver);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeFavoriteCard = (adver) => {
    dispatch(removeSelectedFavoriteCard(adver));
    const updatedSelectedFavoriteCards = selectedFavoriteCards.filter(
      (card) => card.id !== adver.id
    );
    localStorage.setItem(
      "selectedFavoriteCards",
      JSON.stringify(updatedSelectedFavoriteCards)
    );
  };

  return (
    <section className={css.container}>
      {selectedFavoriteCards.length === 0 ? (
        <p className={css.title}>You do not have favorite car yet</p>
      ) : (
        <ul className={css.containerCard}>
          {isLoading && <b>Loading adverts...</b>}
          {error && <b>{error}</b>}
          {selectedFavoriteCards.map((card) => (
            <li key={card.id} className={css.card}>
              <div className={css.cardImgWrapper}>
                <img src={card.img} alt="cars" className={css.cardImg} />
                <div className={css.heartBtnContainer}>
                  <HeartBtn
                    cardId={card.id}
                    onClick={() => removeFavoriteCard(card)}
                  />
                </div>
              </div>
              <div className={css.nameContainer}>
                <div className={css.nameAndYear}>
                  <p>{card.make}</p>
                  <p className={css.model}>{card.model},</p>
                  <p>{card.year}</p>
                </div>
                <p className={css.price}>{card.rentalPrice}</p>
              </div>

              <div className={css.info}>
                <div className={css.infoTop}>
                  <p>{card.address && card.address.split(", ")[1]}</p>
                  <p>{card.address && card.address.split(", ")[2]}</p>
                  <p>{card.rentalCompany}</p>
                </div>
                <div className={css.infoBottom}>
                  <p>{card.type}</p>
                  <p>{card.make}</p>
                  <p>{card.id}</p>
                  <p>
                    {card.functionalities &&
                      card.functionalities[0].split(" ").slice(0, 2).join(" ")}
                  </p>
                </div>
              </div>
              <Button children="Learn more" onClick={() => openModal(card)} />
            </li>
          ))}
        </ul>
      )}
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        selectedCard={selectedCard}
      />
    </section>
  );
};

export default FavoriteCards;
