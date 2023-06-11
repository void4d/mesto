export const initialCards = [
  {
    name: "Алтай",
    link: "https://images.unsplash.com/photo-1643281237857-5f14c2b9f3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Куршская коса",
    link: "https://images.unsplash.com/photo-1589876876491-df78ff60e196?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  {
    name: "Эльбрус",
    link: "https://images.unsplash.com/photo-1521312210993-3d37582bcfb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Камчатка",
    link: "https://images.unsplash.com/photo-1535427284698-c8e68a1eb910?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80",
  },
  {
    name: "Байкал",
    link: "https://images.unsplash.com/photo-1617835594990-7cd5a9b5d153?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Карачаевск",
    link: "https://avatars.mds.yandex.net/get-marketcms/1490511/img-e29b26db-5c9c-4b5e-8f29-4e83cf37863b.jpeg/optimize",
  },
];

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
