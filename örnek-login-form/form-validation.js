// Input fields
const userName = document.getElementById('name');
const userMessage = document.getElementById('message');
const userEmail = document.getElementById('email');
const userCheckbox = document.getElementById('checkbox');
// Form
const form = document.getElementById('contact-us');
// Validation colors
const green = '#4CAF50';
const red = '#F44336';


// Handle form

if (form !== null) {

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (
      validateUserName() &&
      validateUserMessage() &&
      validateUserEmail() &&
      validateCheckbox()
    ) {
      this.submit();
    }
  });
}


// Validators
function validateUserName() {
  if (checkIfEmpty(userName)) return;
  if (!checkIfOnlyLetters(userName)) return;
  return true;
}

function validateUserMessage() {
  if (checkIfEmpty(userMessage)) return;
  if (!checkIfOnlyLetters(userMessage)) return;
  return true;
}

function validateUserEmail() {
  if (checkIfEmpty(userEmail)) return;
  if (!containsCharacters(userEmail)) return;
  return true;
}

function validateCheckbox() {
  return checkIfChecked(userCheckbox);
}


// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    setInvalid(field);
    return true;
  } 
    setValid(field);
    return false;
  
}

function isEmpty(value) {
  return value === '';
}

function checkIfChecked(field) {
  if (field.checked) {
    setValid(field.nextElementSibling);
    return true;
  } 
    setInvalid(field.nextElementSibling);
    return false;
  
}

function setValid(field) {
  field.classList.remove('border-danger');
}

function setInvalid(field) {
  field.classList.add('border-danger')
}

function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } 
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  
}

function containsCharacters(field) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return matchWithRegEx(regEx, field, 'Must be a valid email address');
}

function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } 
    setInvalid(field, message);
    return false;
  
}
