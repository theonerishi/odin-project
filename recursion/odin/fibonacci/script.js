function fib(n) {
    if (n <= 1) {
        return 0;
    } else if (n == 2) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}
document.body.innerText += fib(5) + '\n';
function fib2(n) {
    let arr = [0, 1];
    if (n > 2) {
        for (let i = 0; i < n - 2; i++) {
            arr.push(arr[i] + arr[i + 1]);            
        }
    }
    return arr[arr.length - 1];
}
document.body.innerText += fib2(5);