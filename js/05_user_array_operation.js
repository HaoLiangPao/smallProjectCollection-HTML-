const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// Initialize the app with some data to show
let data = [];
let totalUsers = 5;
// Add 5 random user into our Management System
for (let i = 0; i < totalUsers; i++) {
  getRandomUser();
}

// Event Listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleWealth);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showOnlyMillionaries);
calculateWealthBtn.addEventListener("click", getTotalWealth);

// Functions

// Fetch random user and add its wealth
// Normal way of fetch API
// function getRandomUser() {
//   const res = fetch("https://randomuser.me/api")
//     .then((res) => res.json())
//     .then(console.log(res))
//     .catch((err) => err);
// }

// Async way of fetch API
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new object to data arr
function addData(user) {
  // Change the data stored
  data.push(user);
  // Show the change to UI
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // set a default value in the fucntion
  // Clean main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((user) => {
    // Create person element to be added to DOM
    const personEl = document.createElement("div");
    // Add class into the person element
    personEl.classList.add("person");
    // Update the HTML with dapa passed in
    personEl.innerHTML = `<strong>${user.name}</strong>${formatMoney(
      user.money
    )} `;
    // Change the DOM
    main.appendChild(personEl);
  });
}
// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// 2. Double money event function
function doubleWealth() {
  // Update data storage
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  // Update UI
  updateDOM();
}

// 3. Sort event function
function sortByRichest() {
  // Update data order (sort())
  data = data.sort((a, b) => b.money - a.money);
  // Update UI
  updateDOM();
}

// 4. Show only millionaires
function showOnlyMillionaries() {
  // Update data order (filter())
  data = data.filter((user) => user.money >= 1000000);
  // Update UI
  updateDOM();
}

// 5.
function getTotalWealth() {
  // Update data order (filter())
  const totalWealth = data.reduce((total, user) => total + user.money, 0);
  // Create UI element
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
