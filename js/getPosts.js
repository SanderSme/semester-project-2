import { GET_POSTS_API_URL } from './settings/api';

const postsContainer = document.querySelector('#postsContainer');
const NoPostsMessage = document.querySelector('#NoPostsMessage');
const getPostsErrorMessage = document.querySelector('#getPostsErrorMessage');

let GET_POSTS_URL = `${GET_POSTS_API_URL}?sort=created&sortOrder=desc&_bids=true`;

let data = [];

const newBtn = document.querySelector('#newBtn');
const oldBtn = document.querySelector('#oldBtn');

const searchBar = document.querySelector('#searchBar');

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPosts = data.filter((post) => {
    const postTags = post.tags;
    return post.title.toLowerCase().includes(searchString) || postTags.toString().includes(searchString);
  });
  displayPosts(filteredPosts);
});

oldBtn.addEventListener('click', () => {
  GET_POSTS_URL = `${GET_POSTS_API_URL}?sort=created&sortOrder=asc&_bids=true`;
  oldBtn.classList.remove('opacity-30');
  oldBtn.classList.remove('bg-stone-700');
  oldBtn.classList.add('bg-stone-900');
  newBtn.classList.remove('bg-stone-900');
  newBtn.classList.add('opacity-30');
  newBtn.classList.add('bg-stone-700');
  getPosts().then(() => {
    displayPosts(data);
  });
});
newBtn.addEventListener('click', () => {
  GET_POSTS_URL = `${GET_POSTS_API_URL}?sort=created&sortOrder=desc&_bids=true`;
  newBtn.classList.remove('opacity-30');
  newBtn.classList.remove('bg-stone-700');
  newBtn.classList.add('bg-stone-900');
  oldBtn.classList.remove('bg-stone-900');
  oldBtn.classList.add('opacity-30');
  oldBtn.classList.add('bg-stone-700');
  getPosts().then(() => {
    displayPosts(data);
  });
});

async function getPosts() {
  const response = await fetch(GET_POSTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    data = await response.json();
    displayPosts(data);
  } else {
    const err = await response.json();
    const message = `${err.errors[0].message}`;
    getPostsErrorMessage.classList.remove('hidden');
    getPostsErrorMessage.innerHTML = message;
  }
}

const displayPosts = (data) => {
  postsContainer.innerHTML = '';
  if (!data.length) {
    NoPostsMessage.classList.remove('hidden');
  } else {
    NoPostsMessage.classList.add('hidden');
    const listOfPosts = data
      .map((post) => {
        let postTitle = post.title;
        if (!post.title) {
          postTitle = 'No Title';
        }
        let postMedia = `<div class="w-48 h-48 lg:w-56 rounded-l-xl md:rounded-t-xl md:rounded-bl-none bg-[#001321]"><img src="${post.media[0]}" class="h-full w-full object-cover rounded-l-xl md:rounded-bl-none md:rounded-t-xl"/></div>`;
        if (!post.media[0]) {
          postMedia = `<div class="bg-[url('./img/stock-img.svg')] w-48 lg:w-56 min-h-[192px] bg-center bg-no-repeat rounded-l-xl md:rounded-t-xl md:rounded-bl-none bg-[#001321]"></div>`;
        }
        let postBids = post.bids;
        postBids.sort(function (x, y) {
          return y.amount - x.amount;
        });

        let standingBid = 0;
        if (postBids[0]) {
          standingBid = postBids[0].amount;
        }
        const postID = post.id;
        return `<li class="mt-12 rounded-xl shadow shadow-black bg-[#001321] w-96 max-w-[90%] md:w-48 lg:w-56 h-fit mx-auto">
        <div class="flex md:flex-col justify-center">
            ${postMedia}
            <div class="text-white bg-[#001321] rounded-r-xl md:rounded-b-xl md:rounded-tr-none w-48 lg:w-56 min-h-[160px] flex flex-col pl-2 pr-2 pb-4">
                <p class="text-lg py-2 mx-auto max-w-[170px] xl:max-w-[200px] break-words">${postTitle}</p>
                <p class="text-sm mx-auto mt-auto mb-1">Standing bid: ${standingBid} c</p>
                <a href="./details.html?post_id=${postID}" class="w-2/3 mx-auto text-center py-2 px-8 bg-sky-900 rounded-lg mt-auto">Details</a></div>
        </div>
    </li>`;
      })
      .join('');
    postsContainer.insertAdjacentHTML('beforeend', listOfPosts);
  }
};

getPosts().then(() => {
  displayPosts(data);
});
