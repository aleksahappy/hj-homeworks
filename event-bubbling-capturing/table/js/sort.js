'use strict';

function handleTableClick(event) {
  if (event.target.tagName !== 'TH') {
    return;
  }

  if (!event.target.dataset.dir || event.target.dataset.dir === '-1') {
    event.target.dataset.dir = '1';
  } else {
    event.target.dataset.dir = '-1';
  }

  event.currentTarget.dataset.sortBy = event.target.dataset.propName;
  sortTable(event.currentTarget.dataset.sortBy, event.target.dataset.dir);
}
