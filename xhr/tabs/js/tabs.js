'use strict';

const tabs = document.querySelectorAll('.tabs nav a');
const contentTab = document.getElementById('content');
const preloader = document.getElementById('preloader');

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', loadTab);
xhr.addEventListener("loadstart", showPreloader);
xhr.addEventListener("loadend", hiddenPreloader);
sendRequest(document.querySelector('.tabs nav a.active').href);

for (const tab of tabs) {
  tab.addEventListener('click', showTab);
}

function sendRequest(url) {
  xhr.open('GET', url);
  xhr.send();
}

function showTab(event) {
  event.preventDefault();
  sendRequest(event.currentTarget.href);
  tabs.forEach(tab => tab.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function loadTab() {
  if (xhr.status !== 200) {
    console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
  } else {
  contentTab.innerHTML = xhr.responseText;
  }
}

function showPreloader() {
  preloader.classList.remove('hidden');
}

function hiddenPreloader() {
  preloader.classList.add('hidden');
}
