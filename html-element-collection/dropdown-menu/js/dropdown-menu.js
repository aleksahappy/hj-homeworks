'use strict';

const wrapperDropdown = document.getElementsByClassName('wrapper-dropdown')[0];

wrapperDropdown.onclick = function () {
  this.classList.toggle('active');
}
