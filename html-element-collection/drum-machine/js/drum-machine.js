'use strict';

const drumBtns = document.getElementsByClassName('drum-kit__drum');

function playAudio() {
  const audio = this.getElementsByTagName('audio')[0];
  audio.play();
  audio.currentTime = 0;
}

for (const btn of drumBtns) {
  btn.onclick = playAudio;
}
