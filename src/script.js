let myLibrary = []; //массив наших объектов книг
let p = 0; //параметр который отвечает за количество удаляемых объектов (используется для того чтобы была одна функция при добавлении и изменении объектов)
let iden; //параметр который отвечает за id объекта, если мы добавляем новый, этот параметр становится равнм размеру массимва для того чтобы добавить элемент в конец массива
const hidden = document.querySelector(`.hidden`);
hidden.style.display = `none`; //скрываем форму при запуске

const cancel = document.querySelector(`#cancel`);
cancel.addEventListener(`click`, changeVisibleForm); //скрываем форму

const send = document.querySelector(`#send`);
send.addEventListener('click', addBook) //добавляем книгу

const buttonAdd = document.querySelector(`#button_add`);
buttonAdd.addEventListener(`click`, changeVisibleForm); //открываем форму


function delElem(e) { //функция удаления элемента
    myLibrary.splice(e.target.parentElement.dataset.id, 1)
    books.innerHTML = ``;
    render();
}

function editElem(e) { //функция редактирования элемента
    const id = e.target.parentElement.dataset.id;
    document.querySelector('[name="title"]').value = myLibrary[id].title;
    document.querySelector('[name="author"]').value = myLibrary[id].author;
    document.querySelector('[name="pages"]').value = myLibrary[id].pages;
    changeVisibleForm();
    p = 1;
    iden = id;
}

function changeRead(e) { //функция изменяющая статус книги
    const id = e.target.parentElement.dataset.id;
    if (myLibrary[id].read === 0) {
        myLibrary[id].read = 1;
    } else {
        myLibrary[id].read = 0;
    }
    books.innerHTML = ``;
    render();

}

function Book(title, author, pages, read, info) { //конструктор объекта
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title}<br> ${this.author}<br> кол-во страниц : ${this.pages}<br> ${this.read===0 ? 'еще не прочитана' : 'уже прочитана'}`;
    }
}

function addBookToLibrary(book) { //добавление объектов в массив
    myLibrary.splice(iden, p, book);

}

function changeVisibleForm() { //изменение видимости формы
    if (hidden.style.display === `none`) {
        hidden.style.display = `flex`;
    } else if (hidden.style.display === `flex`) {
        hidden.style.display = `none`;
    }
}

function addBook() { //добавление книг
    addBookToLibrary(new Book(document.querySelector('[name="title"]').value, document.querySelector('[name="author"]').value, +document.querySelector('[name="pages"]').value, +document.querySelector(`input[name="read"]:checked`).value));
    books.innerHTML = ``;
    render();
    changeVisibleForm();
}


const books = document.querySelector(`#books`);

function render() { //функция вывода на экран

    myLibrary.forEach(function (item, i, arr) {
        const div = document.createElement(`div`);
        books.appendChild(div);
        div.classList.add(`book`);
        div.dataset.id = i;
        div.innerHTML = arr[i].info() + `<button class="edit">Изменить</button><button class="del">Удалить</button><button class="read">Прочитана</button>`;
    });
    const dels = document.querySelectorAll(`.del`);
    dels.forEach(del => del.addEventListener('click', delElem));
    const edits = document.querySelectorAll(`.edit`);
    edits.forEach(edit => edit.addEventListener('click', editElem));
    const reads = document.querySelectorAll(`.read`);
    reads.forEach(read => read.addEventListener(`click`, changeRead))
    iden = myLibrary.length;
    p = 0;
}
render();
