export default class FormValidator {
  constructor(config, formElement) {
    this._form = config.formSelector;
    this._input = config.inputSelector;
    this._submitButton = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;

    this._formElement = formElement;
  }
// Установка валидности формы
  _setInputStateValid = (input, errorMessage) => {
    input.classList.remove(this._inputError)
    errorMessage.textContent = '';
  }
// Установка невалидности формы
  _setInputStateInvalid = (input, errorMessage) => {
    input.classList.add(this._inputError)
    errorMessage.textContent = input.validationMessage;
  }
// Проверка формы на валидность
  _checkInputValidity(input, errorMessage)  {
    if (input.validity.valid) {
      this._setInputStateValid(input, errorMessage);
    } else {
      this._setInputStateInvalid(input, errorMessage);
    }
  }
// Функция включения кнопки
  _enableButton = (submitButton) => {
    submitButton.classList.remove(this._inactiveButton);
    submitButton.removeAttribute('disabled', '');
  }
// Функция отключения кнопки
  _disableButton = (submitButton) => {
    submitButton.classList.add(this._inactiveButton);
    submitButton.setAttribute('disabled', '');
  }
// Переключение кнопки в зависимости от правильности ввода
  _toggleButtonValidity = (form, submitButton) => {
    if (form.checkValidity()) {
      this._enableButton(submitButton);
    } else {
      this._disableButton(submitButton);
    }
  }
// Функция валидации форм
  enableValidation = () => {
    const form = this._formElement;
    const inputs = this._formElement.querySelectorAll(this._input);
    const inputsArray = Array.from(inputs);
    const submitButton = this._formElement.querySelector(this._submitButton)

    inputsArray.forEach((input) => {
      input.addEventListener('input', () => {
        const errorMessage = form.querySelector(`#${input.id}-error`);
        this._checkInputValidity(input, errorMessage);
        this._toggleButtonValidity(form, submitButton);
      })
    })
  }
}

