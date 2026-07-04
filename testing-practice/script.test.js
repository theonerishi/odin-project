function capitalize(str) {
	if (typeof str !== 'string' || str.length === 0) return str; // error input
	return str[0].toUpperCase() + str.slice(1); // create new string as string immutable
}

console.log(capitalize('hello world'));

// Reverse a string
function reverseString(str) {
	if (typeof str !== 'string') return '';
	return str.split('').reverse().join(''); //make a array, reverse it and join
}

// Calculator object with basic operations
const calculator = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	divide: (a, b) => a / b,
	multiply: (a, b) => a * b, // functions can be accessed with . operator
};

// Caesar cipher
function shiftChar(ch, shift) {
	const isUpper = ch >= 'A' && ch <= 'Z'; // upper and lower case need to be separate as they have a different range of ascii values
	const isLower = ch >= 'a' && ch <= 'z';
	if (!isUpper && !isLower) return ch; // no change if not an alphabet

	const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0); // value to subtract depends on whether the letter is upper or lower case
	const code = ch.charCodeAt(0) - base; // we use code to index the alphabet array
	const wrapped = (code + shift) % 26; // applies shift and wraps if > 26
	return String.fromCharCode(base + wrapped);
}

function caesarCipher(str, shift) {
	if (typeof str !== 'string') return '';
	// normalize shift to number within 0-25
	const s = Number(shift) || 0;
	let out = '';
	for (const ch of str) {
		out += shiftChar(ch, s); // applies shift to character
	}
	return out;
}

// Analyze array
function analyzeArray(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return null;
	const length = arr.length;
	let sum = 0;
	let min = arr[0];
	let max = arr[0];
	for (const n of arr) {
		sum += n;
		if (n < min) min = n;
		if (n > max) max = n; // linear search
	}
	const average = sum / length;
	return { average, min, max, length };
}

it('works', () => {
	expect(1).toBe(1);
})

it('capitalize', () => {
	expect(capitalize('hello')).toBe('Hello');
})

it('reverseString', () => {
	expect(reverseString('hello')).toBe('olleh');
})

it('calculator', () => {
	expect(calculator.add(1, 2)).toBe(3);
	expect(calculator.subtract(3, 3)).toBe(0);
	expect(calculator.divide(10,2)).toBe(5);
	expect(calculator.multiply(3,2)).toBe(6);
})

it('caesarCipher', () => {
	expect(caesarCipher('hello', 3)).toBe('khoor');
})

it('analyzeArray', () => {
	let resultArr = analyzeArray([1,2,3,4]);
	// `analyzeArray` returns an object: { average, min, max, length }
	expect(resultArr.average).toBe(2.5);
	expect(resultArr.min).toBe(1);
	expect(resultArr.max).toBe(4);
	expect(resultArr.length).toBe(4);
})