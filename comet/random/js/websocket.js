'use strict';

const sectionWS = document.querySelector('section.websocket');
const cardsWS = sectionWS.getElementsByTagName('div');

const webSocket = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
webSocket.addEventListener('message', showCardWS);
webSocket.addEventListener('error', event => console.error(`Произошла ошибка: ${event.data}`));
webSocket.addEventListener('close', event => {
  if (event.code !== 1000) {
    console.error(event.code);
  }
});

function showCardWS(event) {
  const data = event.data.trim();
  if (data >= 1 && data <= 10) {
    for (let card of cardsWS) {
      card.textContent === data ? card.classList.add('flip-it') : card.classList.remove('flip-it');
    }
  }
}
