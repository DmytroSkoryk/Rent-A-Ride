import React, { useEffect } from "react";
import css from "./Modal.module.scss";
import ModalCard from "../ModalCard/ModalCard";

const Modal = ({ isOpen, closeModal, selectedCard }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className={css.modalOverlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={closeModal}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 6L6 18" stroke="#121417" />
            <path d="M6 6L18 18" stroke="#121417" />
          </svg>
        </button>
        <ModalCard selectedCard={selectedCard} />
      </div>
    </div>
  );
};

export default Modal;
