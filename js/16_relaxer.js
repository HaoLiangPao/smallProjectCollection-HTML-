const container = document.getElementById("container");
const text = document.getElementById("text");

// Initialize the app
const totalTime = 7300;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

setInterval(breathAnimation, totalTime);

// Functions
function breathAnimation() {
  text.innerText = "Breathe In";
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = "Hold";
    setTimeout(() => {
      text.innerText = "Breathe Out";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}
