// Профиль
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Окна
const popupContainer = document.querySelector('.popup__container');
const overlay = document.querySelectorAll('.popup');
const overlayArray = Array.from(overlay);

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
const nameInputCreate = popupAddForm.querySelector('.popup__input_type_name');
const linkInputCreate = popupAddForm.querySelector('.popup__input_type_link');

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

  function openCard() {
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

// Сабмит добавления карточки
function cardSubmit(event) {
  event.preventDefault();


  const name = nameInputCreate.value;
  const link = linkInputCreate.value;

  const cardInfo = {
    name,
    link
  };

  addCardElementEnd(createCardElement(cardInfo));

  nameInputCreate.value = '';
  linkInputCreate.value = '';
  closePopup(popupAddCard);
};

popupAddForm.addEventListener('submit', cardSubmit);
