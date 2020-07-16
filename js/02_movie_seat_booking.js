// Data fetched
// Movie Price
const movieSelector = document.querySelector("#movie");
let ticketPrice = movie.value;

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat");
const count = document.querySelector("#count");
const total = document.querySelector("#total");

// Main steps when initialize the page
// 1. Initialize the UI according to the local storage
populateUI();
// 2. Update count and total price of selected movies
updateSelectedCount();

// Events supported by the website
// 1.Select seats (event)
container.addEventListener("click", (e) => {
  // Ocupied list can not be selected again
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    // Update count and total price of selected movies
    updateSelectedCount();
  }
});

// 2.Movie select *event (event)
movieSelector.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  // Store selected movie and price into local storage
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Save selected movie index and price (function)
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count (function)
function updateSelectedCount() {
  // Get all seats selected
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // Get all indexes of selected seats
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  // Add it to local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Populate the UI of #seatSelected and total amount of money
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Populate UI (function)
function populateUI() {
  // Get seats related info from local storage
  const localSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  // Check if tickets are selected in the local storage
  if (localSeats !== null && localSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (localSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  // Check if a movie is selected in the local storage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    // Select the movie according to local storage
    movieSelector.selectedIndex = selectedMovieIndex;
  }
}
