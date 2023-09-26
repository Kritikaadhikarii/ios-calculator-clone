document.addEventListener('DOMContentLoaded', function () {
  let currentInput = "";
  let operator = "";
  let firstInput = "";

  // Get display element
  const display = document.getElementById('display');

  // Update display
  function updateDisplay(value) {
      display.textContent = value;
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
          if (firstInput === "") {
              firstInput = currentInput;
              currentInput = "";
              operator = e.target.textContent;
          }
      });
  });

  // Handle AC (All Clear)
  document.getElementById('clear').addEventListener('click', function () {
      currentInput = "";
      firstInput = "";
      operator = "";
      updateDisplay('0');
  });

  // Handle calculation (=)
  document.querySelectorAll('.operator').forEach(button => {
      if (button.textContent === "=") {
          button.addEventListener('click', function () {
              if (firstInput && currentInput && operator) {
                  let result = 0;
                  const num1 = parseFloat(firstInput);
                  const num2 = parseFloat(currentInput);

                  switch (operator) {
                      case '+':
                          result = num1 + num2;
                          break;
                      case '−':
                          result = num1 - num2;
                          break;
                      case '×':
                          result = num1 * num2;
                          break;
                      case '÷':
                          if (num2 !== 0) {
                              result = num1 / num2;
                          } else {
                              result = 'Error';
                          }
                          break;
                      default:
                          break;
                  }

                  updateDisplay(result);
                  firstInput = result;
                  currentInput = "";
              }
          });
      }
  });
});
