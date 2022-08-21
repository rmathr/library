//const card = document.createElement('div');
const mainContent = document.getElementById('mainContent');
const bookCards = document.getElementById('bookCards');
const addBook = document.getElementById('addBook');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookPages = document.getElementById('bookPages');
const bookRead = document.getElementById('bookRead');
const includeBook = document.getElementById('includeBook') ;



let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    }

Book.prototype.info = function(){
    return (`${this.title}`);
}

// ----------- test book ----------- 


const book1 = new Book("Winds of Winter","George R.R. Martin", 785, "not read");
const book2 = new Book("The Hobbit","J.R.R Tolkien", 324, "read");
const book3 = new Book("Stardust","Neil Gaiman", 217, "read");

book1.prototype = Object.create(Book.prototype);
book2.prototype = Object.create(Book.prototype);
book3.prototype = Object.create(Book.prototype);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);


// ----------- test book ----------- 

myLibrary.forEach(book => {
    //mainContent.append(book.title);
    const card = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `${book.author}`;
    bookPages.textContent = `${book.pages}`;
    bookRead.textContent = `${book.read}`;
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.classList.add('card');
    bookCards.appendChild(card);
})


addBook.addEventListener('click', () => {
    const bookSubmit = document.getElementById('bookSubmit')

    if (bookSubmit.style.display === 'none'){
        bookSubmit.style.display = 'grid';
    } else {
        bookSubmit.style.display = 'none';
    }
})

includeBook.addEventListener('click', e => {
    e.preventDefault();
})
