// Профиль
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Окно редактирования профиля
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupFormEdit = popupProfileEdit.querySelector('.popup__form');
const nameInputEdit = popupFormEdit.querySelector('.popup__input_type_name');
const jobInputEdit = popupFormEdit.querySelector('.popup__input_type_description');
const closeButtonEdit = popupProfileEdit.querySelector('.popup__close-button');
const saveButton = popupProfileEdit.querySelector('.popup__save-button');

// Окно добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const closeButtonAddCard = popupAddCard.querySelector('.popup__close-button');
const createButton = popupAddCard.querySelector('.popup__save-button');

// Окно просмотра полного изображения
const popupOpenCard = document.querySelector('.popup_type_open-card');
const closeButtonOpenCard = popupOpenCard.querySelector('.popup__close-button');
const cardPhoto = popupOpenCard.querySelector('.popup__photo');
const cardCaption = popupOpenCard.querySelector('.popup__caption');

// Карточка
const cardTemplate = document.querySelector('.card-template');
const cardsGrid = document.querySelector('.elements');

// Сабмит окна редактирования профиля
popupFormEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInputEdit.value;
  jobProfile.textContent = jobInputEdit.value;
  closePopup(popupProfileEdit);
});

// Функция создания карточки
function createCardElement(cardInfo) {
  const cardElement = cardTemplate.content.querySelector('.elements__card').cloneNode(true);

  const cardName = cardElement.querySelector('.elements__heading');
  const cardImage = cardElement.querySelector('.elements__photo');

  cardName.textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  function openCard(cardInfo) {
    cardPhoto.src = cardInfo.link;
    cardCaption.textContent = cardInfo.name;
    cardCaption.alt = cardInfo.name;
    openPopup(popupOpenCard);
  };

  const deleteButton = cardElement.querySelector('.elements__delete-button');
  const likeButton = cardElement.querySelector('.elements__like-button');

  // Функция удаления карточки
  function deleteCard() {
    cardElement.remove();
  };
  // Функция лайка карточки
  function likeCard() {
    likeButton.classList.toggle('elements__like-button_active');
  };

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  // Открытие окна просмотра полного изображения
  cardImage.addEventListener('click', function () {
    openCard(cardInfo);
  });
  //Закрытие окна просмотра полного изображения
  closeButtonOpenCard.addEventListener('click', function () {
    closePopup(popupOpenCard);
  });
  return cardElement;
};

// Функция добавления карточки в начало
function addCardElementStart(cardElement) {
  cardsGrid.append(cardElement);
};

// Функция добавления карточки в конец
function addCardElementEnd(cardElement) {
  cardsGrid.prepend(cardElement);
};

initialCards.forEach((card) => {
  addCardElementStart(createCardElement(card));
});

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
   closePopup(popupProfileEdit);
   closePopup(popupOpenCard);
   closePopup(popupAddCard);
  };
};

document.addEventListener('keydown', closePopupByEsc);

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// Закрытие окна добавления карточки
closeButtonAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// Сабмит добавления карточки
function cardSubmit(event) {
  event.preventDefault();
  const nameInput = popupAddForm.querySelector('.popup__input_type_name');
  const linkInput = popupAddForm.querySelector('.popup__input_type_link');

  const name = nameInput.value;
  const link = linkInput.value;

  const cardInfo = {
    name,
    link
  };

  addCardElementEnd(createCardElement(cardInfo));

  nameInput.value = '';
  linkInput.value = '';

  closePopup(popupAddCard);
};

popupAddForm.addEventListener('submit', cardSubmit);




