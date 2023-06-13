import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  enableValidation,
  editButton,
  addButton,
  popupFormEdit,
  nameInputEdit,
  jobInputEdit,
  popupAddForm,
  cardsGrid,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const popupWithEditForm = new PopupWithForm('.popup_type_profile-edit', submitProfile);
const popupWithAddForm = new PopupWithForm('.popup_type_add-card', submitCard);
const popupWithImage = new PopupWithImage('.popup_type_open-card');
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  userNameElement: '.profile__name',
  aboutElement: '.profile__about',
});

const cardsContainer = new Section(
  {
    renderer: (item) => {
      const newCard = createCard(item);
      cardsGrid.append(newCard);
    },
  },
  '.elements',
);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '8156abe8-8242-4bae-8403-684c2d885ae6',
  },
});

const profileValidation = new FormValidator(enableValidation, popupFormEdit);
const cardValidation = new FormValidator(enableValidation, popupAddForm);

profileValidation.enableValidation();
cardValidation.enableValidation();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Сабмит окна редактирования профиля
function submitProfile(data) {
  userInfo.setUserInfo(data);

  const { name, about } = data;

  api.setUserInfoApi(name, about);
  popupWithEditForm.close();
}

// Открытие окна редактирования профиля
editButton.addEventListener('click', function () {
  popupWithEditForm.open();

  const { name, about } = userInfo.getUserInfo();

  nameInputEdit.value = name;
  jobInputEdit.value = about;
  profileValidation.resetValidation();
});

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  popupWithAddForm.open();
  cardValidation.resetValidation();
});

function handleDelete(cardId, card) {
  api.deleteCardApi(cardId, card).then(() => card.remove());
}

function handleDeleteIcon(cardId, button, userId) {
  if (cardId !== userId) {
    button.remove();
  }
}

function likeCard(cardId) {
  api.putLikeApi(cardId).then((data) => {
    this._likesCounter.textContent = data.likes.length;
    this._likeButton.classList.add('elements__like-button_active');
  });
}

function unlikeCard(cardId) {
  api.deleteLikeApi(cardId).then((data) => {
    this._likesCounter.textContent = data.likes.length;
    this._likeButton.classList.remove('elements__like-button_active');
  });
}

// Создание карточки
function createCard(item) {
  const card = new Card(
    item,
    '.card-template',
    handleCardClick,
    { handleDelete },
    { handleDeleteIcon },
    { likeCard },
    { unlikeCard },
    userInfo,
  );
  const cardElement = card.createCardElement();

  return cardElement;
}

// Сабмит добавления карточки
function submitCard(data) {
  const { name, link } = data;

  api.postCardApi(name, link).then((res) => {
    cardsContainer.addItem(createCard(res));
  });

  popupWithAddForm.close();
  cardValidation.resetValidation();
}

// GET Карточек
api
  .getInitialCardsApi()
  .then((cardsData) => {
    cardsContainer.render(cardsData);
  })
  .catch((err) => console.log(err));

// GET Информации о пользователе
api
  .getUserInfoApi()
  .then((info) => {
    userInfo.setUserInfo(info);
  })
  .catch((err) => console.log(err));
