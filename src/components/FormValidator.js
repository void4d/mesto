export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;
    this._formElement = formElement;
    this._inputs = this._formElement.querySelectorAll(this._inputSelector);
    this._inputsArray = Array.from(this._inputs);
    this._submitButtonSelector = this._formElement.querySelector(this._submitButtonSelector);
  }
  // Установка валидности формы
  _setInputStateValid = (input, errorMessage) => {
    input.classList.remove(this._inputError);
    errorMessage.textContent = "";
  };
  // Установка невалидности формы
  _setInputStateInvalid = (input, errorMessage) => {
    input.classList.add(this._inputError);
    errorMessage.textContent = input.validationMessage;
  };
  // Проверка формы на валидность
  _checkInputValidity(input, errorMessage) {
    if (input.validity.valid) {
      this._setInputStateValid(input, errorMessage);
    } else {
      this._setInputStateInvalid(input, errorMessage);
    }
  }
  // Функция включения кнопки
  _enableButton = () => {
    this._submitButtonSelector.classList.remove(this._inactiveButton);
    this._submitButtonSelector.removeAttribute("disabled", "");
  };
  // Функция отключения кнопки
  _disableButton = () => {
    this._submitButtonSelector.classList.add(this._inactiveButton);
    this._submitButtonSelector.setAttribute("disabled", "");
  };
  // Переключение кнопки в зависимости от правильности ввода
  _toggleButtonValidity = () => {
    if (this._formElement.checkValidity()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  };

  resetValidation = () => {
    this._toggleButtonValidity();

    this._inputs.forEach((inputEl) => {
      const errorMessage = this._formElement.querySelector(
        `#${inputEl.id}-error`
      );
      this._setInputStateValid(inputEl, errorMessage);
    });
  };
  // Функция валидации форм
  enableValidation = () => {
    this._toggleButtonValidity(this._formElement, this._submitButtonSelector);

    this._inputsArray.forEach((input) => {
      input.addEventListener("input", () => {
        const errorMessage = this._formElement.querySelector(
          `#${input.id}-error`
        );
        this._checkInputValidity(input, errorMessage);
        this._toggleButtonValidity(this._formElement, this._submitButtonSelector);
      });
    });
  };
}
