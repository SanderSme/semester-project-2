import { getUserName, getUserAvatar, getUserCredits } from '../utils/storage';

function createHeader() {
  const headerUserInfo = document.querySelector('#headerUserInfo');
  const navLinksMobile = document.querySelector('#navLinksMobile');
  if (headerUserInfo) {
    const userName = getUserName();
    let avatar = getUserAvatar();
    let userAvatar = `<img src="${avatar}" alt="profile-pic" class="h-full w-full rounded-full" />`;
    if (!avatar) {
      userAvatar = `<img src="/img/userimg.svg" alt="profile-pic" class="h-full w-full object-cover" />`;
    }
    const userCredits = getUserCredits();
    let userInfoContent;
    let dropdownMenu;
    userInfoContent = `<a href="login.html" class="text-lg hover:underline text-white">
        Log In
      </a>`;
    dropdownMenu = `<ul class="w-11/12 mx-auto p-6">
      <li class="my-6 text-xl hover:underline"><a href="./index.html">Home</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./profile.html">Profile</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./list-item.html">List Item</a></li>
    </ul>`;
    if (userName) {
      userInfoContent = `<a href="profile.html" class="h-10 w-10">
        ${userAvatar}
      </a>
      <div class="flex flex-col items-center lg:ml-2">
        <p class="text-white">${userCredits} c</p>
        <button type="button" class="text-white mr-2 hidden lg:block hover:underline logOutBtn">Log out</button>
      </div>`;
      dropdownMenu = `<ul class="w-11/12 mx-auto p-6">
      <li class="my-6 text-xl hover:underline"><a href="./index.html">Home</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./profile.html">Profile</a></li>
      <li class="my-6 text-xl hover:underline"><a href="./list-item.html">List Item</a></li>
      <li class="my-6 text-xl"><button type="button" class="hover:underline logOutBtn">Log Out</button></li>
    </ul>`;
    }
    headerUserInfo.innerHTML = `${userInfoContent}`;
    navLinksMobile.innerHTML = `${dropdownMenu}`;
  }
}

export default createHeader;
