import Card from './Card.js';
import { initialCards } from './array.js';
import * as validation from './validate.js';

// Профиль
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Окна
const overlay = document.querySelectorAll('.popup');
const overlayArray = Array.from(overlay);

// Окно редактирования профиля
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupFormEdit = popupProfileEdit.querySelector('.popup__form');
const nameInputEdit = popupFormEdit.querySelector('.popup__input_type_name');
const jobInputEdit = popupFormEdit.querySelector('.popup__input_type_description');
const closeButtonEdit = popupProfileEdit.querySelector('.popup__close-button');

// Окно добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const closeButtonAddCard = popupAddCard.querySelector('.popup__close-button');
const createButton = popupAddCard.querySelector('.popup__save-button');
const nameInputCreate = popupAddForm.querySelector('.popup__input_type_name');
const linkInputCreate = popupAddForm.querySelector('.popup__input_type_link');


const cardsGrid = document.querySelector('.elements');

// Сабмит окна редактирования профиля
popupFormEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInputEdit.value;
  jobProfile.textContent = jobInputEdit.value;
  closePopup(popupProfileEdit);
});

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupByClickOnOverlay);
  document.addEventListener('keydown', closePopupByEsc);
};

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupByClickOnOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
};

// Открытие окна редактирования профиля
editButton.addEventListener('click', function () {
  openPopup(popupProfileEdit);
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
});

// Закрытие окна редактирования профиля
closeButtonEdit.addEventListener('click', function () {
  closePopup(popupProfileEdit);
});

// Закрытие попапов на Esc
function closePopupByEsc(evt) {
  overlayArray.forEach(function (popup) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    };
  });
};

// Закрытие попапов на клик по оверлею
function closePopupByClickOnOverlay() {
  overlayArray.forEach(function (popupOverlay) {
    popupOverlay.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popupOverlay);
    };
    });
  });
};

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// Закрытие окна добавления карточки
closeButtonAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// Функция добавления карточки в начало
function addCardElementStart(cardElement) {
  cardsGrid.append(cardElement);
};

// Функция добавления карточки в конец
function addCardElementEnd(cardElement) {
  cardsGrid.prepend(cardElement);
};

// Сабмит добавления карточки
function cardSubmit(event) {
  event.preventDefault();


  const name = nameInputCreate.value;
  const link = linkInputCreate.value;

  const cardInfo = {
    name,
    link
  };

  const card = new Card(cardInfo, '.card-template', popupFunctions);
  const cardElement = card.createCardElement();
  addCardElementEnd(cardElement);

  nameInputCreate.value = '';
  linkInputCreate.value = '';
  closePopup(popupAddCard);
  createButton.classList.add('popup__save-button_disabled');
};

popupAddForm.addEventListener('submit', cardSubmit);

const popupFunctions = {
  open: openPopup,
  close: closePopup
};

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template', popupFunctions);
  const cardElement = card.createCardElement();
  addCardElementStart(cardElement);
});
