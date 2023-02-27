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
    console.log(bookInput)
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
    const card = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookTitleLabel = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookAuthorLabel = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookPagesLabel = document.createElement('p');
    const bookRead = document.createElement('p');
    const bookReadLabel = document.createElement('p');
    const bookDivTitle = document.createElement('div');
    const bookDivAuthor = document.createElement('div');
    const bookDivPages = document.createElement('div');
    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `${book.author}`;
    bookPages.textContent = `${book.pages}`;
    bookRead.textContent = `${book.read}`;
    bookTitleLabel.textContent = "Title"
    bookAuthorLabel.textContent = "Author"
    bookPagesLabel.textContent = "Pages"
    bookReadLabel.textContent = "Book read?"
    const toggleRead = document.createElement('button');
    toggleRead.id = "toggleReadButton"
    toggleRead.textContent = `${book.read? "Read" : "Not read"}`; 
    toggleRead.addEventListener('click',  e =>{
        e.preventDefault();
        book.changeReadStatus()
    })
    const html = `<button id="deleteButton"><i class="fa-regular fa-trash-can"></i></button>`;
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(html, "text/html");
    const deleteBook = parsedDocument.getElementById("deleteButton");;
    deleteBook.addEventListener('click', e => {
        e.preventDefault();
        book.deleteBook()
    })
    bookDivTitle.appendChild(bookTitleLabel);
    bookDivTitle.appendChild(bookTitle);
    card.appendChild(bookDivTitle)
    bookDivAuthor.appendChild(bookAuthorLabel);
    bookDivAuthor.appendChild(bookAuthor);
    card.appendChild(bookDivAuthor)
    bookDivPages.appendChild(bookPagesLabel);
    bookDivPages.appendChild(bookPages);
    card.appendChild(bookDivPages)
    card.appendChild(toggleRead);
    card.appendChild(deleteBook);
    card.classList.add('card');
    bookCards.appendChild(card);  
}


