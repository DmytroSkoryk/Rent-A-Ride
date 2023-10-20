import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLimit } from "../../redux/advertsSlice";
import * as selectors from "../../redux/selectors";
import { fetchAdverts } from "../../redux/operations";
import css from "../CarsList/CarsList.module.scss";
import RenderCard from "./RenderCard";
import Modal from "../Modal/Modal";

const CarsList = ({ filteredResults }) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectors.selectAdverts);
  const cars = useSelector(selectors.selectAllCars);
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
  }, [dispatch, currentPage, limit]);

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

  return (
    <section>
      <ul className={css.container}>
        {isLoading && <b>Loading adverts...</b>}
        {error && <b>{error}</b>}
        {filteredResults !== null ? (
          filteredResults.length > 0 ? (
            filteredResults.map((adver) => (
              <RenderCard
                key={adver.id}
                adver={adver}
                openModal={openModal}
                addFavoriteCard={addFavoriteCard}
                selectedFavoriteCards={selectedFavoriteCards}
              />
            ))
          ) : (
            <p className={css.notFaund}>Nothing was found for your request</p>
          )
        ) : (
          adverts.map((adver) => (
            <RenderCard
              key={adver.id}
              adver={adver}
              openModal={openModal}
              addFavoriteCard={addFavoriteCard}
            />
          ))
        )}
      </ul>
      <div className={css.loadMoreBtnContainer}>
        {limit <= cars.length - 1 && filteredResults === null ? (
          <button onClick={loadMore} className={css.loadMoreBtn}>
            Load more
          </button>
        ) : null}
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
