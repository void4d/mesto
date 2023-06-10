import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
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
  descriptionElement: '.profile__description',
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

cardsContainer.render(initialCards);

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
  popupWithEditForm.close();
}

// Открытие окна редактирования профиля
editButton.addEventListener('click', function () {
  popupWithEditForm.open();

  const { name, description } = userInfo.getUserInfo();

  nameInputEdit.value = name;
  jobInputEdit.value = description;
  profileValidation.resetValidation();
});

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  popupWithAddForm.open();
  cardValidation.resetValidation();
});

// Создание карточки
function createCard(item) {
  const card = new Card(item, '.card-template', handleCardClick);
  const cardElement = card.createCardElement();

  return cardElement;
}

// Сабмит добавления карточки
function submitCard(data) {
  cardsContainer.addItem(createCard(data));

  popupWithAddForm.close();
  cardValidation.resetValidation();
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '8156abe8-8242-4bae-8403-684c2d885ae6'
  },
});

