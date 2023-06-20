
const loadBtn = document.getElementById('loadBooks');

const submitBtn = document.querySelector('form button');
const tbody = document.querySelector('tbody');
const authorInp = document.querySelector('input[name="author"]');
const titleInp = document.querySelector('input[name="title"]');

const createForm = document.querySelector('#createForm');
const editForm = document.querySelector('#editForm');

loadBooks()

loadBtn.addEventListener('click', loadBooks);
createForm.addEventListener('submit', OnCreate);
tbody.addEventListener('click', onTableClick);
editForm.addEventListener('click', onEditSubmit);

async function onTableClick(e) {
    e.preventDefault();

    if (e.target.className == 'delete') {
        onDelete(e.target);
    }
    else if (e.target.className == 'edit') {
        onEdit(e.target);
    }
}

async function onEditSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const book = {
        author: author,
        title: title
    }

    const result = await updateBook(id, book);
    tbody.appendChild(createRow(result._id, result));
    e.target.reset();

    createForm.style.display = 'block';
    editForm.style.display = 'none';
    loadBooks()
}

async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
}

async function loadBookById(id) {
    const book = await request(`http://localhost:3030/jsonstore/collections/books/${id}`);

    return book;
}

async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function OnCreate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const book = {
        author: author,
        title: title
    }

    const result = await createBook(book);
    tbody.appendChild(createRow(result._id, result));
    e.target.reset();
}

async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id="${id}">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>`

    return row;
}

async function deleteBook(id) {
    const result = await request(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'delete'
    })

    return result;
}

async function updateBook(id, book) {
    const result = await request(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'put',
        body: JSON.stringify(book)
    })

    return result;
}

async function createBook(book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });

    return result;
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const res = await fetch(url, options);

    if (res.ok != true) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const books = await res.json();

    return books;
}