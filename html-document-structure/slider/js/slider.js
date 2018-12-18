'use strict';

const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(slider => updateSlider(slider));

function updateSlider(slider) {
  const sliderNav = slider.querySelector('.slider-nav');
  const slides = slider.querySelector('.slides');
  const prev = slider.querySelector('[data-action="prev"]');
  const next = slider.querySelector('[data-action="next"]');
  const first = slider.querySelector('[data-action="first"]');
  const last = slider.querySelector('[data-action="last"]');

  slides.firstElementChild.classList.add('slide-current');
  let currentSlide = slides.querySelector('.slide-current');
  updateControls();

  sliderNav.addEventListener('click', moveSlide);

  function moveSlide(event) {
    if (event.target.classList.contains('disabled')) {
      return;
    }
    currentSlide.classList.remove('slide-current');

    switch (event.target) {
      case prev:
        currentSlide = currentSlide.previousElementSibling;
        break;
      case next:
        currentSlide = currentSlide.nextElementSibling;
        break;
      case first:
        currentSlide = slides.firstElementChild;
        break;
      case last:
        currentSlide = slides.lastElementChild;
        break;
    }
    
    currentSlide.classList.add('slide-current');
    updateControls();
  }

  function updateControls() {
    prev.classList.toggle('disabled', !currentSlide.previousElementSibling);
    next.classList.toggle('disabled', !currentSlide.nextElementSibling);
    first.classList.toggle('disabled', !currentSlide.previousElementSibling);
    last.classList.toggle('disabled', !currentSlide.nextElementSibling);
  }
}
