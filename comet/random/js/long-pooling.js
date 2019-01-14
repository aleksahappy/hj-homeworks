'use strict';

const sectionLpl = document.querySelector('section.long-pooling');
const cardsLpl = sectionLpl.getElementsByTagName('div');

sendRequestLpl();

function sendRequestLpl() {
  const longPooling = new XMLHttpRequest();
  longPooling.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  longPooling.addEventListener('load', showCardLpl);
  longPooling.addEventListener('error', event => {
    console.error(`Ошибка ${event.target.status}`);
    sendRequestLpl();
  });
  longPooling.send();
}

function showCardLpl() {
  if (event.target.status >= 200 && event.target.status < 300) {
    const data = event.target.responseText.trim();
    if (data >= 1 && data <= 10) {
      for (let card of cardsLpl) {
        card.textContent === data ? card.classList.add('flip-it') : card.classList.remove('flip-it');
      }
    }
  } else {
    console.error(`Ошибка ${event.target.status}: ${event.target.statusText}`);
  }

  sendRequestLpl();
}
