'use strict';

list.addEventListener('click', ckickBtnAddToCard);

function ckickBtnAddToCard(event) {
  if (!event.target.classList.contains('add-to-cart')){
    return;
  }
  event.preventDefault();

  const item = {
    title: event.target.dataset.title,
    price: event.target.dataset.price
  };

  addToCart(item);
}
