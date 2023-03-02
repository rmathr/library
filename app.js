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
const read = document.getElementById('read')
const notRead = document.getElementById('notRead')
const toggleReadButton = document.getElementById('toggleReadButton')
let bookIsRead = true;

const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.elm = null
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
    clearInput()
})

newBook.addEventListener('submit', e => {
    e.preventDefault();
    saveBook()
    displayBooks(myLibrary)
    clearInput()
})

const clearInput = function (){
    bookTitleInput.value = ''
    bookAuthorInput.value = ''
    bookPagesInput.value = ''
    bookReadInput.checked = false
    bookIsRead = true
    read.classList.remove('read-not-read-select')
    notRead.classList.remove('read-not-read-select')
}

bookReadInput.addEventListener('change', () => {
    if (bookReadInput.checked) {
        bookIsRead = false;
        notRead.classList.add('read-not-read-select')
        read.classList.remove('read-not-read-select')
    } else {
        bookIsRead = true;
        read.classList.add('read-not-read-select')
        notRead.classList.remove('read-not-read-select')
    }
  });

const saveBook = function (){
    const bookInput = new Book(`${bookTitleInput.value}`,`${bookAuthorInput.value}`, `${bookPagesInput.value}`, bookIsRead)
    myLibrary.push(bookInput);
    handleBookForm ()
}

const displayBooks = function (myLib){
    document.querySelectorAll('.card').forEach(e => e.remove());
    myLib.forEach(book => {
        loopBooks(book)
    }) 
}

function loopBooks (book){
    const card = createElementWithClass('div', 'card')
    const bookTitle = createElementWithClass('p', 'book-title')
    const bookAuthor = createElementWithClass('p', 'book-author')
    const bookPages = createElementWithClass('p', 'book-pages')
    const bookDiv = createElementWithClass('div', 'book-div')
    const htmlDeleteButtonTag = `<button id="deleteButton"><i class="fa-regular fa-trash-can"></i></button>`;
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(htmlDeleteButtonTag, "text/html");
    const deleteBook = parsedDocument.getElementById("deleteButton");;
    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `by ${book.author}`;
    bookPages.textContent = `${book.pages} pages`;
    this.elm = createElementWithClass('button', 'toggle-button')
    this.elm.setAttribute('id', myLibrary.indexOf(book))
    this.elm.textContent = `${book.read? "Read" : "Not read"}`; 
    this.elm.setAttribute('class', `${book.read? "read-color" : "not-read-color"}`)
    this.elm.addEventListener('click',  e =>{
        e.preventDefault();
        book.changeReadStatus() 
    })
    deleteBook.addEventListener('click', e => {
        e.preventDefault();
        book.deleteBook()
    })
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    card.appendChild(bookDiv)
    card.appendChild(this.elm);
    card.appendChild(deleteBook);
    bookCards.appendChild(card);
}

function createElementWithClass(type, className){
    const element = document.createElement(type);
    element.classList.add(`${className}`)
    return element
}