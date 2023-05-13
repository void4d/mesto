import Card from "./Card.js";
import { initialCards } from "./array.js";
import FormValidator from "./FormValidator.js";

const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_invalid",
};

// Профиль
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
// Окна
const overlays = document.querySelectorAll(".popup");
const overlaysArray = Array.from(overlays);
// Окно редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_profile-edit");
const popupFormEdit = document.forms["editform"];
const nameInputEdit = popupFormEdit.querySelector(".popup__input_type_name");
const jobInputEdit = popupFormEdit.querySelector(
  ".popup__input_type_description"
);
// Окно добавления карточки
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddForm = document.forms["addform"];
const nameInputCreate = popupAddForm.querySelector(".popup__input_type_name");
const linkInputCreate = popupAddForm.querySelector(".popup__input_type_link");

// Окно просмотра полного изображения
const popupOpenCard = document.querySelector(".popup_type_open-card");
const cardPhoto = popupOpenCard.querySelector(".popup__photo");
const cardCaption = popupOpenCard.querySelector(".popup__caption");

const closeButtons = document.querySelectorAll(".popup__close-button");

const cardsGrid = document.querySelector(".elements");

const profileValidation = new FormValidator(enableValidation, popupFormEdit);
const cardValidation = new FormValidator(enableValidation, popupAddForm);
profileValidation.enableValidation();
cardValidation.enableValidation();

function handleCardClick(name, link) {
  cardCaption.textContent = name;
  cardCaption.alt = name;
  cardPhoto.src = link;

  openPopup(popupOpenCard);
}

// Сабмит окна редактирования профиля
popupFormEdit.addEventListener("submit", function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInputEdit.value;
  jobProfile.textContent = jobInputEdit.value;
  closePopup(popupProfileEdit);
});

// Открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupByClickOnOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupByClickOnOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}

// Открытие окна редактирования профиля
editButton.addEventListener("click", function () {
  openPopup(popupProfileEdit);
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
  profileValidation.resetValidation();
});

// Закрытие попапов на Esc
function closePopupByEsc(evt) {
  overlaysArray.forEach(function (popup) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

// Закрытие попапов на клик по оверлею
function closePopupByClickOnOverlay() {
  overlaysArray.forEach(function (popupOverlay) {
    popupOverlay.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup(popupOverlay);
      }
    });
  });
}

// Открытие окна добавления карточки
addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
  cardValidation.resetValidation();
});

// Функция добавления карточки в начало
function addCardElementStart(cardElement) {
  cardsGrid.append(cardElement);
}

// Функция добавления карточки в конец
function addCardElementEnd(cardElement) {
  cardsGrid.prepend(cardElement);
}

// Создание карточки
function createCard(item) {
  const card = new Card(item, ".card-template", handleCardClick);
  const cardElement = card.createCardElement();

  return cardElement;
}

// Добавление начального массива
initialCards.forEach((item) => {
  addCardElementStart(createCard(item));
});

// Закрытие попапов
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

// Сабмит добавления карточки
function submitCard(event) {
  event.preventDefault();

  const name = nameInputCreate.value;
  const link = linkInputCreate.value;

  const cardInfo = {
    name,
    link,
  };

  addCardElementEnd(createCard(cardInfo));

  event.target.reset();
  closePopup(popupAddCard);
  cardValidation.enableValidation();
}

popupAddForm.addEventListener("submit", submitCard);
