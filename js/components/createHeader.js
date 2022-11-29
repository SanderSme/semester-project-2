import { getUserName, getUserAvatar, getUserCredits } from '../utils/storage';

function createHeader() {
  const headerUserInfo = document.querySelector('#headerUserInfo');
  const navLinksMobile = document.querySelector('#navLinksMobile');
  if (headerUserInfo) {
    const userName = getUserName();
    let avatar = getUserAvatar();
    let userAvatar = `<img src="${avatar}" alt="profile-pic" class="h-10 rounded-full" />`;
    if (!avatar) {
      userAvatar = `<img src="/img/userimg.svg" alt="profile-pic" class="h-10" />`;
    }
    const userCredits = getUserCredits();
    let userInfoContent;
    let dropdownMenu;
    userInfoContent = `<a href="login.html" class="text-lg hover:underline text-white">
        Log In
      </a>`;
    dropdownMenu = `<ul class="w-11/12 mx-auto p-6">
      <li class="flex flex-row">
        <input type="search" placeholder="Search..." class="rounded w-full p-1 text-black" /><button
          type="button"
          class="bg-sky-900 px-2 py-1 rounded-lg"
        >
          Search
        </button>
      </li>
      <li class="my-6 text-xl hover:underline"><a href="./index.html">Home</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./profile.html">Profile</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./list-item.html">Products</a></li>
    </ul>`;
    if (userName) {
      userInfoContent = `<a href="profile.html">
        ${userAvatar}
      </a>
      <div class="flex flex-col items-center lg:ml-2">
        <p class="text-white">${userCredits} c</p>
        <button type="button" class="text-white mr-2 hidden lg:block hover:underline logOutBtn">Log out</button>
      </div>`;
      dropdownMenu = `<ul class="w-11/12 mx-auto p-6">
      <li class="flex flex-row">
        <input type="search" placeholder="Search..." class="rounded w-full p-1 text-black" /><button
          type="button"
          class="bg-sky-900 px-2 py-1 rounded-lg"
        >
          Search
        </button>
      </li>
      <li class="my-6 text-xl hover:underline"><a href="./index.html">Home</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./profile.html">Profile</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./list-item.html">Products</a></li>
      <li class="my-6 text-xl"><button type="button" class="hover:underline logOutBtn">Log Out</button></li>
    </ul>`;
    }
    headerUserInfo.innerHTML = `${userInfoContent}`;
    navLinksMobile.innerHTML = `${dropdownMenu}`;
  }
}

export default createHeader;
