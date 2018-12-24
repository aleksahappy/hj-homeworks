'use strict';

const sizeOptions = document.getElementById('sizeSwatch');
const colorOptions = document.getElementById('colorSwatch');
const quickCart = document.getElementById('quick-cart');
const cartForm = document.getElementById('AddToCartForm');

const requestUrls = {
  sizes: 'https://neto-api.herokuapp.com/cart/sizes',
  colors: 'https://neto-api.herokuapp.com/cart/colors',
  statusСart: 'https://neto-api.herokuapp.com/cart',
  removeProduct: 'https://neto-api.herokuapp.com/cart/remove'
};

cartForm.addEventListener('submit', addProductInCart);

Promise.all([
  fetch(requestUrls.sizes),
  fetch(requestUrls.colors),
  fetch(requestUrls.statusСart)
])
.then(results => Promise.all(results.map(result => result.json())))
.then(([dataSizes, dataColors, dataCart]) => {
  addSizeOptions(dataSizes);
  addColorsOptions(dataColors);
  showCartStatus(dataCart);
})

function addSizeOptions(data) {
  if (!data.length) {
    return;
  }

  if (!localStorage.defaultSize) {
    localStorage.defaultSize = 'xl';
  }

  for (const size of data) {
    sizeOptions.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${size.isAvailable ? 'available' : 'soldout'}">
                              <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${size.isAvailable ? '' : 'disabled'} ${size.type === localStorage.defaultSize ? 'checked' : ''}>
                              <label for="swatch-0-${size.type}">
                                ${size.title}
                                <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                              </label>
                            </div>`;
  }

  const inputs = sizeOptions.getElementsByTagName('input');
  for (const input of inputs) {
    input.addEventListener('change', (event) => localStorage.defaultSize = event.currentTarget.value);
  }
}

function addColorsOptions(data) {
  if (!data.length) {
    return;
  }

  if (!localStorage.defaultColor) {
    localStorage.defaultColor = 'red';
  }

  for (const color of data) {
    colorOptions.innerHTML += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : ''}">
                                <div class="tooltip">${color.title}</div>
                                <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${color.isAvailable ? '' : 'disabled'} ${color.type === localStorage.defaultColor ? 'checked' : ''}>
                                <label for="swatch-1-${color.type}" style="border-color: red;">
                                  <span style="background-color: ${color.code};"></span>
                                  <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                                </label>
                              </div>`;
  }

  const inputs = colorOptions.getElementsByTagName('input');
  for (const input of inputs) {
    input.addEventListener('change', (event) => localStorage.defaultColor = event.currentTarget.value);
  }
}

function showCartStatus(data) {
  let totalPrice =0;
  quickCart.innerHTML = '';

  if (!data.length) {
    return;
  }
  
  for (const product of data) {
    quickCart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${product.id}" style="opacity: 1;">
                                <div class="quick-cart-product-wrap">
                                  <img src="${product.pic}" title="${product.title}">
                                  <span class="s1" style="background-color: #000; opacity: .5">$${product.price}</span>
                                  <span class="s2"></span>
                                </div>
                                <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
                                <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
                              </div>`;
    totalPrice += product.price * product.quantity;
  }
  
  quickCart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${data.length ? 'open' : ''}">
                            <span>
                              <strong class="quick-cart-text">Оформить заказ<br></strong>
                              <span id="quick-cart-price">$${totalPrice}</span>
                            </span>
                          </a>`;

  const btnsRemove = quickCart.getElementsByClassName('remove');
  for (const btn of btnsRemove) {
    btn.addEventListener('click', removeProductFromCart);
  }
}

function addProductInCart(event) {
  event.preventDefault();
  const productId = event.currentTarget.dataset.productId;
  const formData = new FormData(cartForm);
  formData.append('productId', productId);
  sendRequest(requestUrls.statusСart, formData);
}

function removeProductFromCart(event) {
  const productId = event.currentTarget.dataset.id;
  const formData = new FormData();
  formData.append('productId', productId);
  sendRequest(requestUrls.removeProduct, formData);
}

function sendRequest(url, data) {
  fetch(url, {
    body: data,
    credentials: 'same-origin',
    method: 'POST'
  })
  .then((result) => {
    if (200 <= result.status && result.status < 300) {
      return result;
    }
      throw new Error(response.statusText);
    })
  .then(result => result.json())
  .then(data => {
    if (data.error) {
      console.error(data.message);
    } else {
      showCartStatus(data);
    }
  })
  .catch(error => console.error(error.message))
}
