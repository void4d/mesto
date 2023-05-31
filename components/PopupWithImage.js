import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._cardCaption = this._popup.querySelector(".popup__caption");
    this._cardPhoto = this._popup.querySelector(".popup__photo");
  }

  open(name, link) {
    super.open();
    this._cardCaption.textContent = name;
    this._cardPhoto.src = link;
    this._cardPhoto.alt = name;
  }
}
