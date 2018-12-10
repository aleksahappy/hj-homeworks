'use strict';

const contentCatalog = document.getElementById('content');
contentCatalog.innerHTML = '';

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', loadCatalog);
xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
xhr.send();

function loadCatalog() {
  const catalog = JSON.parse(xhr.responseText);
  contentCatalog.innerHTML = catalog.map(book => `<li data-title="${book.title}" data-author="${book.author.name}" data-info="${book.info}" data-price="${book.price}"><img src="${book.cover.small}"></li>`);
}
