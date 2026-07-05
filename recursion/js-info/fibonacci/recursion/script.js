function fibonacci(n) {
    if (n <= 2) return 1;

    let a = 1;
    let b = 1;
    let c = 1;

    for (let i = 3; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }

    return c;
}

function fibonacci2(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci2(n - 1) + fibonacci2(n - 2); 
    }
}

const output = document.getElementById('output');

let x;
do {
    x = Number(prompt('enter a number'));
} while (x < 1 || Number.isNaN(x));

output.textContent = `Fibonacci result: ${fibonacci(x)} \n Fibonacci2 result: ${fibonacci2(x)}`;