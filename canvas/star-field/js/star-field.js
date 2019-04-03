'use strict';

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const starsColor = ['#ffffff', '#ffe9c4', '#d4fbff'];

canvas.addEventListener('click', drawStarField);
canvas.style.backgroundColor = '#000000';

function drawStarField() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const amountStars = randomIntegers(200, 400);

  for (let i = 0; i < amountStars; i++) {
    const x = randomIntegers(0, canvas.width);
    const y = randomIntegers(0, canvas.height);
    drawStar(x, y);
  }
}

function randomIntegers(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random(min, max) {
  return ((Math.random() * (max - min)) + min).toFixed(1);
}

function drawStar(x, y) {
  const radius = random(0, 1.1);

  ctx.beginPath();
  ctx.fillStyle = starsColor[randomIntegers(0, 2)];
  ctx.globalAlpha = random(0.8, 1);
  ctx.fillRect(x, y, radius, radius);
  ctx.closePath();
}
