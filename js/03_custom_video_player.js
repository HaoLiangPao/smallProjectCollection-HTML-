// Get DOM elements
const video = document.getElementById("video");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
playButton.addEventListener("click", toggleVideoStatus);
stopButton.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);

// Play and pause video
function toggleVideoStatus() {
  // HTML5 API
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Convert the progress value to minutes
  // Get the minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  // Get the seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  // +variable can make sure it is a number
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video from playing
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}
