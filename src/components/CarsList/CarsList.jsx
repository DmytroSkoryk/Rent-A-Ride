import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLimit } from "../../redux/advertsSlice";
import * as selectors from "../../redux/selectors";
import { fetchAdverts } from "../../redux/operations";
import css from "../CarsList/CarsList.module.scss";
import Button from "../Button/Button";
import HeartBtn from "../HeartBtn/HeartBtn";
import Modal from "../Modal/Modal";

const CarsList = ({ selectedMake }) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectors.selectAdverts);
  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);
  const currentPage = useSelector(selectors.selectCurrentPage);
  const limit = useSelector(selectors.selectLimit);

  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFavoriteCards, setSelectedFavoriteCards] = useState([]);

  useEffect(() => {
    dispatch(fetchAdverts({ page: currentPage, limit }));
    const savedFavoriteCards =
      JSON.parse(localStorage.getItem("selectedFavoriteCards")) || [];
    setSelectedFavoriteCards(savedFavoriteCards);
  }, [dispatch, currentPage, limit, selectedMake]);

  const addFavoriteCard = async (adver) => {
    const card = { ...adver };
    const isClicked = selectedFavoriteCards.some(
      (card) => card.id === adver.id
    );

    if (isClicked) {
      const updatedSelectedFavoriteCards = selectedFavoriteCards.filter(
        (card) => card.id !== adver.id
      );
      setSelectedFavoriteCards(updatedSelectedFavoriteCards);
      localStorage.setItem(
        "selectedFavoriteCards",
        JSON.stringify(updatedSelectedFavoriteCards)
      );
    } else {
      const updatedSelectedFavoriteCards = [...selectedFavoriteCards, card];
      setSelectedFavoriteCards(updatedSelectedFavoriteCards);
      localStorage.setItem(
        "selectedFavoriteCards",
        JSON.stringify(updatedSelectedFavoriteCards)
      );
    }
  };

  const openModal = (adver) => {
    setSelectedCard(adver);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMore = () => {
    dispatch(updateLimit(limit + 8));
  };

  const filteredAdverts = selectedMake
    ? adverts.filter((advert) => advert.make === selectedMake.value)
    : adverts;
  return (
    <section>
      <ul className={css.container}>
        {isLoading && <b>Loading adverts...</b>}
        {error && <b>{error}</b>}
        {filteredAdverts.map((adver) => (
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
                <p>
                  {adver.functionalities[0].split(" ").slice(0, 2).join(" ")}{" "}
                </p>
              </div>
            </div>
            <Button children="Learn more" onClick={() => openModal(adver)} />
          </li>
        ))}
      </ul>
      <div className={css.loadMoreBtnContainer}>
        <button onClick={loadMore} className={css.loadMoreBtn}>
          Load more
        </button>
      </div>
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        selectedCard={selectedCard}
      />
    </section>
  );
};

export default CarsList;
