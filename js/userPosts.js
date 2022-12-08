import {
  PROFILE_API_URL,
  USER_POSTS_API_URL,
  USER_BIDS_API_URL,
  CHANGE_AVATAR_URL,
  GET_POSTS_API_URL,
} from './settings/api';
import { getToken, updateLocalStorrage } from './utils/storage';
import { isValidUrl } from './utils/validation';

const accessToken = getToken();

if (!accessToken) {
  location.href = '../login.html';
}

const profileInfoContainer = document.querySelector('#profileInfoContainer');
const profileContainer = document.querySelector('#profile-container');
const changeAvatarForm = document.querySelector('#changeAvatarForm');
const avatarInput = document.querySelector('#avatarInput');
const generalErrorMessage = document.querySelector('#generalErrorMessage');

const userListingsContainer = document.querySelector('#userListingsContainer');
const userBidsContainer = document.querySelector('#userBidsContainer');

const noListingsMessage = document.querySelector('#noListingsMessage');

const deletePopup = document.querySelector('#deletePopup');
const deleteBtn = document.querySelector('#deleteBtn');
const stopDeleteBtn = document.querySelector('#stopDeleteBtn');

const editPostForm = document.querySelector('#editPostForm');
const editPostMediaInputs = document.querySelectorAll('.editPostMedia');
const stopEditPostBtn = document.querySelector('#stopEditPostBtn');

changeAvatarForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isAvatarValid = false;
  isAvatarValid = isValidUrl(avatarInput.value);
  if (isAvatarValid) {
    avatarErrorMessage.classList.add('hidden');
    isAvatarValid = true;
  } else {
    avatarErrorMessage.classList.remove('hidden');
  }
  if (isAvatarValid) {
    const avatarData = {
      avatar: avatarInput.value,
    };
    (async function changeAvatar() {
      const response = await fetch(CHANGE_AVATAR_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(avatarData),
      });
      if (response.ok) {
        updateLocalStorrage(PROFILE_API_URL);
      } else {
        const error = await response.json();
        const errorMessage = error.errors[0].message;
        throw new Error(errorMessage);
      }
    })().catch((errorMessage) => {
      generalErrorMessage.innerHTML = `${errorMessage}`;
    });
  }
});

async function displayProfileInfo() {
  const response = await fetch(PROFILE_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    let profileAvatar = data.avatar;
    if (!data.avatar) {
      profileAvatar = '/img/userimg.svg';
    }
    const profileName = data.name;
    const profileEmail = data.email;
    const profileCredits = data.credits;
    profileInfoContainer.innerHTML = `<div class="flex flex-col">
        <div class="w-52 h-52">
        <img src="${profileAvatar}" alt="profile-pic" class="rounded-full h-full w-full object-cover" />
      </div>
        <button type="button" id="changeAvatarBtn" class="text-center mt-2 hover:underline">Change Avatar</button>
      </div>
      <div class="text-xl flex flex-col gap-4">
        <p>${profileName}</p>
        <p class="underline">${profileEmail}</p>
        <div class="flex gap-2">
          <p>Credits:</p>
          <p>${profileCredits} c</p>
        </div>
      </div>`;
  }
}

