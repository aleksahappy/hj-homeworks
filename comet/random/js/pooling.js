'use strict';

const sectionPl = document.querySelector('section.pooling');
const cardsPl = sectionPl.getElementsByTagName('div');

setInterval(sendRequestPl, 5000);

function sendRequestPl(event) {
  const pooling = new XMLHttpRequest();
  pooling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  pooling.addEventListener('load', showCardPl);
  pooling.addEventListener('error', event => console.error(`Ошибка ${event.target.status}`));
  pooling.send();
}

function showCardPl(event) {
  if (event.target.status == 200) {
    const data = event.target.responseText.trim();
    if (data >= 1 && data <= 10) {
      for (let card of cardsPl) {
        card.textContent === data ? card.classList.add('flip-it') : card.classList.remove('flip-it');
      }
    }
  } else {
    console.error(`Ошибка ${event.target.status}: ${event.target.statusText}`);
  }
}
