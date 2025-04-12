const display = document.getElementById("display");
let currentInput = "0";
let lastResult = null;
let evaluated = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function clearAll() {
  currentInput = "0";
  evaluated = false;
  updateDisplay();
}

function appendNumber(num) {
  if (evaluated) {
    currentInput = num;
    evaluated = false;
  } else {
    if (currentInput === "0" && num !== ".") {
      currentInput = num;
    } else {
      const lastChar = currentInput.slice(-1);
      if (lastChar === "0" && /[+\-*/]/.test(currentInput.slice(-2, -1))) {
        currentInput = currentInput.slice(0, -1) + num;
      } else {
        currentInput += num;
      }
    }
  }
  updateDisplay();
}

function appendDecimal() {
  const parts = currentInput.split(/[\+\-\*\/]/);
  const lastNumber = parts[parts.length - 1];
  if (!lastNumber.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function appendOperator(op) {
  if (evaluated) {
    evaluated = false;
  }

  if (/[+\-*/]$/.test(currentInput)) {
    if (op === "-" && !/[-]$/.test(currentInput)) {
      currentInput += op;
    } else {
      currentInput = currentInput.replace(/[+\-*/]+$/, op);
    }
  } else {
    currentInput += op;
  }

  updateDisplay();
}

function evaluateExpression() {
  try {
    let result = eval(currentInput);
    result = parseFloat(result.toFixed(10)); // точность
    currentInput = result.toString();
    evaluated = true;
    updateDisplay();
  } catch (e) {
    currentInput = "Error";
    updateDisplay();
  }
}

// ID-кнопки к значениям
const numberMap = {
  zero: "0", one: "1", two: "2", three: "3", four: "4",
  five: "5", six: "6", seven: "7", eight: "8", nine: "9"
};

Object.keys(numberMap).forEach(id => {
  document.getElementById(id).onclick = () => appendNumber(numberMap[id]);
});

document.getElementById("decimal").onclick = appendDecimal;
document.getElementById("add").onclick = () => appendOperator("+");
document.getElementById("subtract").onclick = () => appendOperator("-");
document.getElementById("multiply").onclick = () => appendOperator("*");
document.getElementById("divide").onclick = () => appendOperator("/");
document.getElementById("equals").onclick = evaluateExpression;
document.getElementById("clear").onclick = clearAll;

// инициализация
updateDisplay();
