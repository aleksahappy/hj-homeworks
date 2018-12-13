'use strict';

const todoList = document.getElementsByClassName('list-block')[0];
const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
const counterOutput = todoList.getElementsByTagName('output')[0];
let counter = 0;

for (const chekbox of checkboxes) {
  if (chekbox.checked) {
    counter++;
  }
  chekbox.addEventListener('click', updateCounter);
}

function updateCounter() {
  this.checked ? counter++ : counter--;
  counterOutput.value = `${counter} из ${checkboxes.length}`;
  counter === checkboxes.length ? todoList.classList.add('complete') : todoList.classList.remove('complete');
}

counterOutput.value = `${counter} из ${checkboxes.length}`;
