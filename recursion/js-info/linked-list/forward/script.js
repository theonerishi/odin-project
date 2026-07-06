const output = document.getElementById("output");

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

for (let x = list; x != null; x = x.next) {
  output.textContent += `${x.value}\n`;
}

function print(x) {
  if (x == null) {
    return;
  } else {
    output.textContent += `${x.value}\n`;
    x = x.next;
    print(x);
  }
}

print(list);
