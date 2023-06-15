export default class Card {
  constructor(
    cardInfo,
    templateSelector,
    handleCardClick,
    { handleDeleteIcon },
    { putLike },
    { deleteLike },
    submitDeletion,
    userInfo,
  ) {
    this._cardInfo = cardInfo; // Инфо карточки
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIcon = handleDeleteIcon; // Функция удаления иконки, если карточка не моя
    this._submitDeletion = submitDeletion;

    this._putLike = putLike; // Функция устаноки лайка
    this._deleteLike = deleteLike; // Функция снятия лайка

    this._userInfo = cardInfo.owner;
    this._cardId = cardInfo._id;
    this._userId = this._userInfo._id;
    this._likesArray = cardInfo.likes;

    this._myId = userInfo._userId;
  }
  // Получение разметки
  _getTemplate = () => {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);

    return cardTemplate;
  };

  createCardElement = () => {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__photo');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._cardCaption = this._element.querySelector('.elements__heading');

    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._likesCounter = this._element.querySelector('.elements__like-counter');

    this._likesCounter.textContent = this._likesArray.length;

    this._setEventListeners();

    this._cardCaption.textContent = this._cardInfo.name;
    this._cardImage.src = this._cardInfo.link;
    this._cardImage.alt = this._cardInfo.name;

    this.isLiked();
    this._handleDeleteIcon(this._userId, this._deleteButton, this._myId);
    return this._element;
  };

  // Проверка на наличие лайка
  isLiked() {
    if (this._likesArray.some((like) => like._id === this._myId)) {
      this._likeButton.classList.add('elements__like-button_active');
    } else {
      this._likeButton.classList.remove('elements__like-button_active');
    }
  }

  // Лайк карточки
  _likeCard() {
    if (this._likeButton.classList.contains('elements__like-button_active')) {
      this._deleteLike(this._cardId);
    } else if (!this._likeButton.classList.contains('elements__like-button_active')) {
      this._putLike(this._cardId);
    }
  }

  // Установка слушателей
  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._submitDeletion(this._cardId, this._element);
    });
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardCaption.textContent, this._cardImage.src);
    });
  }
}
