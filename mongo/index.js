
document.getElementById('submit').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rollno = document.getElementById('rollno').value;
    const college = document.getElementById('college').value;
    const branch = document.getElementById('branch').value;
    const year = document.getElementById('year').value;

    const student = { name, email, rollno, college, branch, year };

    try {
        const response = await fetch('http://localhost:3000/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('submit4').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/fetch-students');
        const students = await response.json();
        const tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.rollno}</td>
                <td>${student.college}</td>
                <td>${student.branch}</td>
                <td>${student.year}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('submit3').addEventListener('click', async () => {
    const rollno = document.getElementById('rollno1').value;
    const email = document.getElementById('email1').value;

    try {
        const response = await fetch('http://localhost:3000/update-student', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rollno, email })
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('submit5').addEventListener('click', async () => {
    const rollno = document.getElementById('rollno2').value;

    try {
        const response = await fetch(`http://localhost:3000/fetch-student/${rollno}`);
        const student = await response.json();
        document.getElementById('para').innerText = JSON.stringify(student, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('submit6').addEventListener('click', async () => {
    const rollno = document.getElementById('rollno3').value;

    try {
        const response = await fetch(`http://localhost:3000/delete-student/${rollno}`, {
            method: 'DELETE'
        });
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
});

