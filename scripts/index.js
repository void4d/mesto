// Профиль
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Окна
const overlay = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');

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
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupProfileEdit);
    closePopup(popupOpenCard);
    closePopup(popupAddCard);
  };
};

document.addEventListener('keydown', closePopupByEsc);

// Закрытие попапов на клик по оверлею
function closePopupByClickOnOverlay(evt) {
  if (evt.target == overlay) {
    closePopup(popupProfileEdit);
    closePopup(popupOpenCard);
    closePopup(popupAddCard);
  }
};

overlay.addEventListener('click', closePopupByClickOnOverlay);

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


// Валидация формы

function setInputValidState(input, errorMessage) {
  saveButton.classList.remove('popup__save-button_disabled');
  saveButton.removeAttribute('disabled', true);
  input.classList.remove('popup__input_invalid');
  errorMessage.textContent = '';
};

function setInputInvalidState(input, errorMessage) {
  saveButton.classList.add('popup__save-button_disabled');
  saveButton.setAttribute('disabled', true);
  input.classList.add('popup__input_invalid');
  console.log(errorMessage);
  errorMessage.textContent = input.validationMessage;
};

function checkInputValidity(input) {
  const errorMessage = popupContainer.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    setInputValidState(input, errorMessage);
  } else {
    setInputInvalidState(input, errorMessage);
  }
};

function enableEditFormValidation() {
  const EditForm = document.querySelector('#editform');
  const EditFormInputs = EditForm.querySelectorAll('.popup__input')
  const EditFormInputsArray = Array.from(EditFormInputs);

  EditFormInputsArray.forEach(function (input) {
    input.addEventListener('input', function() {
      checkInputValidity(input);
    });
  });
};

enableEditFormValidation();

function enableAddFormValidation() {
  const AddForm = document.querySelector('#addform');
  const AddFormInputs = AddForm.querySelectorAll('.popup__input');
  const AddFormInputsArray = Array.from(AddFormInputs);

  AddFormInputsArray.forEach(function (input) {
    input.addEventListener('input', function() {
      checkInputValidity(input);
    });
  });
};

enableAddFormValidation();
