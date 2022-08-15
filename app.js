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

book1.prototype = Object.create(Book.prototype);
book2.prototype = Object.create(Book.prototype);

myLibrary.push(book1);
myLibrary.push(book2);


// ----------- test book ----------- 

myLibrary.forEach(book => {
    //mainContent.append(book.title);
    const card = document.createElement('div');
    card.textContent = `${book.title}`;
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
