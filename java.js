// holds the data

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};


const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};


function updateDisplay() {
  const display = document.getElementById('displayNumbers');
  display.value = calculator.displayValue;
}


function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
}


function inputDecimal(point) {
  if (!calculator.displayValue.includes(point)) {
    calculator.displayValue += point;
  }
}


function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (calculator.operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (calculator.operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[calculator.operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}


function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function resetNumber() {
  calculator.displayValue = '0';
  calculator.waitingForSecondOperand = true;
}

function inputPlusMinus() {
  const { displayValue } = calculator;
  calculator.displayValue = parseFloat(displayValue) > 0 ? 
    -displayValue : Math.abs(displayValue);
}


const keys = document.getElementById('container');

keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('operators')) {
    console.log('operator', target.value);
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('allClearBtn')) {
    console.log('All Clear');
    resetCalculator();
    updateDisplay();
    return;
  }
  if (target.classList.contains('clearBtn')) {
    console.log('Clear');
    resetNumber();
    updateDisplay();
    return;
  }
  if (target.classList.contains('itemNumbers')) {
    console.log('digit', target.value);
    inputDigit(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('plusMinus')) {
    console.log('Plus minus clicked');
    inputPlusMinus();
    updateDisplay();
    return;
  }
  if (target.classList.contains('decimal')) {
    console.log('decimal', target.value);
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
 
});

window.addEventListener('keydown', (event) => {
  const key = document.querySelector(`button[data-key="${event.keyCode}"]`)
  if (!key) return;

  if (key.classList.contains('operators')) {
    console.log('operator', key.value);
    handleOperator(key.value);
    updateDisplay();
    return;
  }
   if (key.classList.contains('itemNumbers')) {
    console.log('digit', key.value);
    inputDigit(key.value);
    updateDisplay();
    return;
  }

  if (key.classList.contains('decimal')) {
    console.log('decimal', key.value);
    inputDecimal(key.value);
    updateDisplay();
    return;
  }
});

