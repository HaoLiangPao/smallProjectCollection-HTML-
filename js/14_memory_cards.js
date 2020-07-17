const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Initiate the consts and the app

// Keep track of current card
let currentActiveCard = 0;
// Store DOM cards
const cardsEl = [];
// Store card data
// const cardsData = getCardsData();
// Hard coded data
const preSetCards = [
  {
    question: "How to add or delete a Card?",
    answer: "Please check out the button beside the title",
  },
  {
    question: "What is a variable?",
    answer: "Container for a piece of data",
  },
  {
    question: "Example of Case Sensitive Variable",
    answer: "thisIsAVariable",
  },
];

const cardsData = getCardsData();

// Call functions
createCards();

///////// Event Listeners ///////////
// Next card function
nextBtn.addEventListener("click", () => {
  // Hide the card to the left
  cardsEl[currentActiveCard].className = "card left";
  // Switch the card
  currentActiveCard++;
  // Reaching the end of the cards collection
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = "card active";
  // Update the number of cards
  updateCurrentText();
});
// Previous card function
prevBtn.addEventListener("click", () => {
  // Hide the card to the left
  cardsEl[currentActiveCard].className = "card right";
  // Switch the card
  currentActiveCard--;
  // Reaching the end of the cards collection
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  // Update the number of cards
  updateCurrentText();
});
// Show add container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});
// Hide add container
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});
// Add new card
addCardBtn.addEventListener("click", () => {
  // Get input values
  const question = questionEl.value;
  const answer = answerEl.value;

  // if we have any inputs
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    question.value = "";
    answer.value = "";
    // return to the cards page
    addContainer.remove("show");
    // update the cards variable
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});
// Clear all cards
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});

///////////// Functions //////////////

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
// Create a single card
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  // show the first card in the array
  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;
  // Add flip function
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM array
  cardsEl.push(card);
  // Add card to the UI container
  cardsContainer.appendChild(card);

  // Show the page number of cards
  updateCurrentText();
}
// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}
// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? preSetCards : cards;
}
// Set cards data to the local storage
function setCardsData(cards) {
  // Operating
  localStorage.setItem("cards", JSON.stringify(cards));
  // Update the UI
  window.location.reload();
}
