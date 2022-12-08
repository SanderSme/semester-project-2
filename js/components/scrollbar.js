const userListingsContainer = document.querySelector('#userListingsContainer');
const userBidsContainer = document.querySelector("#userBidsContainer")

userListingsContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  userListingsContainer.scrollLeft += event.deltaY;
});

userBidsContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  userBidsContainer.scrollLeft += event.deltaY;
});