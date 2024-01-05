const express = require('express');
const app = express();
const mysql = require('mysql');
const { get } = require('../../routes/pages');

const form = get("login");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (
      validateEmail() &&
      validatePassword()
    ) 
    {
      this.submit();
    }
  
});
   
function validateEmail() {
    if (checkIfEmpty(email)) return;
    if (!checkIfOnlyLetters(email)) return;
    return true;
}
  
function validatePassword() {
    if (checkIfEmpty(password)) return;
    if (!checkIfOnlyLetters(password)) return;
    return true;
}

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


