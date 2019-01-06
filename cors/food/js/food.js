'use strict';

function loadData(url, functionName) {
  return new Promise((done, fail) => {
    window.functionName = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    document.body.appendChild(script);
  })
}

function showRecipeInformation(data) {
  for (const value in data) {
    if (value === 'id') {
      loadData(`https://neto-api.herokuapp.com/food/${data[value]}/rating`, 'showRecipeRating');
      loadData(`https://neto-api.herokuapp.com/food/${data[value]}/consumers`, 'showUsersList');
    }
    if (value === 'pic') {
      document.querySelector(`[data-${value}]`).style.backgroundImage = `url("${data[value]}")`;
    }
    if (value === 'title') {
      document.querySelector(`[data-${value}]`).textContent = data[value];
    }
    if (value === 'ingredients') {
      document.querySelector(`[data-${value}]`).textContent = data[value].join(', ');
    }
  }
}

function showRecipeRating(data) {
  for (const value in data) {
    if (value === 'rating') {
      document.querySelector(`[data-${value}]`).textContent = Math.round(data[value] * 100) / 100;
      document.querySelector(`[data-star]`).style.width = `${data[value] * 100 / 10}%`;
    }
    if (value === 'votes') {
      let amountVotes = '';

      if (data[value] === 1) {
        amountVotes = `${data[value]} оценка`;
      }
      if (data[value] > 1 && data[value] < 5) {
        amountVotes = `${data[value]} оценки`;
      }
      if (data[value] >= 5) {
        amountVotes = `${data[value]} оценок`;
      }

      document.querySelector(`[data-${value}]`).textContent = amountVotes;
    }
  }
}

function showUsersList(data) {
  const consumers = document.querySelector(`[data-consumers]`);

  for (const value in data) {
    if (value === 'consumers') {
      for (const consumer of data[value]) {
        const user = document.createElement('img');
        user.src = consumer.pic;
        user.title = consumer.name;
        consumers.appendChild(user);
      }
    }
    if (value === 'total') {
      const amountUsers = document.createElement('span');
      amountUsers.textContent = `(+${data[value] - consumers.childElementCount})`;
      consumers.appendChild(amountUsers);
    }
  }
}

loadData('https://neto-api.herokuapp.com/food/42', 'showRecipeInformation');
