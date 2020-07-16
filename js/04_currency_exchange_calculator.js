// Select some DOM elements
// In order to get data
const currencyEl_one = document.querySelector("#currency-one");
const amountEl_one = document.querySelector("#amount-one");
const currencyEl_two = document.querySelector("#currency-two");
const amountEl_two = document.querySelector("#amount-two");
// In order to change data
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Add event listener
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate); // both arrow or typing will trigger input event
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
// Swap button event, along with its call back function
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  // Get rates from API
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
      // Get amount values
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
    .catch((err) => console.log(err));
}

calculate();
