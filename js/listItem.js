import { CREATE_POST_API_URL } from './settings/api';
import { getToken } from './utils/storage';
import { isValidUrl } from './utils/validation';

const accessToken = getToken();
const listItemForm = document.querySelector('#listItemForm');

const image = document.querySelector('#image');
const image2 = document.querySelector('#image2');
const image3 = document.querySelector('#image3');
const imageErrorMessage = document.querySelector('#imageErrorMessage');
const image2ErrorMessage = document.querySelector('#image2ErrorMessage');
const image3ErrorMessage = document.querySelector('#image3ErrorMessage');
const postMediaInputs = document.querySelectorAll('.postMedia');

const title = document.querySelector('#title');
const titleErrorMessage = document.querySelector('#titleErrorMessage');

const description = document.querySelector('#description');

const tags = document.querySelector('#tags');

const auctionEnds = document.querySelector('#auctionEnds');
const auctionEndsError = document.querySelector('#auctionEndsError');

const listItemErrorMessage = document.querySelector('#listItemErrorMessage');
if (!accessToken) {
  location.href = '../login.html';
}

listItemForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isImageValid = false;
  isImageValid = isValidUrl(image.value) || image.value === '';
  if (isImageValid) {
    imageErrorMessage.classList.add('hidden');
  } else {
    imageErrorMessage.classList.remove('hidden');
  }
  let isImage2Valid = false;
  isImage2Valid = isValidUrl(image2.value) || image2.value === '';
  if (isImage2Valid) {
    image2ErrorMessage.classList.add('hidden');
  } else {
    image2ErrorMessage.classList.remove('hidden');
  }
  let isImage3Valid = false;
  isImage3Valid = isValidUrl(image3.value) || image3.value === '';
  if (isImage3Valid) {
    image3ErrorMessage.classList.add('hidden');
  } else {
    image3ErrorMessage.classList.remove('hidden');
  }
  let isTitle = false;
  if (title.value.trim().length > 0) {
    titleErrorMessage.classList.add('hidden');
    isTitle = true;
  } else {
    titleErrorMessage.classList.remove('hidden');
  }
  let isAuctionEnds = false;
  if (auctionEnds.value) {
    auctionEndsError.classList.add('hidden');
    isAuctionEnds = true;
  } else {
    auctionEndsError.classList.remove('hidden');
  }
  let formIsValid = isImageValid && isImage2Valid && isImage3Valid && isTitle && isAuctionEnds;
  if (formIsValid) {
    let tagsString = new String(tags.value);
    let tagsArray = tagsString.split(' ');
    const date = new Date(auctionEnds.value);
    let postMedia = [];
    for (let i = 0; i < postMediaInputs.length; i++) {
      if (postMediaInputs[i].value) {
        postMedia.push(postMediaInputs[i].value);
      }
    }
    let postData = {
      title: title.value,
      description: description.value,
      tags: tagsArray,
      media: postMedia,
      endsAt: date,
    };
    console.log(postData);
    (async function createListing() {
      const response = await fetch(CREATE_POST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        location.href = '../index.html';
      } else {
        const error = await response.json();
        const errorMessage = `${error.errors[0].message}`;
        throw new Error(errorMessage);
      }
    })().catch((errorMessage) => {
      listItemErrorMessage.innerHTML = errorMessage;
    });
  }
});
