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
            screenOutput.textContent = '';
        }
        if (button.classList.contains('delete')) {
            if (afterEqual == true) return;
            screenInput.textContent = screenInput.textContent.split('').slice(0, -1).join('');
            if (screenInput.textContent == '') screenInput.textContent = '0';
        }
        if (button.classList.contains('exponent')) {
            screenInput.textContent = exponent(screenInput.textContent);
            screenOutput.textContent = '';
        }
        if (button.classList.contains('number')) {
            if (afterEqual == true) {
               screenOutput.textContent += ' ' + screenInput.textContent;
               screenInput.textContent = '';
               afterEqual = false;
            }
            if (screenInput.textContent == '0') screenInput.textContent = '';
            screenInput.innerHTML += button.textContent;
       }
       if (button.classList.contains('operator')) {
            if (screenInput.textContent == '0') return;
        //////////////////////////////
            if (operatorPressed == true) {
                let toBeCalculated = screenOutput.textContent;
                let splitToCalculate = toBeCalculated.trim().split(' ');
                a = parseInt(splitToCalculate[0]);
                b = (parseInt(screenInput.textContent))  
                operatorSign = splitToCalculate[1];
                operatorSignNext = button.textContent; 
                screenOutput.textContent = operate(a, b) + ' ' + operatorSignNext;
                screenInput.textContent = '';
                // operatorPressed = false;
             } else {
                operatorPressed = true;
                 //////////////////////////////
                if (screenOutput.textContent != '') screenOutput.textContent = '';
                screenOutput.innerHTML += screenInput.textContent +' '+ button.textContent;
                screenInput.textContent =''; 
         }
        
        }
        if (button.classList.contains('reset')) {
            screenInput.textContent = '0';
            screenOutput.textContent = '';
            operatorPressed = false;
        }
        if (button.classList.contains('equal')) {
          if (screenInput.textContent == '0') return;
          afterEqual = true;
          if (screenInput.textContent == operate(a,b))  return; 
          screenOutput.textContent += ' ' + screenInput.textContent;
          console.log(screenOutput.textContent)
          const toBeCalculated = screenOutput.textContent.trim();
          const splitToCalculate = toBeCalculated.split(' ').filter(e => {return e.replace(/(  )/g)})
          console.log (splitToCalculate)
          if (splitToCalculate[1] == undefined) {
              screenInput.textContent = splitToCalculate[0];
              console.log(screenInput.textContent)
              screenOutput.textContent = 'error';
          }
          a = parseFloat(splitToCalculate[0]);
          b = parseFloat(splitToCalculate[2]);
          operatorSign = splitToCalculate[1];
          screenInput.textContent = operate(a, b);
          operatorPressed = false;
        }
     })
 });
