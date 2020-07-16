// Get UI elements
const form = document.querySelector("#form");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// Check name input
userName.addEventListener("blur", () => {
  checkLength(userName, 3, 15);
});

// Check email input
email.addEventListener("blur", () => {
  checkEmail(email);
});
// Check valid password
password.addEventListener("blur", () => {
  checkLength(password, 6, 25);
});
// Check if two passwords match
password2.addEventListener("blur", () => {
  checkPasswordsMatch(password, password2);
});

// Final Check when submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Check if all required fields are filled
  checkRequired([userName, email, password, password2]);
  // Check input length
  checkLength(userName, 3, 15);
  checkLength(password, 6, 25);
  // Check email
  checkEmail(email);
  // Check password match
  checkPasswordsMatch(password, password2);
});

// Show input accepted
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
// Show input error message
function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = msg;
}

// Check valid email
function checkEmail(input) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid!");
  }
}

// Check passwords
function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value && checkLength(input1)) {
    showSuccess(input1);
    showSuccess(input2);
  } else {
    showError(input1, "Passwords do not match!");
    showError(input2, "Passwords do not match!");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}

// Get fieldName (make the first letter upper case)
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at most ${max} characters`
    );
  }
}