async function displayUserListings() {
  const response = await fetch(USER_POSTS_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (!data.length) {
      noListingsMessage.classList.remove('hidden');
    } else {
      noListingsMessage.classList.add('hidden');
      for (let i = 0; i < data.length; i++) {
        let postTitle = data[i].title;
        if (!data[i].title) {
          postTitle = 'No Title';
        }
        let postMedia = `<div class="w-48 h-48 lg:w-56 rounded-l-xl md:rounded-t-xl md:rounded-bl-none bg-[#001321]"><img src="${data[i].media[0]}" class="h-full w-full object-cover rounded-l-xl md:rounded-bl-none md:rounded-t-xl"/></div>`;
        if (!data[i].media[0]) {
          postMedia = `<div class="bg-[url('./img/stock-img.svg')] w-48 lg:w-56 min-h-[192px] bg-center bg-no-repeat rounded-l-xl md:rounded-t-xl md:rounded-bl-none bg-[#001321]"></div>`;
        }
        let postBids = data[i].bids;
        postBids.sort(function (x, y) {
          return y.amount - x.amount;
        });

        let standingBid = 0;
        if (postBids[0]) {
          standingBid = postBids[0].amount;
        }
        const postID = data[i].id;
        userListingsContainer.innerHTML += `<div
      class="min-w-[100vw] sm:min-w-[70vw] md:min-w-[40vw] lg:min-w-[30vw] xl:min-w-[20vw] flex justify-center z-40"
    >
      <div class="flex md:flex-col justify-center mt-12 md:max-w-[300px]">
        ${postMedia}
        <div
          class="relative w-48 lg:w-56 text-white bg-[#001321] flex flex-col items-center justify-around px-8 h-48 md:h-fit rounded-r-xl md:rounded-b-xl md:rounded-tr-none"
        >
          <p class="text-lg py-1">${postTitle}</p>
          <p class="text-sm md:mt-2">Standing bid: ${standingBid} c</p>
          <a href="./details.html?post_id=${postID}" class="place-self-center md:my-7 py-2 px-8 bg-sky-900 rounded-lg">Details</a>
          <button data-id="${postID}" class="edit-post-btn fa fa-edit absolute top-2 md:top-auto md:bottom-2 right-2 text-stone-400"></button>
          <button data-id="${postID}" class="delete-post-btn fa fa-trash absolute top-2 md:top-auto md:bottom-2 left-2 text-stone-400"></button>
        </div>
      </div>
    </div>`;
      }
    }
  }
}
displayUserListings().then(() => {
  const editPostBtns = document.getElementsByClassName('edit-post-btn');
  stopEditPostBtn.addEventListener('click', () => {
    editPostForm.classList.add('hidden');
    profileContainer.classList.remove('blur-sm');
  });

  const deletePostBtn = document.getElementsByClassName('delete-post-btn');
  stopDeleteBtn.addEventListener('click', () => {
    deletePopup.classList.add('hidden');
    profileContainer.classList.remove('blur-sm');
  });

  const deletePostErrorMessage = document.querySelector('#deletePostErrorMessage');

  const editTitle = document.querySelector('#editTitle');
  const editTitleErrorMessage = document.querySelector('#editTitleErrorMessage');

  const editDescription = document.querySelector('#editDescription');

  const editTags = document.querySelector('#editTags');

  const editImage = document.querySelector('#editImage');
  const editImage2 = document.querySelector('#editImage2');
  const editImage3 = document.querySelector('#editImage3');
  const editImageErrorMessage = document.querySelector('#editImageErrorMessage');
  const editImage2ErrorMessage = document.querySelector('#editImage2ErrorMessage');
  const editImage3ErrorMessage = document.querySelector('#editImage3ErrorMessage');

  const editListingErrorMessage = document.querySelector('#editListingErrorMessage');

  for (let i = 0; i < deletePostBtn.length; i++) {
    deletePostBtn[i].addEventListener('click', () => {
      const deletePostID = deletePostBtn[i].dataset.id;
      deletePopup.classList.remove('hidden');
      profileContainer.classList.add('blur-sm');
      deleteBtn.addEventListener('click', () => {
        (async function deletePost() {
          const response = await fetch(`${GET_POSTS_API_URL}/${deletePostID}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.ok) {
            location.reload();
          } else {
            const error = await response.json();
            const errorMessage = `${error.errors[0].message}`;
            throw new Error(errorMessage);
          }
        })().catch((errorMessage) => {
          deletePostErrorMessage.innerHTML = `${errorMessage}`;
        });
      });
    });
  }

  for (let i = 0; i < editPostBtns.length; i++) {
    editPostBtns[i].addEventListener('click', () => {
      const editPostID = editPostBtns[i].dataset.id;
      editPostForm.classList.remove('hidden');
      profileContainer.classList.add('blur-sm');
      editPostForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let isImageValid = false;
        isImageValid = isValidUrl(editImage.value) || editImage.value === '';
        if (isImageValid) {
          editImageErrorMessage.classList.add('hidden');
          isImageValid = true;
        } else {
          editImageErrorMessage.classList.remove('hidden');
        }
        let isImage2Valid = false;
        isImage2Valid = isValidUrl(editImage2.value) || editImage2.value === '';
        if (isImage2Valid) {
          editImage2ErrorMessage.classList.add('hidden');
          isImage2Valid = true;
        } else {
          editImage2ErrorMessage.classList.remove('hidden');
        }
        let isImage3Valid = false;
        isImage3Valid = isValidUrl(editImage3.value) || editImage3.value === '';
        if (isImage3Valid) {
          editImage3ErrorMessage.classList.add('hidden');
          isImage3Valid = true;
        } else {
          editImage3ErrorMessage.classList.remove('hidden');
        }
        let isTitle = false;
        if (editTitle.value.trim().length > 0) {
          editTitleErrorMessage.classList.add('hidden');
          isTitle = true;
        } else {
          editTitleErrorMessage.classList.remove('hidden');
        }
        let isEditFormValid = isImageValid && isTitle;
        if (isEditFormValid) {
          let tagsString = new String(editTags.value);
          let tagsArray = tagsString.split(' ');
          let editPostMedia = [];
          for (let i = 0; i < editPostMediaInputs.length; i++) {
            if (editPostMediaInputs[i].value) {
              editPostMedia.push(editPostMediaInputs[i].value);
            }
          }
          let editPostData = {
            title: editTitle.value,
            description: editDescription.value,
            tags: tagsArray,
            media: editPostMedia,
          };
          (async function editPost() {
            const response = await fetch(`${GET_POSTS_API_URL}/${editPostID}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(editPostData),
            });
            if (response.ok) {
              location.href = `/details.html?post_id=${editPostID}`;
            } else {
              const error = await response.json();
              const errorMessage = `${error.errors[0].message}`;
              throw new Error(errorMessage);
            }
          })().catch((errorMessage) => {
            editListingErrorMessage.innerHTML = `${errorMessage}`;
          });
        } else {
          editListingErrorMessage.innerHTML = 'An error accured. Pleace try again';
        }
      });
    });
  }
});

