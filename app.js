//const card = document.createElement('div');
const mainContent = document.getElementById('mainContent');

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
    mainContent.appendChild(card);
})




function generateCards(){
    for(let i = 0; i < numSquares*numSquares; i++){
        square.classList.add('square');
        square.style.width = `${600/numSquares}px`;
        square.style.height =`${600/numSquares}px`;
        container.appendChild(square.cloneNode(true));  
    }
}
