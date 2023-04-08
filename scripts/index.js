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
const popupAddForm = popupAddCard.querySelector('.popup__form');

// Окно просмотра полного изображения
const popupOpenCard = document.querySelector('.popup__type_open-card');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = popupProfileEdit.querySelector('.popup__close-button');
const closeButtonAddCard = popupAddCard.querySelector('.popup__close-button');
const closeButtonOpenCard = popupOpenCard.querySelector('.popup__close-button');
const saveButton = popupProfileEdit.querySelector('.popup__save-button');
const createButton = popupAddCard.querySelector('.popup__save-button');
const likeButton = document.querySelector('.elements__like-button');
const addButton = document.querySelector('.profile__add-button');

// Сабмит окна редактирования профиля
popupFormEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInputEdit.value;
  jobProfile.textContent = jobInputEdit.value;
  closePopup(popupProfileEdit);
});

// Фото карточки
const cardPhotoCropped = document.querySelector('.elements__photo')
const cardPhoto = document.querySelector('.popup__photo');
const cardCaption = document.querySelector('.popup__caption');

// Функция создания карточки
const cardTemplate = document.querySelector('.card-template');
const cardsGrid = document.querySelector('.elements');

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

// Функция добавления карточки
function addCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};

initialCards.forEach((card) => {
  addCardElement(createCardElement(card));
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

  addCardElement(createCardElement(cardInfo));
  closePopup(popupAddCard);
};

popupAddForm.addEventListener('submit', cardSubmit);
