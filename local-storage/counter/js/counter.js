'use strict';

const textCounter = document.getElementById('counter');
const btnIncrement = document.getElementById('increment');
const btnDecrement = document.getElementById('decrement');
const btnReset = document.getElementById('reset');

btnIncrement.addEventListener('click', increaseCounter);
btnDecrement.addEventListener('click', decreaseCounter);
btnReset.addEventListener('click', resetCounter);

if (!localStorage.counter) {
  localStorage.counter = '0';
}
textCounter.textContent = localStorage.counter;

function increaseCounter() {
  textCounter.textContent = ++localStorage.counter;
}

function decreaseCounter() {
  if (localStorage.counter > 0) {
    textCounter.textContent = --localStorage.counter;
  }
}

function resetCounter() {
  localStorage.counter = '0';
  textCounter.textContent = localStorage.counter;
}
