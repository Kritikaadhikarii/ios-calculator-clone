document.addEventListener('DOMContentLoaded', function () {
  let inputs = [];
  let currentInput = "";

  // Get display element
  const display = document.getElementById('display');

  // Get history button element
  const historyButton = document.getElementById('historyButton');

  // Calculation history
  const history = [];

  // Update display
  function updateDisplay(value) {
    display.textContent = value;
  }

  // Update history
  function updateHistory() {
    let historyText = history.map(entry => `${entry.expression} = ${entry.result}`).join('\n');
    alert(`Calculation History:\n${historyText}`);
  }

  // Evaluate expression
  function evaluateExpression() {
    let result = inputs[0];
    for (let i = 1; i < inputs.length; i += 2) {
      const operator = inputs[i];
      const operand = inputs[i + 1];

      switch (operator) {
        case '+':
          result += operand;
          break;
        case '−':
          result -= operand;
          break;
        case '×':
          result *= operand;
          break;
        case '÷':
          if (operand !== 0) {
            result /= operand;
          } else {
            return 'Error';
          }
          break;
      }
    }
    return result;
  }

  // Handle number input
  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function (e) {
      currentInput += e.target.textContent;
      updateDisplay(currentInput);
    });
  });

  // Handle operator input
  document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function (e) {
      if (currentInput !== "") {
        inputs.push(parseFloat(currentInput));
        currentInput = "";
      }

      const operator = e.target.textContent;
      if (operator !== "=") {
        inputs.push(operator);
      } else if (inputs.length >= 3) {
        const result = evaluateExpression();
        updateDisplay(result);

        // Save to history
        const expression = inputs.join(' ');
        history.push({expression, result});

        // Reset inputs and start a new calculation from the result
        inputs = [result];
      }
    });
  });

  // Handle AC (All Clear)
  document.getElementById('clear').addEventListener('click', function () {
    currentInput = "";
    inputs = [];
    updateDisplay('0');
  });

  // Handle history
  historyButton.addEventListener('click', function () {
    updateHistory();
  });
});


