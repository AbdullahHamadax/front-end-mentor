lucide.createIcons();

const slider = document.getElementById("charLengthSlider");
const display = document.getElementById("charLengthDisplay");

function updateSlider() {
  const value = slider.value;
  display.textContent = value;
  const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--progress", percent + "%");
}

slider.addEventListener("input", updateSlider);

const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

let password = document.getElementById("generated-password");
let upperCaseCheckbox = document.getElementById("uppercase-checkbox");
let lowerCaseCheckbox = document.getElementById("lowercase-checkbox");
let numberCheckbox = document.getElementById("numbers-checkbox");
let symbolCheckbox = document.getElementById("symbols-checkbox");

function generateRandomPassword() {
  let strengthCounter = 0;

  let charLength = document.getElementById("charLengthSlider").value;
  let possibleCharacters = [];

  if (lowerCaseCheckbox.checked) {
    possibleCharacters = possibleCharacters.concat(characters.slice(26, 52));
    strengthCounter++;
  }
  if (upperCaseCheckbox.checked) {
    possibleCharacters = possibleCharacters.concat(characters.slice(0, 26));
    strengthCounter++;
  }
  if (numberCheckbox.checked) {
    possibleCharacters = possibleCharacters.concat(characters.slice(52, 62));
    strengthCounter++;
  }
  if (symbolCheckbox.checked) {
    possibleCharacters = possibleCharacters.concat(characters.slice(62));
    strengthCounter++;
  }

  if (possibleCharacters.length === 0) {
    password.textContent = "Please select at least one option!!!";
    return;
  }

  let emptyString = "";

  for (let i = 0; i < charLength; i++) {
    let randomIndex = Math.floor(Math.random() * possibleCharacters.length);
    emptyString += possibleCharacters[randomIndex];
  }

  password.textContent = emptyString;
  displayPasswordStrength(strengthCounter, charLength);
}

function copyToClipboard() {
  navigator.clipboard.writeText(password.textContent);
}

let firstBar = document.getElementById("first-bar");
let secondbar = document.getElementById("second-bar");
let thirdbar = document.getElementById("third-bar");
let fourthbar = document.getElementById("fourth-bar");
let currentPasswordStrength = document.getElementById("password-strength");

function displayPasswordStrength(strengthCounter, charLength) {
  firstBar.style.backgroundColor = "transparent";
  secondbar.style.backgroundColor = "transparent";
  thirdbar.style.backgroundColor = "transparent";
  fourthbar.style.backgroundColor = "transparent";
  if (strengthCounter === 1 || charLength <= 6) {
    firstBar.style.backgroundColor = "green";
    currentPasswordStrength.textContent = "weak";
  } else if (strengthCounter === 2 || charLength <= 6) {
    firstBar.style.backgroundColor = "yellow";
    secondbar.style.backgroundColor = "yellow";
    currentPasswordStrength.textContent = "moderate";
  } else if (strengthCounter === 3 || charLength <= 10) {
    firstBar.style.backgroundColor = "orange";
    secondbar.style.backgroundColor = "orange";
    thirdbar.style.backgroundColor = "orange";
    currentPasswordStrength.textContent = "medium";
  } else if (strengthCounter === 4 || charLength > 15) {
    firstBar.style.backgroundColor = "red";
    secondbar.style.backgroundColor = "red";
    thirdbar.style.backgroundColor = "red";
    fourthbar.style.backgroundColor = "red";
    currentPasswordStrength.textContent = "strong";
  }
}
