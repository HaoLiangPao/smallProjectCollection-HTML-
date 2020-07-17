// DOM element selector
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

////////////// local variables ///////////////
// Song titles
const songs = ["hey", "summer", "ukulele"];
// Keep track of song
let songIndex = 1;
// Initially load the song details into DOM
loadSong(songs[songIndex]);

////////////// Event Listener ///////////////
// 1. Play & Pause
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// 2. Previous song
prevBtn.addEventListener("click", prevSong);
// 3. Next song
nextBtn.addEventListener("click", nextSong);
// 4. Progress UI update (automatically after playing)
audio.addEventListener("timeupdate", updateProgress);
// 5. Update playing when click on progress
progressContainer.addEventListener("click", setProgress);
// 6. Song ends (play the next one)
audio.addEventListener("ended", nextSong); // no implementation of functions are needed

////////////// Functions ///////////////
// Update song details
function loadSong(song) {
  title.innerText = song; // change the song title

  // console.log(audio.src);
  audio.src = `../resources/music/${song}.mp3`;
  // console.log(cover.src);
  cover.src = `../resources/img/10_music_player/${song}.jpg`;
}
// Play song
function playSong() {
  // 1. update the UI
  musicContainer.classList.add("play");
  // 2. change the button
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  // 3. play the music
  audio.play();
}
// Pause song
function pauseSong() {
  // 1. update the UI
  musicContainer.classList.remove("play");
  // 2. change the button
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  // 3. play the music
  audio.pause();
}
// Previous song
function prevSong() {
  songIndex--; // decrease the songIndex
  if (songIndex < 0) {
    songIndex = songs.length - 1; // switch to the last song in the list if current is head
  }
  loadSong(songs[songIndex]); // change img and audio source
  playSong(); // update UI and play the music
}
// Next song
function nextSong() {
  songIndex++; // decrease the songIndex
  if (songIndex === songs.length) {
    songIndex = 0; // switch to the first song if current is last
  }
  loadSong(songs[songIndex]); // change img and audio source
  playSong(); // update UI and play the music
}
// Update progress UI
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
// Set progress bar
function setProgress(e) {
  const width = this.clientWidth; // total width of the progress bar
  const clickX = e.offsetX; // current width
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration; // update the current time
}
