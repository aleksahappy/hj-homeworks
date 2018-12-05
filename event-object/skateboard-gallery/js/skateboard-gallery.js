'use strict';

const photo = document.getElementsByClassName('gallery-view')[0];
const links = document.getElementsByTagName('a');

function showPhoto(event) {
  event.preventDefault();
  photo.src = this.href;

  for (const link of links) {
    link.classList.remove('gallery-current');
  }
  this.classList.add('gallery-current');
}

for (const link of links) {
  link.addEventListener('click', showPhoto)
}
