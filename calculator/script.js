let div = document.querySelector('#answer');
let form = document.querySelector('form');
//let input = document.querySelector('input[type="text"]');
let equalsButton = document.querySelector('#equals');
let buttons = document.querySelectorAll('button');
str = '';

function calculate(str) {
    // calculate function that calculates and returns answer there must be spaces in input
    let [n1, operator, n2] = str.split(' '); 
    n1 = Number(n1);
    n2 = Number(n2);
    if (operator === '+') return n1 + n2; // performs calculation depending on operator
    if (operator === '-') return n1 - n2;
    if (operator === '*') return n1 * n2;
    if (operator === '/') return n1 / n2;
    return 'Invalid input';
}


buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            let x = button.innerText.trim(); // trim spaces on end
            if (!isNaN(Number(button.innerText))) { // non numbers will convert to NaN but if there is a number then enter the if statement
                str += button.innerText; // add button text to string
            }
            if (['+', '-', '*', '/'].includes(x)) {
                str += ` ${x} `; // if there is an operator add spaces to allow multi digit operation
            }
            div.innerText = str; // display calculation / result
        });
});

equalsButton.addEventListener('click', (e) => {
    e.preventDefault();
    div.innerText = Number(calculate(str)); // calculate when equals button is pressed and display
    str = div.innerText;
});

let c = document.querySelector('#c');

c.addEventListener('click', (e) => {
    e.preventDefault();
    str = '';
    div.innerText = ''; // reset if clear button pressed
});
