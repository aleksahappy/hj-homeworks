'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'),
chat = document.querySelector('.chat'),
chatStatus = chat.querySelector('.chat-status'),
formSendMessage = chat.querySelector('.message-box'),
messageField = formSendMessage.querySelector('.message-input'),
btnSendMessage = formSendMessage.querySelector('.message-submit'),
messageContent = chat.querySelector('.messages-content'),
templateLoadingMessage = chat.querySelector('.message.loading'),
templateMessage = chat.querySelector('[class="message"]'),
templatePersonalMessage = chat.querySelector('.message.message-personal'),
templateStatusMessage = chat.querySelector('.message.message-status');

messageField.setAttribute('autofocus', '');
messageContent.setAttribute('style', 'overflow: auto;');

connection.addEventListener('open', startChat);
connection.addEventListener('message', uploadMessage);
formSendMessage.addEventListener('submit', sendMessage);
connection.addEventListener('close', closeChat);

function startChat(event) {
  chatStatus.textContent = chatStatus.dataset.online;
  btnSendMessage.removeAttribute('disabled');
  
  const statusMessage = templateStatusMessage.cloneNode(true);
  statusMessage.querySelector('.message-text').textContent = 'Пользователь появился в сети';
  messageContent.appendChild(statusMessage);
}

function uploadMessage(event) {
  const loadingMessage = templateLoadingMessage.cloneNode(true);
  const message = templateMessage.cloneNode(true);
  
  if (event.data === '...') {
    messageContent.appendChild(loadingMessage);
  } else {
    if (messageContent.lastChild.classList.contains('loading')){
      messageContent.removeChild(loadingMessage);
    }
    addMessage(message, event.data);
  }
}

function addMessage(message, text) {
  message.querySelector('.message-text').textContent = text;

  const time = new Date();
  const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  message.querySelector('.timestamp').textContent = `${hour}:${minute}`;

  messageContent.appendChild(message);
  messageContent.scrollTop = messageContent.scrollHeight;
}

function sendMessage(event) {
  event.preventDefault();
  connection.send(messageField.value);

  const personalMessage = templatePersonalMessage.cloneNode(true);
  addMessage(personalMessage, messageField.value);
  messageField.value = '';
  messageField.focus();
}

function closeChat() {
  chatStatus.textContent = chatStatus.dataset.offline;
  btnSendMessage.setAttribute('disabled', '');
  
  const statusMessage = templateStatusMessage.cloneNode(true);
  messageContent.appendChild(statusMessage);
  statusMessage.querySelector('.message-text').textContent = 'Пользователь не в сети';
}
