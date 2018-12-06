'use strict';

const response = loadContacts();

if (response) {
  try {
    const loadedContacts = JSON.parse(response);
    const contactsList = document.querySelector('#container .list-view .contacts-list');
    contactsList.innerHTML = '';

    for (const contact of loadedContacts) {
      contactsList.innerHTML += `<li data-email="${contact.email}" data-phone="${contact.phone}"><strong>${contact.name}</strong></li>`;
    }
  } catch(err) {
    console.log(err.name, err.message);
  }
}
