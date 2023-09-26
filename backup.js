// DOM Elements
const display = document.querySelector("#display");
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const controlButtons = document.getElementsByClassName("controls");
const decimalButton = document.getElementById(".");

// Storage for Numbers and Operators for calculations
let numberStorage = null;
let operatorStorage = null;

// Displays User Input On Screen
const getUserInput = () => display.textContent.split(",").join("");

const getNumber = () => {
  return parseFloat(getUserInput());
};

const setDisplay = (input) => {
  // Reduce the fontSize of display if input length exceeds a certain limit
  if (input.length >= 9) {
    display.style.fontSize = "2.6rem";
  } else if (input.length >= 8) {
    display.style.fontSize = "3rem";
  } else if (input.length >= 7) {
    display.style.fontSize = "3.3rem";
  } else {
    display.style.fontSize = "4.5rem";
  }

  if (input === "0") {
    controlButtons[0].innerText = "AC";
  } else {
    controlButtons[0].innerText = "C";
  }

  display.textContent = input;
};

const appendNumber = (numStr) => {
  const displayString = getUserInput();
  if (displayString === "0") {
    setDisplay(numStr);
  } else {
    setDisplay(displayString + numStr);
  }
};

const calculateResult = () => {
  const currentNumber = getNumber();
  const numberStored = parseFloat(numberStorage);
  let newNumber;

  switch (operatorStorage) {
    case "+":
      newNumber = numberStored + currentNumber;
      break;
    case "-":
      newNumber = numberStored - currentNumber;
      break;
    case "×":
      newNumber = numberStored * currentNumber;
      break;
    case "÷":
      if (currentNumber === 0) {
        setDisplay("Error");
        return;
      }
      newNumber = numberStored / currentNumber;
      break;
    default:
      return;
  }

  if (!Number.isFinite(newNumber)) {
    setDisplay("Error: Invalid result");
    return;
  }

  if (newNumber.toString().length > 9) {
    newNumber = newNumber.toExponential(6);
  }

  return newNumber.toString().replace("+", "");
};

const handleNumberButtonClick = (event) => {
  const numStr = event.target.id.toString();
  appendNumber(numStr);
};

const handleDecimalButtonClick = () => {
  const displayString = getUserInput();
  if (!displayString.includes(".")) {
    setDisplay(displayString + ".");
  }
};

const handleControlButtonClick = (event) => {
  if (event.target.id === "clear") {
    setDisplay("0");
    numberStorage = null;
    operatorStorage = null;
  } else if (event.target.id === "plus-or-minus") {
    const currentNumber = getNumber();
    const currentNumberStr = getUserInput();

    if (currentNumberStr === "-0") {
      setDisplay("0");
    } else if (currentNumber >= 0) {
      setDisplay("-" + currentNumber);
    } else {
      setDisplay(currentNumberStr.substring(1));
    }
  } else if (event.target.id === "percent") {
    const currentNumber = getNumber();
    const newNumber = currentNumber / 100;
    setDisplay(newNumber.toString());
    numberStorage = null;
    operatorStorage = null;
  }
};

const handleOperatorButtonClick = (event) => {
  const operator = event.target.textContent;

  if (!numberStorage) {
    // If numberStorage is empty, store the currentNumber and Operator
    numberStorage = getNumber();
    operatorStorage = operator;
    setDisplay("0");
    return;
  }

  numberStorage = calculateResult();
  operatorStorage = operator;
  setDisplay("0");
};

// Number Buttons - Event Listener
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", handleNumberButtonClick);
}

decimalButton.addEventListener("click", handleDecimalButtonClick);

// Control Buttons - Event Listener
for (let i = 0; i < controlButtons.length; i++) {
  controlButtons[i].addEventListener("click", handleControlButtonClick);
}

// Operator Buttons - Event Listener
for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener("click", handleOperatorButtonClick);
}
