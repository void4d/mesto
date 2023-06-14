import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._confirmButton = this._form.querySelector('.popup__save-button');
    this._handleDelete = handleDelete;
  }

  setEventListeners() {
    super.setEventListeners();
  }

  confirm(element) {
    this._confirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDelete(element._cardId, element._element);
    });
  }

  close() {
    super.close();
  }
}
