import { SIGNUP_API_URL } from './settings/api';
import { validateEmail, validatePassword, isValidUrl, validateUsername } from './utils/validation';

const signUpForm = document.querySelector('#signUpForm');

const userName = document.querySelector('#username');
const userNameErrorMessage = document.querySelector('#usernameErrorMessage');
const usernameValidationMessage = document.querySelector('#usernameValidationMessage');

const email = document.querySelector('#email');
const emailErrorMessage = document.querySelector('#emailErrorMessage');
const emailRequiredMessage = document.querySelector('#emailRequiredMessage');

const password = document.querySelector('#password');
const passwordErrorMessage = document.querySelector('#passwordErrorMessage');

const confirmPassword = document.querySelector('#confirmPassword');
const confirmErrorMessage = document.querySelector('#confirmPasswordErrorMessage');

const avatar = document.querySelector('#avatar');
const avatarErrorMessage = document.querySelector('#avatarErrorMessage');

const signupErrorMessage = document.querySelector('#signupErrorMessage');

signUpForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isUserName = false;
  if (userName.value.trim().length > 0) {
    userNameErrorMessage.classList.add('hidden');
    isUserName = true;
  } else {
    userNameErrorMessage.classList.remove('hidden');
  }
  let isValidUserName = false;
  if (userName.value.trim().length && validateUsername(userName.value) === true) {
    usernameValidationMessage.classList.add('hidden');
    isValidUserName = true;
  } else {
    usernameValidationMessage.classList.remove('hidden');
  }
  let isEmail = false;
  if (email.value.trim().length > 0) {
    emailRequiredMessage.classList.add('hidden');
    isEmail = true;
  } else {
    emailRequiredMessage.classList.remove('hidden');
  }
  let isEmailValid = false;
  if (email.value.trim().length && validateEmail(email.value) === true) {
    emailErrorMessage.classList.add('hidden');
    isEmailValid = true;
  } else if (email.value.trim().length && validateEmail(email.value) !== true) {
    emailErrorMessage.classList.remove('hidden');
  }
  let isPassword = false;
  if (password.value.trim().length >= 8) {
    passwordErrorMessage.classList.add('hidden');
    isPassword = true;
  } else {
    passwordErrorMessage.classList.remove('hidden');
  }
  let isConfirmPasswordValid = false;
  isConfirmPasswordValid = validatePassword(password.value, confirmPassword.value);
  if (isConfirmPasswordValid) {
    confirmErrorMessage.classList.add('hidden');
    isConfirmPasswordValid = true;
  } else {
    confirmErrorMessage.classList.remove('hidden');
  }
  let isAvatarValid = false;
  isAvatarValid = isValidUrl(avatar.value) || avatar.value === '';
  if (isAvatarValid) {
    avatarErrorMessage.classList.add('hidden');
    isAvatarValid = true;
  } else {
    avatarErrorMessage.classList.remove('hidden');
  }
  let isFormValid =
    isUserName && isValidUserName && isEmail && isEmailValid && isPassword && isConfirmPasswordValid && isAvatarValid;
  if (isFormValid) {
    const userData = {
      name: userName.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    };
    (async function newUser() {
      const response = await fetch(`${SIGNUP_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        location.href = '../login.html';
      } else {
        const err = await response.json();
        const message = `${err.errors[0].message}`;
        throw new Error(message);
      }
    })().catch((err) => {
      signupErrorMessage.innerHTML = `${err}`;
    });
  } else {
    signupErrorMessage.innerHTML = 'Validation failed. Pleace try again';
  }
});
