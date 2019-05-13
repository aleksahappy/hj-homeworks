'use strict';

const xhr = new XMLHttpRequest();
const converterForm = document.getElementById('content');
const inputField = document.getElementById('source');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const conversionResult = document.getElementById('result');
const loader = document.getElementById('loader');

xhr.addEventListener('load', loadCurrency);
xhr.addEventListener('loadstart', showLoader);
xhr.addEventListener('loadend', hiddenLoader);

xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
xhr.send();

converterForm.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

function loadCurrency() {
  if (xhr.status === 200) {
    const loadedCurrency = JSON.parse(xhr.responseText);

    loadedCurrency.forEach(currency => {
      const optionCurrency = `<option label="${currency.code}" value="${currency.value}"></option>`;
      fromCurrency.innerHTML += optionCurrency;
      toCurrency.innerHTML += optionCurrency;
    });
    convertCurrency();

  } else {
    console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
  }
}

function showLoader() {
  converterForm.classList.add('hidden');
  loader.classList.remove('hidden');
}

function hiddenLoader() {
  converterForm.classList.remove('hidden');
  loader.classList.add('hidden');
}

function convertCurrency() {
  const result = (inputField.value * fromCurrency.value / toCurrency.value).toFixed(2);
  conversionResult.value = result;
}
