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
const bookSubmit = document.getElementById('bookSubmit')
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
    } else {
        bookIsRead = true
    }
    this.read = bookIsRead
    displayBooks(myLibrary)
}


Book.prototype.deleteBook = function () {
    const index = myLibrary.indexOf(this);
    myLibrary.splice(index,1);
    displayBooks(myLibrary)
}


const handleBookForm = function (){
    if (bookSubmit.style.display === 'none'){
        bookSubmit.style.display = 'grid';
    } else {
        bookSubmit.style.display = 'none';
    }
}

addBook.addEventListener('click', e => {
    e.preventDefault();
    handleBookForm ()
})

newBook.addEventListener('submit', e => {
    e.preventDefault();
    saveBook()
    displayBooks(myLibrary)
})

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
        book.changeReadStatus()
    })
    const deleteBook = document.createElement('button');
    deleteBook.textContent = "Delete";
    deleteBook.addEventListener('click', e => {
        e.preventDefault();
        book.deleteBook()
    })
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.appendChild(toggleRead);
    card.appendChild(deleteBook);
    card.classList.add('card');
    bookCards.appendChild(card);  
}