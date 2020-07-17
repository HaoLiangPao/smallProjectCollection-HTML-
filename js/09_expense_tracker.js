// Get DOM elements
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Testing data
// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Init app
init();

// Add event listener
form.addEventListener("submit", addTransaction);

// Init function
function init() {
  list.innerHTML = ""; // clear out the list when init

  // Get data from local storage
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign : expense or income
  const { text, amount } = transaction;
  let sign = amount > 0 ? "+" : "-";
  // Create and modify the DOM element
  const item = document.createElement("li");
  item.classList.add(sign === "-" ? "minus" : "plus"); // Add class based on value
  // Add HTML content
  item.innerHTML = `
    ${text} <span> ${sign}${Math.abs(
    amount
  )} </span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;
  // Update UI
  list.appendChild(item);
}

// Update the balance income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount); // create an array of transaction amounts

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2); // add all transaction amounts up

  const income = amounts
    .filter((item) => item >= 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value, // change it to number from string
    };

    // Update local variables
    transactions.push(transaction);

    // Add to local storage (add local variable to local storage)
    updateLocalStorage();

    // Change the UI
    addTransactionDOM(transaction);
    updateValues();
    text.value = ""; // Clear out the input texts
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

// Remove transaction on ID
function removeTransaction(ID) {
  // Add to local storage
  transactions = transactions.filter((transaction) => transaction.id !== ID);
  // Update local storage
  updateLocalStorage();
  // Reload the page
  init();
}

// Update localStorage Transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
