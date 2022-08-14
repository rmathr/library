


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
book1.prototype = Object.create(Book.prototype);
myLibrary.push(book1);


// ----------- test book ----------- 



