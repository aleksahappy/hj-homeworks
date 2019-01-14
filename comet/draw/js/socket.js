'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

connection.addEventListener('open', () => {
  editor.addEventListener('update', showCurrentState);
});

function showCurrentState(event) {
  const canvas = event.canvas;
  canvas.toBlob(blob => connection.send(blob));
}
