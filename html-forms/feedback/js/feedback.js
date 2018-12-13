'use strict';

const contentForm = document.getElementsByClassName('contentform')[0];
const inputForms = contentForm.querySelectorAll('[name]');
const btnSendMessage = contentForm.querySelector('.button-contact');
const messageForm = document.getElementById('output');
const btnChangeMessage = messageForm.querySelector('.button-contact');

for (const inputForm of inputForms) {
  inputForm.addEventListener('input', writeMessage);
}

btnSendMessage.addEventListener('click', sendMessage);
btnChangeMessage.addEventListener('click', changeMessage);

function writeMessage() {
  if (this.name === 'zip') {
    this.value = this.value.replace(/\D/, '');
  }

  const textOutput = document.getElementById(this.name);
  if (textOutput) {
    textOutput.value = this.value;
  }

  let countForms = 0;
  
  for (const inputForm of inputForms) {
    if (inputForm.value !== '') {
      countForms++;
    }
  }

  if (countForms === inputForms.length) {
    btnSendMessage.removeAttribute('disabled');
  } else {
    btnSendMessage.setAttribute('disabled', '');
  }
}

function sendMessage(event) {
  event.preventDefault();
  contentForm.classList.add('hidden');
  messageForm.classList.remove('hidden');
}

function changeMessage(event) {
  event.preventDefault();
  contentForm.classList.remove('hidden');
  messageForm.classList.add('hidden');
}
