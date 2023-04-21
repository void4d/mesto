// Валидация формы

function setInputValidState(input, errorMessage) {
  saveButton.classList.remove('popup__save-button_disabled');
  saveButton.removeAttribute('disabled', true);
  input.classList.remove('popup__input_invalid');
  errorMessage.textContent = '';
};

function setInputInvalidState(input, errorMessage) {
  saveButton.classList.add('popup__save-button_disabled');
  saveButton.setAttribute('disabled', true);
  input.classList.add('popup__input_invalid');
  console.log(errorMessage);
  errorMessage.textContent = input.validationMessage;
};

function checkInputValidity(input) {
  const errorMessage = popupContainer.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    setInputValidState(input, errorMessage);
  } else {
    setInputInvalidState(input, errorMessage);
  }
};

function enableEditFormValidation() {
  const EditForm = document.querySelector('#editform');
  const EditFormInputs = EditForm.querySelectorAll('.popup__input')
  const EditFormInputsArray = Array.from(EditFormInputs);

  EditFormInputsArray.forEach(function (input) {
    input.addEventListener('input', function() {
      checkInputValidity(input);
    });
  });
};

enableEditFormValidation();

function enableAddFormValidation() {
  const AddForm = document.querySelector('#addform');
  const AddFormInputs = AddForm.querySelectorAll('.popup__input');
  const AddFormInputsArray = Array.from(AddFormInputs);

  AddFormInputsArray.forEach(function (input) {
    input.addEventListener('input', function() {
      checkInputValidity(input);
    });
  });
};

enableAddFormValidation();
