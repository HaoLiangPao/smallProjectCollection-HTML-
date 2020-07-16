// DOM elements
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

// Possible answers
const words = ["HaoLiang", "Programming", "WebDevelopment", "Handsome"];
// Randomly choose a word from possible answers
let correctedWord = words[Math.floor(Math.random() * words.length)];

// Letters guessed by users
const correctedLetters = [];
const wrongLetters = [];

// Main functions & Event listeners
displayWord(); // shows the length of the letters
// Keydown letter pressed
window.addEventListener("keydown", (e) => {
  // Test if a letter entered
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    // When typed a correct letter
    if (correctedWord.includes(letter)) {
      // Check if the letter typed in is correct
      if (!correctedLetters.includes(letter)) {
        correctedLetters.push(letter);
        displayWord(); // refresh the display of the word
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        // a new wrong letter
        wrongLetters.push(letter);
        // Show wrong letters function
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
    console.log(correctedLetters);
  }
});
// Resart the game
playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctedLetters.splice(0);
  wrongLetters.splice(0);
  // Reselect the word
  correctedWord = words[Math.floor(Math.random() * words.length)];
  // Show the length
  displayWord();
  // Remove popUp
  popup.style.display = "none";
  // Reset wrong message
  updateWrongLettersEl();
});

// Show hidden word & Check if won
function displayWord() {
  wordEl.innerHTML = `
    ${correctedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter"> ${
            correctedLetters.includes(letter) ? letter : ""
          }</span>`
      )
      .join("")}
  `;
  // Check game progress
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === correctedWord) {
    // won the game
    finalMessage.innerText = "Congratulations! You won! 🥳";
    popup.style.display = "flex";
  }
  console.log(innerWord);
}

// Update the wrong letters
function updateWrongLettersEl() {
  // 1. Show the wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // 2. Show the figure
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // 3. Stop the game with a lose notification
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 🤯";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//
