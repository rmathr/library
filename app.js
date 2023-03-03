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

//book constructor.
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.elm = null
    }

//function inherited by all book objects. Responsible for handling the toggle of read-not-read status of the books.
Book.prototype.changeReadStatus = function (){
    if(this.read){
        bookIsRead = false
    } else {
        bookIsRead = true
    }
    this.read = bookIsRead
    displayBooks(myLibrary)
}

//function inherited by all book objects. Responsible for handling the deletion of data for a specific book object.
Book.prototype.deleteBook = function () {
    const index = myLibrary.indexOf(this);
    myLibrary.splice(index,1);
    displayBooks(myLibrary)
}

//this function makes the form appear/disappear.
const handleBookForm = function (){
    if (bookSubmit.style.display === 'none'){
        bookSubmit.style.display = 'grid';
    } else {
        bookSubmit.style.display = 'none';
    }
}

//this button makes the form appear/disappear and clears the form.
addBook.addEventListener('click', e => {
    e.preventDefault();
    handleBookForm ()
    clearInput()
})

//this button call 3 functions: get user input, display that input on DOM and clear the form.
newBook.addEventListener('submit', e => {
    e.preventDefault();
    saveBook()
    displayBooks(myLibrary)
    clearInput()
})

//clear the form after input.
const clearInput = function (){
    bookTitleInput.value = ''
    bookAuthorInput.value = ''
    bookPagesInput.value = ''
    bookReadInput.checked = false
    bookIsRead = true
    read.classList.remove('read-not-read-select')
    notRead.classList.remove('read-not-read-select')
}

//change the style read-not-read toggle switch.
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

//this function create a new book object using the Book constructor (getting the form's input) and saves it in the myLibrary array.
const saveBook = function (){ 
    const bookInput = new Book(`${bookTitleInput.value}`,`${bookAuthorInput.value}`, `${bookPagesInput.value}`, bookIsRead)
    myLibrary.push(bookInput);
    handleBookForm ()
}

//this function has two actions:  1) removes cards already printed from the DOM 
// 2) Call loopBooks() on all book objects saved on the array.
const displayBooks = function (myLib){
    document.querySelectorAll('.card').forEach(e => e.remove()); 
    myLib.forEach(book => {
        loopBooks(book)
    }) 
}

//this function creates all the elements which are used in the cards, 
//assigning the values from the book object to the correct field.
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

//simple function which creates a dom element and assign it with a class.
function createElementWithClass(type, className){
    const element = document.createElement(type);
    element.classList.add(`${className}`)
    return element
}