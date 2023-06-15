import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  enableValidation,
  editButton,
  addButton,
  popupFormEdit,
  nameInputEdit,
  jobInputEdit,
  popupAddForm,
  cardsGrid,
  avatarEditButton,
  popupAvatarForm,
  deletionFormButton,
  editFormButton,
  addFormButton,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const popupWithEditForm = new PopupWithForm('.popup_type_profile-edit', submitProfile);
const popupWithAddForm = new PopupWithForm('.popup_type_add-card', submitCard);
const popupWithImage = new PopupWithImage('.popup_type_open-card');
const popupEditAvatar = new PopupWithForm('.popup_type_change-avatar', submitAvatar);
const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirm-deletion');
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();

const userInfo = new UserInfo({
  userNameElement: '.profile__name',
  aboutElement: '.profile__about',
  avatarElement: '.profile__avatar',
});

const cardsContainer = new Section(
  {
    renderer: (item) => {
      const newCard = createCard(item);
      cardsGrid.append(newCard);
    },
  },
  '.elements',
);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '8156abe8-8242-4bae-8403-684c2d885ae6',
  },
});

const profileValidation = new FormValidator(enableValidation, popupFormEdit);
const cardValidation = new FormValidator(enableValidation, popupAddForm);
const profileAvatarValidation = new FormValidator(enableValidation, popupAvatarForm);
profileValidation.enableValidation();
cardValidation.enableValidation();
profileAvatarValidation.enableValidation();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function renderLoading(button, string) {
  button.textContent = string;
}

// Сабмит окна редактирования профиля
function submitProfile(data) {
  const { name, about } = data;
  renderLoading(editFormButton, 'Сохранение...');
  api
    .setUserInfoApi(name, about)
    .then((res) => {
      popupWithEditForm.close();
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(editFormButton, 'Сохранить');
    });
}

// Сабмит окна редактирования аватарки
function submitAvatar(avatar) {
  api
    .changeAvatar(avatar.link)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupEditAvatar.close();
      profileAvatarValidation.resetValidation();
    })
    .catch((err) => console.log(err));
}

// Открытие окна редактирования профиля
editButton.addEventListener('click', function () {
  popupWithEditForm.open();
  const { name, about } = userInfo.getUserInfo();

  nameInputEdit.value = name;
  jobInputEdit.value = about;
  profileValidation.resetValidation();
});

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
  popupWithAddForm.open();
  cardValidation.resetValidation();
});

// Открытие окна редактирования аватарки
avatarEditButton.addEventListener('click', function () {
  popupEditAvatar.open();
  cardValidation.resetValidation();
});

function submitDeletion(cardId, card) {

  popupWithConfirmation.open(() => {
    renderLoading(deletionFormButton, 'Удаление...');
    api
      .deleteCardApi(cardId, card)
      .then(() => {
        card.remove();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(deletionFormButton, 'Да');
      });
  });
}

function handleDeleteIcon(cardId, button, userId) {
  if (cardId !== userId) {
    button.remove();
  }
}

function putLike(cardId) {
  api
    .putLikeApi(cardId)
    .then((data) => {
      console.log('лайк');
      this._likesCounter.textContent = data.likes.length;
      this._likeButton.classList.add('elements__like-button_active');
    })
    .catch((err) => console.log(err));
}

function deleteLike(cardId) {
  api
    .deleteLikeApi(cardId)
    .then((data) => {
      console.log('лайк снят');
      this._likesCounter.textContent = data.likes.length;
      this._likeButton.classList.remove('elements__like-button_active');
    })
    .catch((err) => console.log(err));
}

// Создание карточки
function createCard(item) {
  const card = new Card(
    item,
    '.card-template',
    handleCardClick,
    { handleDeleteIcon },
    { putLike },
    { deleteLike },
    submitDeletion,
    userInfo,
  );
  const cardElement = card.createCardElement();

  return cardElement;
}

// Сабмит добавления карточки
function submitCard(data) {
  const { name, link } = data;
  renderLoading(addFormButton, 'Добавление...');
  api
    .postCardApi(name, link)
    .then((res) => {
      cardsContainer.addItem(createCard(res));
      popupWithAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(addFormButton, 'Создать');
    });

  cardValidation.resetValidation();
}

Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
  .then(([profile, cards]) => {
    userInfo.setUserInfo(profile);
    userInfo.setUserAvatar(profile);
    cardsContainer.render(cards);
  })
  .catch((err) => console.log(err));
