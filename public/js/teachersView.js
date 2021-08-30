const isGradeSelected = document.getElementById('selectGrade');
const assignmentList = document.getElementById('assignments_list');
const btnGradeConfirm = document.getElementById('btnGradeConfirm');
const checkmark = document.getElementById('checkmark');

// Select listener: adding/removing status classes and showing confirmation button and checkmark
isGradeSelected.addEventListener('change', function() {
    // check: if Grade was confirmed but techer decided to change a Grade. Should hide checkmark and show Confirm button again
    if (assignmentList.className === 'grade-confirmed') {
        assignmentList.classList.remove('grade-confirmed');
        btnGradeConfirm.classList.remove('invisible');
        checkmark.classList.add('invisible');
    }
    // adding a class when Grade was selected. Should show Confirm button
    if (
        isGradeSelected.value === '100' ||
        isGradeSelected.value === '80' ||
        isGradeSelected.value === '60' ||
        isGradeSelected.value === '40' ||
        isGradeSelected.value === '20' ||
        isGradeSelected.value === '0')
    {
        assignmentList.classList.add('grade-selected');
    }
    // Show a checkmark when Confirm button was clicked
    if (assignmentList.className === 'grade-selected') {
        btnGradeConfirm.classList.remove('invisible');
        checkmark.classList.add('invisible');
    }
    // Don't show Confirm or checkmark when "Grade" option was selected
    if (isGradeSelected.value === 'none') {
        btnGradeConfirm.classList.add('invisible');
        checkmark.classList.add('invisible');
        assignmentList.classList.remove('grade-selected');
        assignmentList.classList.remove('grade-confirmed');
    }
})

// Confirm button click event: adding "grade-confirmed" status class
btnGradeConfirm.addEventListener('click', function() {
    assignmentList.classList.remove('grade-selected');
    assignmentList.classList.add('grade-confirmed');
    btnGradeConfirm.classList.add('invisible');
    checkmark.classList.remove('invisible');
})


