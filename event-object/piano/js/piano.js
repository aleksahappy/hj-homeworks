'use strict';

const sounds = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth'
];

const pianoMode = document.getElementsByClassName('set')[0];
const btnsPiano = pianoMode.getElementsByTagName('li');
let tonality = 'middle';

Array.from(btnsPiano).forEach((btn, index) => {
  const sound = btn.getElementsByTagName('audio')[0];
  btn.addEventListener('click', () => {
    sound.src = `./sounds/${tonality}/${sounds[index]}.mp3`;
    sound.play();
  });
});

function updateSounds(event) {
  if (event.shiftKey) {
    tonality = 'lower';
    pianoMode.classList.replace('middle', 'lower');
  }
  if (event.altKey) {
    tonality = 'higher';
    pianoMode.classList.replace('middle', 'higher');
  }
}

function returnSounds(event) {
  tonality = 'middle';
  pianoMode.classList.remove('lower', 'higher');
  pianoMode.classList.add('middle');
}

document.addEventListener('keydown', updateSounds);
document.addEventListener('keyup', returnSounds);
