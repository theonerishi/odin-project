
let x;
let sum = 0;


do {
   x = Number(prompt("enter a number"));
} while (Number.isNaN(x) || x < 0);


for (let i = 1; i <= x; i++) {
   sum += i;
}

alert(sum)




