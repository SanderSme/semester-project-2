const userListingsContainer = document.querySelector('#userListingsContainer');

userListingsContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  userListingsContainer.scrollLeft += event.deltaY;
});
