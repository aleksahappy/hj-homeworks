'use strict';

const currentPhoto = document.getElementById('currentPhoto');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');

const gallery = [
  'i/breuer-building.jpg',
  'i/guggenheim-museum.jpg',
  'i/headquarters.jpg',
  'i/IAC.jpg',
  'i/new-museum.jpg'
];

let index = 0;
currentPhoto.src = gallery[index];

function getPrevPhoto () {
  if (index === 0) {
    index = gallery.length - 1;
  } else {
    index--;
  }
  currentPhoto.src = gallery[index];
}

function getNextPhoto () {
  if (index === gallery.length - 1) {
    index = 0;
  } else {
    index++;
  }
  currentPhoto.src = gallery[index];
}

prevPhoto.onclick = () => getPrevPhoto();
nextPhoto.onclick = () => getNextPhoto();
