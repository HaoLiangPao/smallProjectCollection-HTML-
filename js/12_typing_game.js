const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

//////// Application Initialization /////
// Init word
let randomWord;
// Create a randomWord and add it to DOM
addWordToDOM();
// Init score
let score = 0;
// Init time
let time = 10;

// Focus the input on start
text.focus();
// Start counting down
const timeInterval = setInterval(updateTime, 1000);
// Init difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "MEDIUM";
// Set difficulty select value
difficultySelect.value = difficulty !== null ? difficulty : "MEDIUM";

///////// Add Event Listener ////////
// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    // Clear
    e.target.value = "";
    // Update the remaining time
    switch (difficulty) {
      case "EASY":
        time += 5;
      case "MEDIUM":
        time += 3;
      case "HIGH":
        time += 1;
      default:
        break;
    }
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => {
  // hide difficulty bar
  settings.classList.toggle("hide");
});

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem({ difficulty: difficulty });
});

////////// Functions //////////
// Generate a random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update the score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// Update the timer
function updateTime() {
  time--;
  timeEl.innerText = time + " s";
  // End Game when running out of time
  if (time <= 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}
