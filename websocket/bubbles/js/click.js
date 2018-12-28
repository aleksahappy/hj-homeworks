'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', () => {
  showBubbles(connection);
  window.addEventListener('click', showClick);
});

function showClick(event) {
  connection.send(JSON.stringify({x: event.clientX, y: event.clientY}));
}
