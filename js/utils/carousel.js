function carouselFunction() {
  const leftBtn = document.querySelector('#leftBtn');
  const rightBtn = document.querySelector('#rightBtn');

  const slides = document.querySelectorAll('.slide');
  const carouselCounter = document.querySelector("#carouselCounter")


  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  let currentSlide = 0;

  let maxSlide = slides.length - 1;
  carouselCounter.innerHTML = `1/${maxSlide + 1}`

  rightBtn.addEventListener('click', function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    carouselCounter.innerHTML = `${currentSlide + 1}/${maxSlide + 1}`

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
  });

  leftBtn.addEventListener('click', function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    carouselCounter.innerHTML = `${currentSlide + 1}/${maxSlide + 1}`

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
  });
}


export {carouselFunction}
