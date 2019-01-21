'use strict';

const trashBin = document.getElementById('trash_bin');
let dragElement = null;
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', event => drag(event.pageX, event.pageY));
document.addEventListener('mouseup', drop);

document.addEventListener('touchstart', event => dragStart(event.touches[0]));
document.addEventListener('touchmove', event => drag(event.touches[0].pageX, event.touches[0].pageY));
document.addEventListener('touchend', event => drop(event.changedTouches[0]));

function dragStart(event) {
  if (event.target.classList.contains('logo')) {
    dragElement = event.target;
    console.log(dragElement);
    shiftX = event.pageX - event.target.getBoundingClientRect().left - window.pageXOffset;
    shiftY = event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset;
  }
}

const drag = throttle((x, y) => {
  if (dragElement) {
    x = x - shiftX;
    y = y - shiftY;
    dragElement.style.left = `${x}px`;
    dragElement.style.top = `${y}px`;
    dragElement.classList.add('moving');
    console.log(dragElement);
  }
});

function drop(event) {
  if (dragElement) {
    dragElement.style.visibility = 'hidden';
    const currentElemet = document.elementFromPoint(event.clientX, event.clientY);
    dragElement.style.visibility = 'visible';
    dragElement.classList.remove('moving'); 
    if (currentElemet === trashBin) {
      dragElement.style.display = 'none';
    }
    dragElement = null;
  }
}

function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
}
