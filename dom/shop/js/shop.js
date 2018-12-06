'use strict';

const btnsAdd = document.querySelectorAll('#container .box .add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
let count = 0;
let totalPrice = 0;

function updateCart() {
  count++;
  totalPrice += parseFloat(this.dataset.price);

  cartCount.innerHTML = count;
  cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);
}

for (const btn of btnsAdd) {
  btn.addEventListener('click', updateCart);
}
