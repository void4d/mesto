export default class Card {
    constructor(cardInfo, templateSelector, popupFunctions) {
    this._cardInfo = cardInfo;
    this._templateSelector = templateSelector;
    this._openImgPopup = popupFunctions.open;
    this._closeImgPopup = popupFunctions.close;
    this._imgPopup = document.querySelector('.popup_type_open-card');
  }
// Получение разметки
  _getTemplate = () => {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);

      return cardTemplate;
  }

  createCardElement = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__heading').textContent = this._cardInfo.name;
    this._element.querySelector('.elements__photo').src = this._cardInfo.link;
    this._element.querySelector('.elements__photo').alt = this._cardInfo.name;

    return this._element;
  }

  // Удаление карточки
  _deleteCard = () => {
    this._element.remove();
  }
// Лайк карточки
  _likeCard = () => {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
  }
// Открытие полного изображения карточки
  _openCard = () => {
    const cardPhoto = document.querySelector('.popup_type_open-card').querySelector('.popup__photo');
    const cardCaption = document.querySelector('.popup_type_open-card').querySelector('.popup__caption');
    cardPhoto.src = this._cardInfo.link;
    cardCaption.textContent = this._cardInfo.name;
    cardPhoto.alt = this._cardInfo.name;

    this._openImgPopup(this._imgPopup);
  }
// Закрытие полного изображения карточки
  _closeCard = () => {
    this._closeImgPopup(this._imgPopup);
  }
// Установка слушателей
  _setEventListeners = () => {
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._likeCard();
    })
    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._openCard();
    })
    this._imgPopup.querySelector('.popup__close-button').addEventListener('click', () => {
      this._closeCard();
    })
  }
}
