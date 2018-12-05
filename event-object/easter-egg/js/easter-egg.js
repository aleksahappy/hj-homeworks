'use strict';

const navBar = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
const secretCode = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ';
let inputCode = [];

function showNavBar(event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    navBar.classList.toggle('visible');
  }
}

function showSecret(event) {
  inputCode.push(event.code);
  const joinCode = inputCode.join('');

  if (secretCode !== joinCode) {
    if (!secretCode.includes(joinCode)) {
      inputCode = [];
    }
  } else {
    secret.classList.add('visible');
  }
}

document.addEventListener('keydown', showNavBar);
document.addEventListener('keydown', showSecret);
