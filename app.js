//const card = document.createElement('div');
const mainContent = document.getElementById('mainContent');
const bookCards = document.getElementById('bookCards');
const addBook = document.getElementById('addBook');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');
const bookPagesInput = document.getElementById('bookPages');
const bookReadInput = document.getElementById('bookRead');
const includeBook = document.getElementById('includeBook');
const newBook = document.getElementById('newBook');
let bookIsRead = true;



const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    }

Book.prototype.info = function(){
    return (`${this.title}`);
}

Book.prototype.changeReadStatus = function (){
    if(this.read){
        bookIsRead = false
        console.log(bookIsRead)
    } else {
        bookIsRead = true
        console.log(bookIsRead)
    }
}

// ----------- test book ----------- 

// const book1 = new Book("Winds of Winter","George R.R. Martin", 785, "not read");
// const book2 = new Book("The Hobbit","J.R.R Tolkien", 324, "read");
// const book3 = new Book("Stardust","Neil Gaiman", 217, "read");


// book1.prototype = Object.create(Book.prototype);
// book2.prototype = Object.create(Book.prototype);
// book3.prototype = Object.create(Book.prototype);

// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);

// ----------- test book ----------- 

addBook.addEventListener('click', () => {
    const bookSubmit = document.getElementById('bookSubmit')

    if (bookSubmit.style.display === 'none'){
        bookSubmit.style.display = 'grid';
    } else {
        bookSubmit.style.display = 'none';
    }
})

newBook.addEventListener('submit', e => {
    e.preventDefault();
    saveBook()
    displayBooks(myLibrary)
})



//const blackColorSelector = document.querySelector('input[type=checkbox]');
bookReadInput.addEventListener('change', () => {
    if (bookReadInput.checked) {
        console.log("Checkbox is checked..");
        //console.log(bookReadInput.value);
        bookIsRead = false;
    } else {
        console.log("Checkbox is not checked..");
        //console.log(bookReadInput.value);
        bookIsRead = true;
    }
  });


const saveBook = function (){
    const bookInput = new Book(`${bookTitleInput.value}`,`${bookAuthorInput.value}`, `${bookPagesInput.value}`, bookIsRead)
    console.log(bookInput)
    myLibrary.push(bookInput);
}

const displayBooks = function (myLib){
    document.querySelectorAll('.card').forEach(e => e.remove());
    myLib.forEach(book => {
        loopBooks(book) 
    }) 
}

const createButton = function (buttonName){
     window[buttonName] = document.createElement('button');
        buttonName.textContent = "Test";

        buttonName.addEventListener('click',  e =>{
            e.preventDefault();
            console.log("Teste");
            //this.changeReadStatus()
        })
}


function loopBooks (book){
    const card = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `${book.author}`;
    bookPages.textContent = `${book.pages}`;
    bookRead.textContent = `${book.read}`;
    const toggleRead = document.createElement('button');
    toggleRead.textContent = "Test";
    toggleRead.addEventListener('click',  e =>{
        e.preventDefault();
        console.log(book.title);
        book.changeReadStatus()
    })
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.appendChild(toggleRead);
    card.classList.add('card');
    bookCards.appendChild(card);  
}