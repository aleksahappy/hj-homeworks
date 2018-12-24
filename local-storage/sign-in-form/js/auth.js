'use strict';

const singInForm = document.querySelector('.sign-in-htm');
const singUpForm = document.querySelector('.sign-up-htm');
const singInUrl = 'https://neto-api.herokuapp.com/signin';
const singUpUrl = 'https://neto-api.herokuapp.com/signup';

singInForm.addEventListener('submit', sendForm);
singUpForm.addEventListener('submit', sendForm);

function sendForm(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }

  const typeForm = event.currentTarget.classList.contains('sign-in-htm') ? 'typeSingIn' : 'typeSingUp';
  const formUrl = typeForm === 'typeSingIn' ? singInUrl : singUpUrl;
  const output = event.currentTarget.querySelector('.error-message');

  const request = fetch(formUrl, {
    body: JSON.stringify(data),
    credentials: 'same-origin',
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    }
  });

  request
    .then(result => {
      if (200 <= result.status && result.status < 300) {
        return result;
      }
      throw new Error(response.statusText);
    })
    .then(result => result.json())
    .then(data => {
      const successfulResponse = typeForm === 'typeSingIn' ? `Пользователь ${data.name} успешно авторизован` : `Пользователь ${data.name} успешно зарегистрирован`;
      output.textContent = data.error ? data.message : successfulResponse;
    })
    .catch(error => console.log(error.message));
}
