'use strict';

const todoList = document.querySelector('.todo-list');
const doneList = todoList.querySelector('.done');
const undoneList = todoList.querySelector('.undone');
const affairs = todoList.getElementsByTagName('label');

for (const affair of affairs) {
  affair.addEventListener('click', updateTodoList);
}

function updateTodoList(event) {
  const checkbox = event.currentTarget.querySelector('[type="checkbox"]');
  checkbox.classList.toggle('checked');
  if (checkbox.checked) {
    doneList.appendChild(event.currentTarget);
  } else {
    undoneList.appendChild(event.currentTarget);
  }
}
