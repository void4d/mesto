// Валидация форм

// Установка валидности формы
function setInputStateValid(config, input, errorMessage) {
  input.classList.remove(config.inputErrorClass);
  errorMessage.textContent = '';
};

// Установка невалидности формы
function setInputStateInvalid(config, input, errorMessage) {
  input.classList.add(config.inputErrorClass);
  errorMessage.textContent = input.validationMessage;
};

// Проверка формы на валидность
function checkInputValidity(config, input, errorMessage) {
  if (input.validity.valid) {
    setInputStateValid(config, input, errorMessage);
  } else {
    setInputStateInvalid(config, input, errorMessage);
  };
};

// Функция включения кнопки
function enableButton(config, submitButton) {
  submitButton.classList.remove(config.inactiveButtonClass);
  submitButton.removeAttribute('disabled', '');
};

// Функция отключения кнопки
function disableButton(config, submitButton) {
  console.log(config);
  console.log(submitButton);
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.setAttribute('disabled', '');
};

// Переключение кнопки в зависимости от правильности ввода
function toggleButtonValidity(config, form, submitButton) {
  if (form.checkValidity()) {
    enableButton(config, submitButton);
  } else {
    disableButton(config, submitButton);
  };
};

// Функция валидации форм
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  const formsArray = Array.from(forms);

  formsArray.forEach(function (form) {
    const inputs = form.querySelectorAll(config.inputSelector);
    const inputsArray = Array.from(inputs);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputsArray.forEach(function (input) {
      input.addEventListener('input', function () {
        const errorMessage = form.querySelector(`#${input.id}-error`);
        checkInputValidity(config, input, errorMessage);
        toggleButtonValidity(config, form, submitButton);
      });
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
});

