import { getToken } from './utils/storage';
import { GET_POSTS_API_URL } from './settings/api';
import { splitIntoArray } from './utils/countDown';

const params = window.location.search;
const searchParams = new URLSearchParams(params);
const postID = searchParams.get('post_id');
const accessToken = getToken();
const countDownContainer = document.querySelector("#countDown")

const singlePostDetails = document.querySelector('#singlePostDetails');

const SINGLE_POST_API_URL = `${GET_POSTS_API_URL}/${postID}?_bids=true&_seller=true`;

async function getPostByID() {
  const response = await fetch(SINGLE_POST_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application.json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
  const postTitle = data.title;
  const postBody = data.description;
  const postAuthor = data.seller.name;
  const postTags = data.tags;
  let postMedia = `<img
    src="${data.media[0]}"
    alt="${postTitle}"
    class="mt-8 md:mt-0 rounded-xl w-3/4 mx-auto md:w-1/2 md:h-full md:max-h-96 md:max-w-sm lg:max-w-none lg:max-h-screen"
  />`;
  if (!data.media[0]) {
    postMedia = `<img
    src="./img/stock-img.svg"
    alt="${postTitle}"
    class="mt-8 md:mt-0 rounded-xl w-3/4 mx-auto md:w-1/2 md:h-full md:max-h-96 md:max-w-sm lg:max-w-none lg:max-h-screen"
  />`;
  }
  function displayTags() {
    let listOfTags = ``;
    for (let i = 0; i < postTags.length; i++) {
      if (postTags[i]) {
        listOfTags += `#${postTags[i]} `;
      }
    }
    return listOfTags;
  }
  const endsAt = new Date(data.endsAt)
  console.log(endsAt);
  const countDown = new Date(`${endsAt}`).getTime();
  console.log(countDown);
  let now = new Date().getTime();
  console.log(now);
  let timeleft = countDown - now;
  let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const daysSplit = splitIntoArray(days);
  const hoursSplit = splitIntoArray(hours);
  const minutesSplit = splitIntoArray(minutes);
  singlePostDetails.innerHTML = `<div class="text-white flex flex-col md:w-1/2 md:ml-8">
    <h1 class="text-3xl lg:text-5xl mx-auto">${postTitle}</h1>
    <div class="flex w-48 lg:w-72 justify-between py-2 px-4 bg-sky-900 rounded-xl mt-4 mx-auto">
      <p>Standing bid:</p>
      <p>34$</p>
    </div>
    <div class="flex w-48 lg:w-96 lg:mx-auto md:justify-start mt-4">
      <p class="mr-2 font-semibold">Sold by:</p>
      <p>${postAuthor}</p>
    </div>
    <p class="mt-4 lg:w-96 lg:mx-auto">
      ${postBody}
    </p>
    <div class="flex lg:w-96 lg:mx-auto justify-start mt-4">
      <p class="mr-4 font-semibold">Tags:</p>
      <p>${displayTags()}</p>
      </div>
    <p class="mt-8 mb-4 text-xl lg:w-72 lg:mx-auto">Auction ends in:</p>
    <div class="flex mx-auto gap-5 text-stone-400" id="countDown">
      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md">${daysSplit[0]}</p>
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md">${daysSplit[1]}</p>
        </div>
        <p>Days</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md">${hoursSplit[0]}</p>
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md">${hoursSplit[1]}</p>
        </div>
        <p>Hours</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md">${minutesSplit[0]}</p>
          <p class="px-3 py-1 bg-stone-800 text-lg rounded-md">${minutesSplit[1]}</p>
        </div>
        <p>Minutes</p>
      </div>
    </div>
    <button
      type="button"
      class="flex items-center w-48 lg:w-72 mx-auto mt-8 bg-green-800 hover:bg-green-900 p-2 rounded-xl"
    >
      <input type="number" value="35" class="text-black p-1 w-12 rounded-md" />
      <p class="px-8 lg:px-20">Place bid</p>
    </button>
  </div>
  ${postMedia}`;
}

getPostByID();
