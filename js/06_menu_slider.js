const toggleBtn = document.getElementById("toggle");
const hideModalBtn = document.getElementById("close");
const showModalBtn = document.getElementById("open");
const modal = document.getElementById("modal");

// Add event listener
toggleBtn.addEventListener(
  "click",
  () => document.body.classList.toggle("show-nav") // add/remove the class:"show-nav" everytime the toggle button is clicked
);

// Show Modal
showModalBtn.addEventListener("click", () => modal.classList.add("show-modal"));

// Hide Modal
hideModalBtn.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

// Hide the modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
