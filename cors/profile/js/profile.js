'use strict';

const content = document.querySelector('.content');

function loadData(url, functionName) {
  return new Promise((done, fail) => {
    window.functionName = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    document.body.appendChild(script);
  })
}

function showUserProfile(data) {
  for (const value in data) {
    if (value === 'id') {
      loadData(`https://neto-api.herokuapp.com/profile/${data[value]}/technologies`, 'showTechnologyList');
    } else if (value === 'pic') {
      document.querySelector(`[data-${value}]`).src = data[value];
    } else {
      document.querySelector(`[data-${value}]`).textContent = data[value];
    }
  }
}

function showTechnologyList(data) {
  const technologies = document.querySelector(`[data-technologies]`);

  for (const technology of data) {
    const span = document.createElement('span');
    span.classList.add('devicons', `devicons-${technology}`);
    technologies.appendChild(span);
  }

  content.style.display = 'initial';
}

loadData('https://neto-api.herokuapp.com/profile/me', 'showUserProfile');
