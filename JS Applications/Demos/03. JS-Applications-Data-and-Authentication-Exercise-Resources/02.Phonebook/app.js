function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate')
    const list2 = document.getElementById('phonebook');

    loadBtn.addEventListener('click', loadContacts);
    createBtn.addEventListener('click', onCreate);
    list2.addEventListener('click', onDelete)

    loadContacts();
}

attachEvents();

const list = document.getElementById('phonebook');
const personInp = document.getElementById('person');
const phoneInp = document.getElementById('phone');

async function onDelete(event) {
    const id = event.target.dataset.id;

    if (id != undefined) {
        await deleteContact(id);
        event.target.parentElement.remove();
    }
}

async function onCreate() {
    const person = personInp.value;
    const phone = phoneInp.value;

    const contact = {
        person: person,
        phone: phone
    }

    const result = await createContact(contact);
    list.appendChild(createItem(result));
}

async function loadContacts() {
    const res = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await res.json();
    list.replaceChildren(...Object.values(data).map(createItem));

}

function createItem(contact) {
    const liEL = document.createElement('li');
    liEL.innerHTML = `${contact.person}: ${contact.phone} <button data-id="${contact._id}"> Delete </button>` ;
    return liEL;
}

async function createContact(contact) {
    const res = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });

    const result = await res.json();

    return result;
}

async function deleteContact(id) {
    const res = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: 'delete'
    });
    const result = await res.json();

    return result;
}