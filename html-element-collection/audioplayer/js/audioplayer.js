'use strict';

const player = document.getElementsByClassName('mediaplayer')[0];
const audio = player.getElementsByTagName('audio')[0];
const btnPlayPause = player.getElementsByClassName('playstate')[0];
const btnStop = player.getElementsByClassName('stop')[0];
const btnBack = player.getElementsByClassName('back')[0];
const btnNext = player.getElementsByClassName('next')[0];
const songTitle = player.getElementsByClassName('title')[0];

const songs = [
  'LA Chill Tour',
  'LA Fusion Jam',
  'This is it band'
];

let indexSong = 0;

function setSong() {
  audio.src = `mp3/${songs[indexSong]}.mp3`;
  songTitle.title = songs[indexSong];
  if (player.classList.contains('play')) {
    audio.play();
  }
}

btnPlayPause.onclick = () => {
  player.classList.contains('play')? audio.pause() : audio.play();
  player.classList.toggle('play');
}

btnStop.onclick = () => {
  audio.pause();
  audio.currentTime = 0;
  player.classList.remove('play');
}

btnBack.onclick = () => {
  if (indexSong === 0) {
    indexSong = songs.length - 1;
  } else {
    indexSong--;
  }
  setSong();
}

btnNext.onclick = () => {
  if (indexSong === songs.length - 1) {
    indexSong = 0;
  } else {
    indexSong++;
  }
  setSong();
}
