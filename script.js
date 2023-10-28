// basic math functions//
function add (a, b){
    return a+b;
};

function subtract (a, b){
    return a-b;
};

function multiply (a, b) {
    return a*b;
};

function divide (a, b) {
    return a / b;
};

//some constants for screen, for buttons.
const screenInput = document.querySelector('.screenInput');
const screenOutput = document.querySelector('.screenOutput');
const buttons = document.querySelectorAll('.button');

// flag for reset screen when button pressed after user press equal sign.
let afterEqual = false;

// functions for buttons clicks.
buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('number')) {
        if (afterEqual == true) {
            screenInput.textContent = '';
            afterEqual = false;
        }
        if (screenInput.textContent == '0') screenInput.textContent = '';
        screenInput.innerHTML += button.textContent
      }
      if (button.classList.contains('operator')) {
        if (screenOutput.textContent != '') screenOutput.textContent = '';
        screenOutput.innerHTML += screenInput.textContent +' '+ button.textContent;
        screenInput.textContent ='';
      }
      if (button.classList.contains('reset')) {
        screenInput.textContent = '';
        screenOutput.textContent = '';
      }
      if (button.classList.contains('equal')) {
        afterEqual = true;
        screenOutput.innerHTML += ' ' + screenInput.textContent;
        const toBeCalculated = screenOutput.textContent;
        const splitToCalculte = toBeCalculated.split(' ');
        const a = parseInt(splitToCalculte[0]);
        const b = parseInt(splitToCalculte[2]);
        const operatorSign = splitToCalculte[1];
        if (operatorSign == '+') {
            screenInput.textContent = add (a, b);
        } else if (operatorSign == '-') {
            screenInput.textContent = subtract(a, b);
        } else if (operatorSign == 'x') {
            screenInput.textContent = multiply(a, b);
        } else if (operatorSign == '/') {
            screenInput.textContent = divide(a, b);
        }
      }
    })
});