async function displayUserBids() {
  const response = await fetch(USER_BIDS_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (!data.length) {
      noBidsMessage.classList.remove('hidden');
    } else {
      noBidsMessage.classList.add('hidden');
      for (let i = 0; i < data.length; i++) {
        let postTitle = data[i].listing.title;
        if (!data[i].listing.title) {
          postTitle = 'No Title';
        }
        let postMedia = `<div class="w-48 h-48 lg:w-56 rounded-l-xl md:rounded-t-xl md:rounded-bl-none bg-[#001321]"><img src="${data[i].listing.media[0]}" class="h-full w-full object-cover rounded-l-xl md:rounded-bl-none md:rounded-t-xl"/></div>`;
        if (!data[i].listing.media[0]) {
          postMedia = `<div class="bg-[url('./img/stock-img.svg')] w-48 lg:w-56 min-h-[192px] bg-center bg-no-repeat rounded-l-xl md:rounded-t-xl md:rounded-bl-none bg-[#001321]"></div>`;
        }
        let postBids = data[i].amount;
        const postID = data[i].listing.id;
        userBidsContainer.innerHTML += `<div
        class="min-w-[100vw] sm:min-w-[70vw] md:min-w-[40vw] lg:min-w-[30vw] xl:min-w-[20vw] flex justify-center z-40"
      >
        <div class="flex md:flex-col justify-center mt-12 md:max-w-[300px]">
          ${postMedia}
          <div
            class="text-white bg-[#001321] flex flex-col items-center justify-around px-8 h-48 md:h-fit w-48 lg:w-56 rounded-r-xl md:rounded-b-xl md:rounded-tr-none"
          >
            <p class="text-lg py-1">${postTitle}</p>
            <p class="text-sm md:mt-2">Your bid: ${postBids} c</p>
            <a href="./details.html?post_id=${postID}" class="place-self-center md:my-7 py-2 px-8 bg-sky-900 rounded-lg">Details</a>
          </div>
        </div>
      </div>`;
      }
    }
  }
}
displayUserBids();

displayProfileInfo().then(() => {
  const changeAvatarBtn = document.querySelector('#changeAvatarBtn');
  const stopEditBtn = document.querySelector('#stopEditBtn');
  changeAvatarBtn.addEventListener('click', () => {
    changeAvatarForm.classList.remove('hidden');
    profileContainer.classList.add('blur-sm');
  });

  stopEditBtn.addEventListener('click', () => {
    changeAvatarForm.classList.add('hidden');
    profileContainer.classList.remove('blur-sm');
  });
});
