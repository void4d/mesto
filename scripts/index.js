// Поля имени и описания в профиле
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');

// Окно редактирования профиля
const popupProfileEdit = document.querySelector('.popup__type_profile-edit');
const popupFormEdit = popupProfileEdit.querySelector('.popup__form');
const nameInputEdit = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInputEdit = popupProfileEdit.querySelector('.popup__input_type_description');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');

// Открытие окна редактирования профиля
editButton.addEventListener('click', function () {
  popupProfileEdit.classList.add('popup_opened');
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
});

// Кнопка закрытия модального окна
closeButton.addEventListener('click', function () {
  popupProfileEdit.classList.remove('popup_opened');
})

// Сабмит окна редактирования профиля
popupFormEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInputEdit.value;
  jobProfile.textContent = jobInputEdit.value;
  popupProfileEdit.classList.remove('popup_opened');
})
