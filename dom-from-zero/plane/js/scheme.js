'use strict'

const aircraftId = document.getElementById('acSelect'),
      btnSeatMap = document.getElementById('btnSeatMap'),
      btnSetFull = document.getElementById('btnSetFull'),
      btnSetEmpty = document.getElementById('btnSetEmpty'),
      seatMapTitle = document.getElementById('seatMapTitle'),
      seatMapDiv = document.getElementById('seatMapDiv'),
      totalPax = document.getElementById('totalPax'),
      totalAdult = document.getElementById('totalAdult'),
      totalHalf = document.getElementById('totalHalf');

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;
totalPax.textContent = 0;
totalAdult.textContent = 0;
totalHalf.textContent = 0;

btnSeatMap.addEventListener('click', showAirplaneScheme);
btnSetFull.addEventListener('click', setFullSeats);
btnSetEmpty.addEventListener('click', SetEmptySeats);

function showAirplaneScheme(event) {
  event.preventDefault();

  fetch(`https://neto-api.herokuapp.com/plane/${aircraftId.value}`)
  .then(res => res.json())
  .then(createAirplaneScheme)
}

function createAirplaneScheme(airplane) {
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;

  totalPax.textContent = 0;
  totalAdult.textContent = 0;
  totalHalf.textContent = 0;

  seatMapTitle.textContent = `${airplane.title} (${airplane.passengers} пассажиров)`;

  const rowTemplate = airplane.scheme.map((seats, index) => {
    const letters = seats === 0 ? [] : (seats === 4 ? ['', ...airplane.letters4, ''] : airplane.letters6);
    return createRowTemplate(index, letters);
  });

  const rowScheme = craateRowScheme(rowTemplate);
  seatMapDiv.textContent = '';
  seatMapDiv.appendChild(rowScheme);

  const seats = document.querySelectorAll('div.seat');
  for (let seat of seats) {
    seat.addEventListener('click', selectSeat);
  }
}

function createSeatTemplate(value) {
  if (value) {
    return {
      tag: 'div',
      cls: ['col-xs-4', 'seat'],
      content: {
        tag: 'span',
        cls: 'seat-label',
        content: value
      }
    }
  } else {
    return {
      tag: 'div',
      cls: ['col-xs-4', 'no-seat']
    }
  }
}

function createRowTemplate(index, letters) {
  return {
    tag: 'div',
    cls: ['row', 'seating-row', 'text-center'],
    content: [
      {
        tag: 'div',
        cls: ['col-xs-1', 'row-number'],
        content: {
          tag: 'h2',
          cls: '',
          content: index + 1
        }
      },
      {
        tag: 'div',
        cls: 'col-xs-5',
        content: [
          createSeatTemplate(letters[0]),
          createSeatTemplate(letters[1]),
          createSeatTemplate(letters[2])
        ]
      },
      {
        tag: 'div',
        cls: 'col-xs-5',
        content: [
          createSeatTemplate(letters[3]),
          createSeatTemplate(letters[4]),
          createSeatTemplate(letters[5])
        ]
      }
    ]
  }
}

function craateRowScheme(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block.toString());
  }
  if (Array.isArray(block)) {
    return block.reduce((fragment, element) => {
      fragment.appendChild(craateRowScheme(element));
      return fragment;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(block.tag);

  if (block.cls) {
    element.classList.add(...[].concat(block.cls).filter(Boolean));
  }
  
  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key])
    });
  }

  if (block.content) {
    element.appendChild(craateRowScheme(block.content));
  }

  return element;
}

function selectSeat(event) {
  if (event.currentTarget.classList.contains('adult')) {
    event.currentTarget.classList.remove('adult');
  } else if (event.currentTarget.classList.contains('half')) {
    event.currentTarget.classList.remove('half');
  } else if (event.altKey) {
    event.currentTarget.classList.add('half');
  } else {
    event.currentTarget.classList.add('adult');
  }
  countSeats();
}

function setFullSeats(event) {
  event.preventDefault();
  const seats = document.querySelectorAll('div.seat');
  for (let seat of seats) {
    if (!seat.classList.contains('adult') && !seat.classList.contains('half')) {
      seat.classList.add('adult');
    }
  }
  countSeats();
}

function SetEmptySeats(event) {
  event.preventDefault();
  const seats = document.querySelectorAll('div.seat');
  for (let seat of seats) {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  }
  countSeats();
}

function countSeats() {
  const adultSeats = document.querySelectorAll('div.seat.adult');
  const halfSeats = document.querySelectorAll('div.seat.half');

  totalPax.textContent = adultSeats.length + halfSeats.length;
  totalAdult.textContent = adultSeats.length;
  totalHalf.textContent = halfSeats.length;
}
