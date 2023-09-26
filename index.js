window.addEventListener('DOMContentLoaded', (event) => {
  let display = document.getElementById("display");
  let currentInput = "";
  let operator = "";
  let firstOperand = "";
  let secondOperand = "";

  const updateDisplay = () => {
      display.textContent = currentInput;
  };

  const handleNumberClick = (number) => {
      currentInput += number;
      updateDisplay();
  };

  const handleOperatorClick = (op) => {
      if (!firstOperand) {
          firstOperand = currentInput;
          currentInput = "";
          operator = op;
      }
  };

  const calculate = () => {
    secondOperand = currentInput;
    let result = 0;
    switch (operator) {
      case '+':
        result = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case '−':
        result = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case '×':
        result = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case '÷':
        if (secondOperand !== "0") {
          result = parseFloat(firstOperand) / parseFloat(secondOperand);
        } else {
          alert("Cannot divide by zero");
          clearAll();
          return;
        }
        break;
      default:
        return;
    }
    display.textContent = result; // This line updates the display immediately.
    firstOperand = result.toString();
    currentInput = "";
  };
  

  const clearAll = () => {
      currentInput = "";
      firstOperand = "";
      secondOperand = "";
      operator = "";
      updateDisplay();
  };

  document.querySelectorAll(".number").forEach((button) => {
      button.addEventListener("click", (e) => handleNumberClick(e.target.textContent));
  });

  document.querySelectorAll(".operator").forEach((button) => {
      button.addEventListener("click", (e) => handleOperatorClick(e.target.textContent));
  });

  document.getElementById("clear").addEventListener("click", clearAll);
  document.getElementById("percent").addEventListener("click", () => {
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay();
  });
  
  document.getElementById("=").addEventListener("click", calculate);
});
