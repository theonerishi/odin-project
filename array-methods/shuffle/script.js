let arr = [1, 2, 3];

console.log(Math.random());

function shuffle(arr) {
    let arr2 = [];
    let rnd; 
    console.log(`arr.length is ${arr.length}`);
    let arrlength = arr.length; //array length is not constant so we store length in a variable
    for(let i = 0; i < arrlength; i++) {
        console.log(`i is ${i}`);
        rnd = Math.floor(Math.random() * 2) + 1; // generates random number 1 or 2
        console.log(rnd);
        if(rnd == 1) { // appends numbers either at the start or end to shuffle simpler shuffle however it may not be uniform alternatives are using the sort function or fisher yates
            console.log(`entered rnd == 1`);
            arr2.unshift(arr.pop()); 
            console.log(arr);
            console.log(arr2);
        } else {
            console.log(`entered else`);
            arr2.push(arr.pop());
            console.log(arr);
            console.log(arr2);
        }
    }
    return arr2;
}

console.log(shuffle(arr));