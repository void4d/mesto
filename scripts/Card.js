export default class Card {
  constructor(cardInfo, templateSelector, handleCardClick) {
    this._cardInfo = cardInfo;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  // Получение разметки
  _getTemplate = () => {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardTemplate;
  };

  createCardElement = () => {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__photo");
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._cardCaption = this._element.querySelector(".elements__heading");

    this._setEventListeners();

    this._cardCaption.textContent = this._cardInfo.name;
    this._cardImage.src = this._cardInfo.link;
    this._cardImage.alt = this._cardInfo.name;

    return this._element;
  };
  // Удаление карточки
  _deleteCard = () => {
    this._element.remove();
  };
  // Лайк карточки
  _likeCard = () => {
    this._likeButton.classList.toggle("elements__like-button_active");
  };
  // Установка слушателей
  _setEventListeners = () => {
    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardCaption.textContent, this._cardImage.src);
    });
  };
}
