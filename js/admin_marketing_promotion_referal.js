const courses = [];
const rowsPerPage = 10;
let currentPage = 1;
const originalCourses = [];
const apiUrl = ""; // Zeeshan: Place apiUrl here

async function fetchCourses() {
    // Zeeshan: Handle errors later!
    const response = await fetch(apiUrl, {mode: 'cors'});
    courses = await response.json();
    originalCourses = [...courses];
    renderTable();
}

// Zeeshan: No changes from here onwards except calling the above fetch function at the end.

function renderTable() {
    const tableBody = document.querySelector('#referralTable tbody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, courses.length);

    for (let i = start; i < end; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}.</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].mail}</td>
            <td>${courses[i].referral_code}</td>
            <td>${courses[i].referral_count}</td>
            <td>${courses[i].bonus}</td>
        `;
        row.onclick = function() {
            goToCoursePage();
        };

        tableBody.appendChild(row);
    }

    // Add empty rows if fewer than rowsPerPage are present
    for (let i = end; i < start + rowsPerPage; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        `;
        tableBody.appendChild(row);
    }

    
    const totalPages = Math.ceil(courses.length / rowsPerPage);
    const pageSelect = document.getElementById('pageSelect');
    pageSelect.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        pageSelect.appendChild(option);
    }

    pageSelect.value = currentPage;

    pageSelect.value = currentPage;
    document.getElementById('totalCourses').innerText = `Total Course Enrollments: ${courses.length}`;
    document.getElementById('currentPage').innerText = `Page ${currentPage} of ${Math.ceil(courses.length / rowsPerPage)}`;
}



function nextPage() {
    const totalPages = Math.ceil(courses.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function changePage() {
    const pageSelect = document.getElementById('pageSelect');
    currentPage = parseInt(pageSelect.value);
    renderTable();
}

function sortTable() {
    const sortSelect = document.getElementById('sortSelect').value;
    if (sortSelect === 'referral_code') {
        courses.sort((a, b) => a.referral_code.localeCompare(b.referral_code));
    } else if (sortSelect === 'default') {
        courses = [...originalCourses]; // Reset to original order if "Default" is selected
    }
    currentPage = 1; // Reset to first page
    renderTable();
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCourses();
});

window.onload = function() {
    fetchCourses();
};

