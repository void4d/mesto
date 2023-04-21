// Валидация форм

// Установка валидности формы
function setInputStateValid(input, submitButton, errorMessage) {
  enableButton(submitButton);
  input.classList.remove('popup__input_invalid');
  errorMessage.textContent = '';
};

// Установка невалидности формы
function setInputStateInvalid(input, submitButton, errorMessage) {
  disableButton(submitButton);
  input.classList.add('popup__input_invalid');
  errorMessage.textContent = input.validationMessage;
};

// Проверка формы на валидность
function checkInputValidity(input, submitButton, errorMessage) {
  if (input.validity.valid) {
    setInputStateValid(input, submitButton, errorMessage);
  } else {
    setInputStateInvalid(input, submitButton, errorMessage);
  };
};

// Функция включения кнопки
function enableButton(submitButton) {
  submitButton.classList.remove('popup__save-button_disabled');
  submitButton.removeAttribute('disabled', '');
};

// Функция отключения кнопки
function disableButton(submitButton) {
  submitButton.classList.add('popup__save-button_disabled');
  submitButton.setAttribute('disabled', '');
};

// Переключение кнопки в зависимости от правильности ввода
function toggleButtonValidity(form, submitButton) {
  console.log(submitButton);
  console.log(form);
  if (form.checkValidity()) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  };
};

// Функция валидации форм
function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  const formsArray = Array.from(forms);

  formsArray.forEach(function (form) {
    const inputs = form.querySelectorAll('.popup__input');
    const inputsArray = Array.from(inputs);
    const submitButton = form.querySelector('.popup__save-button');

    inputsArray.forEach(function (input) {
      input.addEventListener('input', function () {
        const errorMessage = form.querySelector(`#${input.id}-error`);
        checkInputValidity(input, submitButton, errorMessage);
        toggleButtonValidity(form, submitButton);
      });
    });
  });
};

enableValidation();
