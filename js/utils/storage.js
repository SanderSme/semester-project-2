const tokenKey = 'token';
const userKey = 'user';

function saveUser(user) {
  saveToLocalStorage(userKey, user);
}

function saveToken(token) {
  saveToLocalStorage(tokenKey, token);
}

function getToken() {
  const value = localStorage.getItem(tokenKey);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}

function getUserName() {
  const user = getFromLocalStorage(userKey);
  if (userKey) {
    return user.name;
  } else {
    return null;
  }
}

function getUserAvatar() {
  const user = getFromLocalStorage(userKey);
  if (userKey) {
    return user.avatar;
  } else {
    return null;
  }
}

function getUserEmail() {
  const user = getFromLocalStorage(userKey);
  if (userKey) {
    return user.email;
  } else {
    return null;
  }
}

function getUserCredits() {
  const user = getFromLocalStorage(userKey);
  if (userKey) {
    return user.credits;
  } else {
    return null;
  }
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return [];
  }
}

const accessToken = getToken();

function updateLocalStorrage(url) {
  async function getUserData() {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const userToSave = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        credits: data.credits,
      };
      saveUser(userToSave);
      location.reload();
    } else {
      console.log('hei');
    }
  }
  getUserData();
}

function clearStorage() {
  localStorage.clear();
}

export {
  getUserName,
  getToken,
  saveToken,
  saveUser,
  clearStorage,
  getUserAvatar,
  getUserCredits,
  getUserEmail,
  updateLocalStorrage,
};
