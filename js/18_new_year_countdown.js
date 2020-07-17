const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
// Set background year
year.innerText = currentYear + 1;

// Update the countdown clock
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const day = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hour = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minute = Math.floor(diff / 1000 / 60) % 60;
  const second = Math.floor(diff / 1000) % 60;
  // Add values to the DOM
  days.innerText = day;
  hours.innerText = hour < 10 ? `0${hour}` : hour;
  minutes.innerText = minute < 10 ? `0${minute}` : minute;
  seconds.innerText = second < 10 ? `0${second}` : second;
}
// Show spinner when getting time
setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

// Run updateCountdown every seconds
setInterval(updateCountdown, 1000);
