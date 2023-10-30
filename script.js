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
let splitToCalculate = '';
// flag for reset screen when button pressed after user press equal sign.
let afterEqual = false;
//////////
let operatorPressed = false;
//////////
// functions for buttons clicks.
buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
        if (button.classList.contains('dot')) {
            if (screenInput.textContent.includes('.')) return;
            screenInput.textContent += '.';
            afterEqual = false;
        }
        if (button.classList.contains('squareRoot')) {
            screenInput.textContent = squareRoot(screenInput.textContent)
            screenOutput.textContent = '';
            afterEqual = false;
            operatorPressed = false;
        }
        if (button.classList.contains('delete')) {
            if (afterEqual == true) return;
            screenInput.textContent = screenInput.textContent.split('').slice(0, -1).join('');
            if (screenInput.textContent == '') screenInput.textContent = '0';
        }
        if (button.classList.contains('exponent')) {
            screenInput.textContent = exponent(screenInput.textContent);
            screenOutput.textContent = '';
            afterEqual = false;
            operatorPressed = false;
        }
        if (button.classList.contains('number')) {
            if (screenInput.textContent == operate(a,b) && afterEqual == true) {
                screenInput.textContent = '';  
                screenOutput.textContent = '';
                afterEqual = false;
            }
            if (afterEqual == true) {
               screenOutput.textContent += ' ' + screenInput.textContent;
               screenInput.textContent = '';
               afterEqual = false;
            }
            if (screenInput.textContent == '0') {
                screenInput.textContent = button.textContent;
                screenOutput.textContent = '';
                return;
            }
            screenInput.innerHTML += button.textContent;
        
       }
       if (button.classList.contains('operator')) {
        if (screenInput.textContent == 'Infinity') return;
            if (screenInput.textContent == '0' && button.classList.contains('minus')) {
                screenInput.innerHTML = '-';
                return;
            }
            if (screenInput.textContent == '-' && (button.classList.contains('plus')
                                               || button.classList.contains('minus'))) {
                screenInput.textContent = '0';
                return;
            }
            if (screenInput.textContent == '0' && (button.classList.contains('plus')
                                               || button.classList.contains('multiply')
                                               || button.classList.contains('divide'))
                                            ) return; 

            if (operatorPressed == true) {
                let toBeCalculated = screenOutput.textContent;
                let splitToCalculate = toBeCalculated.trim().split(' ');
                a = parseInt(splitToCalculate[0]);
                b = (parseInt(screenInput.textContent))
                
                operatorSign = splitToCalculate[1];
                operatorSignNext = button.textContent;
                if (!(isNaN(a)) && !(isNaN(b))) {
                screenOutput.textContent = operate(a, b) + ' ' + operatorSignNext;
                screenInput.textContent = '';
                } else {
                    screenOutput.textContent = a + ' ' + operatorSignNext
                }
             } else {
                operatorPressed = true;
                if (screenOutput.textContent != '') screenOutput.textContent = '';
                if (screenInput.textContent.charAt(screenInput.textContent.length-1) == '.') {
                    screenInput.textContent = screenInput.textContent.replace('.', '')
                }
                screenOutput.textContent += screenInput.textContent +' '+ button.textContent;
                screenInput.textContent =''; 
            
         }
        
        }
        if (button.classList.contains('reset')) {
            screenInput.textContent = '0';
            screenOutput.textContent = '';
            operatorPressed = false;
            afterEqual = false;
        }

        if (button.classList.contains('equal')) { 
           if (screenInput.textContent == '0' && screenOutput.textContent == '') return;
           if (screenInput.textContent == 'Infinity') return;
           if(screenOutput.textContent.trim().split(' ').length >= 3) return;
          afterEqual = true;
          screenOutput.textContent += ' ' + screenInput.textContent;
          toBeCalculated = screenOutput.textContent.trim();
          splitToCalculate = toBeCalculated.split(' ').filter(e => {return e.replace(/(  )/g)})
          if (splitToCalculate[2] == undefined) return;
          if (splitToCalculate[1] == undefined) {
              screenInput.textContent = screenOutput.textContent;
              screenOutput.textContent = '';
              afterEqual=false;
              return;
          }
          a = parseFloat(splitToCalculate[0]);
          b = parseFloat(splitToCalculate[2]);
          operatorSign = splitToCalculate[1];
          screenInput.textContent = operate(a, b);
          operatorPressed = false;
        }
     })
 });
