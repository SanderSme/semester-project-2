function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no)$/;
  return email.match(regEx) ? true : false;
}

function validatePassword(password, confirmPassword) {
  if (!password) {
    return false;
  }
  if (!confirmPassword) {
    return false;
  }
  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function validateUsername(userName) {
  const nameRegex = /^[a-zA-Z\_]+$/;
  return userName.match(nameRegex) ? true : false;
}

export { validateEmail, validatePassword, isValidUrl, validateUsername };
