const myListingsContainer = document.querySelector('#myListingsContainer');

myListingsContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  myListingsContainer.scrollLeft += event.deltaY;
});
