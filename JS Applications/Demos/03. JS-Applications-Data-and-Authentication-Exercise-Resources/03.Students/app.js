function attachEvent(){
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onCreate);

    createTable();
}

attachEvent();
const [firstNameInp, lastNameInp, facultyNumberInp, gradeInp] = document.querySelectorAll('div .inputs input');
const divInputs = document.querySelector('div .inputs');
const tbody = document.querySelector('#results tbody');

async function onCreate(e){
    e.preventDefault();

    const fName = firstNameInp.value;
    const lName = lastNameInp.value;
    const facNumber = facultyNumberInp.value;
    const gradeValue = gradeInp.value;

    if (!fName && !lName && !facNumber && !gradeValue){
        return;
    }

    const student = {
        firstName: fName,
        lastName: lName,
        facultyNumber: facNumber,
        grade: gradeValue
    }

    tbody.appendChild(createTabelRow(student));
    await postStudent(student);

    firstNameInp.value = '';
    lastNameInp.value = '';
    facultyNumberInp.value = '';
    gradeInp.value = '';
}

async function postStudent(student){
    const res = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })

    const data = await res.json();

    return data;
}

async function createTable(){
    const students = await getStudents();

    tbody.replaceChildren(...Object.values(students).map(createTabelRow));
}

function createTabelRow(student){
    const trEl = document.createElement('tr');

    const tdFirstName = document.createElement('td');
    tdFirstName.textContent = student.firstName;

    const tdLastName = document.createElement('td');
    tdLastName.textContent = student.lastName;

    const tdfacultyNumber = document.createElement('td');
    tdfacultyNumber.textContent = `${student.facultyNumber}`;

    const tdGrade = document.createElement('td');
    tdGrade.textContent = `${student.grade}`;

    trEl.appendChild(tdFirstName);
    trEl.appendChild(tdLastName);
    trEl.appendChild(tdfacultyNumber);
    trEl.appendChild(tdGrade);

    return trEl;
}

async function getStudents(){
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const res = await fetch(url);
    const data = await res.json();

    return data;
}