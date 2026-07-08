
let x;
let sum = 0;
do {
   x = Number(prompt('enter a number'));
} while ( x < 0 || Number.isNaN(x))
function sumTo(n) {
   if (n == 1) {
       return n;
   } else {
       return n + sumTo(n-1);
   }
}
alert(sumTo(x));