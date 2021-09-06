// Date formatting: e.g. 'Sep, 6'
let dueDate = document.querySelectorAll('.dueDate');
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
for (let i = 0; i < dueDate.length; i++) {
    let dueDateFormat = new Date(dueDate[i].innerHTML);
    const dueDateMonthNum = dueDateFormat.getMonth();
    const dueDateMonth = month[dueDateMonthNum];
    dueDate[i].innerHTML = `${dueDateMonth}, ${dueDateFormat.getDate()}`;
}
