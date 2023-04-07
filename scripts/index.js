// Поля имени и описания в профиле
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');

// Окно редактирования профиля
const popupProfileEdit = document.querySelector('.popup__type_profile-edit');
const popupFormEdit = popupProfileEdit.querySelector('.popup__form');
const nameInputEdit = popupFormEdit.querySelector('.popup__input_type_name');
const jobInputEdit = popupFormEdit.querySelector('.popup__input_type_description');

// Окно добавления карточки
const popupAddCard = document.querySelector('.popup__type_add-card');

// Окно просмотра полного изображения
const popupOpenCard = document.querySelector('.popup__type_open-card');

// Фото карточки
const cardPhoto = document.querySelector('.elements__photo');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = popupProfileEdit.querySelector('.popup__close-button');
const closeButtonAddCard = popupAddCard.querySelector('.popup__close-button');
const closeButtonOpenCard = popupOpenCard.querySelector('.popup__close-button');
const saveButton = popupProfileEdit.querySelector('.popup__save-button');
const createButton = popupAddCard.querySelector('.popup__save-button');
const likeButton = document.querySelector('.elements__like-button');
const addButton = document.querySelector('.profile__add-button');

// Открытие окна редактирования профиля
editButton.addEventListener('click', function () {
  popupProfileEdit.classList.add('popup_opened');
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
});

// Закрытие окна редактирования профиля
closeButtonEdit.addEventListener('click', function () {
  popupProfileEdit.classList.remove('popup_opened');
});

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  popupAddCard.classList.add('popup_opened');
});

// Закрытие окна добавления карточки
closeButtonAddCard.addEventListener('click', function () {
  popupAddCard.classList.remove('popup_opened');
});

// Открытие окна просмотра полного изображения
// cardPhoto.addEventListener('click', function () {
//   popupOpenCard.classList.add('popup_opened');
// });

// Закрытие окна просмотра полного изображения
// closeButtonOpenCard.addEventListener('click', function () {
//   popupOpenCard.classList.remove('popup_opened');
// });

// Сабмит окна редактирования профиля
popupFormEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInputEdit.value;
  jobProfile.textContent = jobInputEdit.value;
  popupProfileEdit.classList.remove('popup_opened');
});

// Функция добавления карточки
const cardTemplate = document.querySelector('.card-template');
const cardsGrid = document.querySelector('.elements');

function createCardElement(cardInfo) {
  const cardElement = cardTemplate.content.querySelector('.elements__card').cloneNode(true);

  const cardName = cardElement.querySelector('.elements__heading');
  const cardImage = cardElement.querySelector('.elements__photo');

  cardName.textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  const deleteButton = cardElement.querySelector('.elements__delete-button');
  const likeButton = cardElement.querySelector('.elements__like-button');

  function deleteCard() {
    cardElement.remove();
  };

  function likeCard() {
    likeButton.classList.toggle('elements__like-button_active');
  };

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);

  return cardElement;
};

function addCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};

initialCards.forEach((card) => {
  addCardElement(createCardElement(card));
});
