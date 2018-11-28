'use strict';

const slider = document.getElementById('slider');

const gallery = [
  'i/airmax-jump.png',
  'i/airmax-on-foot.png',
  'i/airmax-playground.png',
  'i/airmax-top-view.png',
  'i/airmax.png'
];

let index = 0;
slider.src = gallery[index];

setInterval(() => {
  if (index === gallery.length - 1) {
    index = 0;
  } else {
    index++;
  }
  slider.src = gallery[index];
}, 5000);
