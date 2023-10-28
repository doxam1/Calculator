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

function exponent (a) {
    return (a**2);
}
function squareRoot (a) {
    return Math.sqrt(a);
}

const operate = function (){
if (operatorSign == '+') {
    return add (a, b);
} else if (operatorSign == '-') {
    return subtract(a, b);
} else if (operatorSign == 'x') {
    return multiply(a, b);
} else if (operatorSign == '/') {
    return divide(a, b);
}};
//some constants for screen, for buttons.
const screenInput = document.querySelector('.screenInput');
const screenOutput = document.querySelector('.screenOutput');
const buttons = document.querySelectorAll('.button');
let a = '';
let b = '';
let operatorSign = '';
// flag for reset screen when button pressed after user press equal sign.
let afterEqual = false;
//////////
let operatorPressed = false;
//////////
// functions for buttons clicks.
buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
        if (button.classList.contains('dot')) {
            screenInput.textContent += '.';
        }
        if (button.classList.contains('squareRoot')) {
            screenInput.textContent = squareRoot(screenInput.textContent)
        }
        if (button.classList.contains('delete')) {
            if (afterEqual == true) return;
            screenInput.textContent = screenInput.textContent.split('').slice(0, -1).join('');
            if (screenInput.textContent == '') screenInput.textContent = '0';
        }
        if (button.classList.contains('exponent')) {
            screenInput.textContent = exponent(screenInput.textContent);
        }
        if (button.classList.contains('number')) {
            if (afterEqual == true) {
               screenInput.textContent = '';
              afterEqual = false;
            // operatorPressed = false;
        }
        //////////
        
        //////////
        if (screenInput.textContent == '0') screenInput.textContent = '';
        screenInput.innerHTML += button.textContent
      }
      if (button.classList.contains('operator')) {
        //////////////////////////////
        if (operatorPressed == true) {
            const toBeCalculated = screenOutput.textContent;
            const splitToCalculate = toBeCalculated.split(' ');
            // console.log(splitToCalculate)
            a = parseInt(splitToCalculate[0]);
            b = (parseInt(screenInput.textContent))
            operatorSign = splitToCalculate[1];
            button.addEventListener('click', (e) => {
                console.log(e.target.textContent)
                operatorSign = e.target.textContent;
                splitToCalculate[1] = e.target.textContent;
            })            
            screenOutput.textContent = operate(a, b) + ' ' + operatorSign;
            screenInput.textContent = '';
            // operatorPressed = false;
          } else {
        operatorPressed = true;
        //////////////////////////////
        if (screenOutput.textContent != '') screenOutput.textContent = '';
        screenOutput.innerHTML += screenInput.textContent +' '+ button.textContent;
        screenInput.textContent =''; }
      }
      if (button.classList.contains('reset')) {
        screenInput.textContent = '0';
        screenOutput.textContent = '';
        operatorPressed = false;
      }
      if (button.classList.contains('equal')) {
        afterEqual = true;
        screenOutput.innerHTML += ' ' + screenInput.textContent;
        const toBeCalculated = screenOutput.textContent;
        const splitToCalculte = toBeCalculated.split(' ');
        a = parseFloat(splitToCalculte[0]);
        b = parseFloat(splitToCalculte[2]);
        operatorSign = splitToCalculte[1];
        screenInput.textContent = operate(a, b);
        operatorPressed = false;
      }
    })
});
