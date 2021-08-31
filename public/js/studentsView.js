const btnAssgnSubmit = document.getElementById('btnAssgnSubmit');
const studentsAssngList = document.getElementById('students_assign_list');
const dueDate = document.getElementById('dueDate');
const AssgnDesc = document.getElementById('assignments_desc');
const checkmark = document.getElementById('checkmark');

// Adding class status to the assignment. Shoul be assgn_submitted after Submit was clicked
btnAssgnSubmit.addEventListener('click', function() {
    studentsAssngList.classList.add('assgn_submitted');
    dueDate.classList.add('invisible');
    btnAssgnSubmit.classList.add('invisible');
    // AssgnDesc.classList.add('invisible');
    checkmark.classList.remove('invisible');
})

const showDesc = document.getElementsByClassName('collapsed');
console.log(showDesc)

showDesc.addEventListener('click', function() {
    document.querySelector('div.invisible').remove('invisible')
})

// TODO: Add condition to check if assignment was graded