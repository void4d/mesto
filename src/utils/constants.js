export const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_invalid",
};

// Кнопки профиля
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

// Форма редактирования профиля
export const popupFormEdit = document.forms["editform"];
export const nameInputEdit = popupFormEdit.querySelector(".popup__input_type_name");
export const jobInputEdit = popupFormEdit.querySelector(
  ".popup__input_type_about"
);
// Форма добавления карточки
export const popupAddForm = document.forms["addform"];

// Контейнер карточек
export const cardsGrid = document.querySelector(".elements");
