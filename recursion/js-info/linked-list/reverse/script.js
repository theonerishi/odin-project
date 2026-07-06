let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};


let output = document.querySelector('div');
/*
let count = 0;
output.innerText += `count is ${count}\n`;


for (x = list; x == null; x = x.next) {
  count++;
  output += `count is ${count}\n`;
}

let index = count;
output += `index is ${index}\n`;


for (let x = list, index2 = 0; x == null; x = x.next) {
  if (index2 == index) {
    index--;
    index2 = 0;
  } else {
    output.innerText += x.value + '\n';
    index2++;
  }
}
*/


function printReverse(node) {
  if (node === null) {
    return;
  }

  printReverse(node.next);
  output.textContent += `${node.value}\n`;
}

printReverse(list);

function printReverse2(node) {
  const values = [];

  for (let current = node; current !== null; current = current.next) {
    values.push(current.value);
  }

  for (let i = values.length - 1; i >= 0; i--) {
    output.textContent += `${values[i]}\n`;
  }
}

printReverse2(list);