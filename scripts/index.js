const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__description');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = popupForm.querySelector('.popup__input_type_description');


editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

editButton.addEventListener('click', function () {
  popup.classList.remove('popup_closed');
});

closeButton.addEventListener('click', function () {
  popup.classList.add('popup_closed');
})

popupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popup.classList.add('popup_closed');
})
