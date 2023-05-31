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

// Профиль
export const nameProfile = document.querySelector(".profile__name");
export const jobProfile = document.querySelector(".profile__description");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
// Окна
export const overlays = document.querySelectorAll(".popup");
export const overlaysArray = Array.from(overlays);
// Окно редактирования профиля
export const popupProfileEdit = document.querySelector(".popup_type_profile-edit");
export const popupFormEdit = document.forms["editform"];
export const nameInputEdit = popupFormEdit.querySelector(".popup__input_type_name");
export const jobInputEdit = popupFormEdit.querySelector(
  ".popup__input_type_description"
);
// Окно добавления карточки
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupAddForm = document.forms["addform"];
export const nameInputCreate = popupAddForm.querySelector(".popup__input_type_name");
export const linkInputCreate = popupAddForm.querySelector(".popup__input_type_link");

// Окно просмотра полного изображения
export const popupOpenCard = document.querySelector(".popup_type_open-card");
export const cardPhoto = popupOpenCard.querySelector(".popup__photo");
export const cardCaption = popupOpenCard.querySelector(".popup__caption");

export const closeButtons = document.querySelectorAll(".popup__close-button");

export const cardsGrid = document.querySelector(".elements");
