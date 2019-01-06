'use strict';

function loadData(url) {
  return new Promise((done, fail) => {
    window[showWidget] = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=showWidget`;
    document.body.appendChild(script);
  });
}

function showWidget(data) {
  for (const value in data) {
    if (value === 'wallpaper' || value === 'pic') {
      document.querySelector(`[data-${value}]`).src = data[value];
    } else {
      document.querySelector(`[data-${value}]`).textContent = data[value];
    }
  }
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp');
