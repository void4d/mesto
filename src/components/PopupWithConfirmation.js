import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirmation extends PopupWithForm {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(submit) {
    super.open();
    this._submitForm = submit;
    console.log(this._submitForm)
  }

  close() {
    super.close();
  }
}
