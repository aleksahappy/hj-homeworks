'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
const counter = document.querySelector('.counter');
const errors = document.querySelector('output.errors');

connection.addEventListener('message', updateCounter);
window.addEventListener('beforeunload', closeСonnection);

function updateCounter(event) {
  try {
    const data = JSON.parse(event.data);
    counter.textContent = data.connections;
    errors.textContent = data.errors;
  } catch(error) {
    console.error(error.message);
  }
}

function closeСonnection(event) {
  connection.close(1000);
}
