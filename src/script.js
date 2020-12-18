let myLibrary = [];
function Book(title, author, pages, read, info){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.c = read;
    this.info = function(){
        return `${title}, ${author}, ${pages} страниц ${read==0 ? 'еще не прочитана' : 'уже прочитана'}`;
    }
}
function addBookToLibrary(book) {
 myLibrary.push(book);
}
addBookToLibrary(new Book (`Название1`, `Автор1`, 1, false));
addBookToLibrary(new Book (`Название2`, `Автор2`, 2, true));
console.log(myLibrary[0].info());
console.log(myLibrary[1].info());
console.log(myLibrary);