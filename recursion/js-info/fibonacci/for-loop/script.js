let x;
do {
    x = Number(prompt('enter a number'));
} while (x < 1 || Number.isNaN(x));

function fibonacci(x) {
    let arr = [1, 1];
    x -= 1;
    for (let i = 1; i < x; i++) {
        arr.push(arr[i] + arr[i - 1]);
    }             
    return arr[x];
}

document.body.innerText += fibonacci(x);