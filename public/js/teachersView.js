const isGradeSelected = document.querySelector('select.selectGrade');
const assignmentList = document.querySelector('ol.assignments-list li div');
const btnGradeConfirm = document.querySelector('button.btnGradeConfirm');
const checkmark = document.querySelector('span.checkmark');
const getAllAssignments = document.getElementById('getAllAssignments');
let dueDate = document.getElementsByClassName('dueDate');
const btnSaveAssgn = document.getElementById('btnSaveAssgn');
const assgnStatus = document.getElementById('assgnStatus');
const li = document.getElementsByClassName('list-group-item');

console.log(dueDate)
console.log(btnSaveAssgn)
console.log(assgnStatus)

// Success message after Save Changes in the Assignment window

// setTimeout(function () {
//     document.getElementsByClassName('modal').modal('hide');
// }, 10000);
function DoLater(){
    setTimeout(function(){
      alert("hello");
    },10000);
  }
  
    btnSaveAssgn.addEventListener('hover', function() {
        assgnStatus.classList.remove('invisible');
    })

   


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
});



// var toastTrigger = document.getElementById('liveToastBtn')
// var toastLiveExample = document.getElementById('liveToast')
// if (toastTrigger) {
//   toastTrigger.addEventListener('click', function () {
//     var toast = new bootstrap.Toast(toastLiveExample)

//     toast.show()
//   })
// }

// Date formatting

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
for (i = 0; i < dueDate.length; i++) {
    console.log(dueDate);
    let dueDateFormat = new Date(dueDate[i].innerHTML);
    console.log(`Inner HTML: ${dueDateFormat}`)

    const dueDateDay = dueDateFormat.getDate();
    const dueDateMonthNum = dueDateFormat.getMonth();
    const dueDateMonth = month[dueDateMonthNum];
    dueDate.innerHTML = `${dueDateMonth}, ${dueDateDay}`;
    dueDateFormat = dueDate.innerHTML;
}

const dueDateFormat = new Date(dueDate.innerHTML);
const dueDateDay = dueDateFormat.getDate();
const dueDateMonthNum = dueDateFormat.getMonth();
const dueDateMonth = month[dueDateMonthNum];
dueDate.innerHTML = `${dueDateMonth}, ${dueDateDay}`


