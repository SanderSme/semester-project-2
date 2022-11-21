const hamburgerMeny = document.querySelector('#hamburgerMenu');
const navLinksMobile = document.querySelector('#navLinksMobile');

hamburgerMeny.addEventListener('click', () => {
  navLinksMobile.classList.toggle('hidden');
  hamburgerMeny.classList.toggle('fa-bars');
  hamburgerMeny.classList.toggle('fa-times');
});

const searchBtn = document.querySelector('#searchBtn');
const searchBar = document.querySelector('#searchBar');

searchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('opacity-0');
});
