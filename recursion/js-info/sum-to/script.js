let x;
do {
   x = Number(prompt('enter a number'));
} while(x < 0 || Number.isNaN(x));
function fact(x) {
   if (x == 1) {
       return x;
   } else {
       return x * fact(x - 1);
   }
}
alert(fact(x));