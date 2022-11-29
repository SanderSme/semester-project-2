const hamburgerMeny = document.querySelector('#hamburgerMenu');
const navLinksMobile = document.querySelector('#navLinksMobile');
const body = document.querySelector('body');

hamburgerMeny.addEventListener('click', () => {
  navLinksMobile.classList.toggle('hidden');
  hamburgerMeny.classList.toggle('fa-bars');
  hamburgerMeny.classList.toggle('fa-times');
  body.classList.toggle('overflow-hidden');
});

// const searchBtn = document.querySelector('#searchBtn');
// const searchBar = document.querySelector('#searchBar');

// searchBtn.addEventListener('click', () => {
//   searchBar.classList.toggle('opacity-0');
// });
