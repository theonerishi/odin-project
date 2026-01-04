const myLibrary = [];
class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages long is ${this.read ? 'read' : 'not read'}`
    }
}/*
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages long, is ${this.read ? 'read' : 'not read'}`;
    }
}
    */
function addBookToLibrary(book) {
    let id = crypto.randomUUID();
    book.id = id;
    myLibrary.push(book);
}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info());
addBookToLibrary(theHobbit);
const nineteenEightyFour = new Book('1984', 'George Orwell', 328, true);
addBookToLibrary(nineteenEightyFour);
console.log(myLibrary);
const div = document.createElement('div');
const input = document.createElement('input');
let inputString = '';
input.type = 'text';
input.placeholder = 'Enter book title';
const inputAuthor = document.createElement('input');
inputAuthor.type = 'text';
inputAuthor.placeholder = 'Enter book author';
const inputPages = document.createElement('input');
inputPages.type = 'number';
inputPages.placeholder = 'Enter number of pages';
const inputRead = document.createElement('input');
inputRead.type = 'checkbox';
const readLabel = document.createElement('label');
readLabel.innerText = 'Read';
document.body.appendChild(input);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(inputAuthor);
document.body.appendChild(document.createElement('br'))
document.body.appendChild(inputPages);
document.body.appendChild(document.createElement('br'))
document.body.appendChild(inputRead);
document.body.appendChild(readLabel);
document.body.appendChild(document.createElement('br'))
const button = document.createElement('button');
button.innerText = 'Add Book';
document.body.appendChild(button);
document.body.appendChild(div);

// Function to render all books
function renderBooks() {
    div.innerHTML = ''; // Clear the div
    for (let book of myLibrary) {
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('data-id', book.id);
        
        const bookInfo = document.createElement('span');
        bookInfo.textContent = book.info();
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Book';
        removeButton.addEventListener('click', () => removeBook(book.id));
        
        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(removeButton);
        div.appendChild(bookDiv);
        // div.appendChild(document.createElement('br'));
    }
}

// Function to remove a book
function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        renderBooks(); // Re-render after removal
    }
}

// Add event listener to the add button
button.addEventListener('click', () => {
    const title = input.value.trim();
    const author = inputAuthor.value.trim();
    const pages = parseInt(inputPages.value);
    const read = inputRead.checked;
    
    if (title && author && pages > 0) {
        const newBook = new Book(title, author, pages, read);
        addBookToLibrary(newBook);
        renderBooks(); // Re-render after adding
        
        // Clear inputs
        input.value = '';
        inputAuthor.value = '';
        inputPages.value = '';
        inputRead.checked = false;
    }
});

// Initial render
renderBooks();