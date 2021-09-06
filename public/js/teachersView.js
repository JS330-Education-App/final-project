let dueDate = document.getElementsByClassName('dueDate');
// Date formatting
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dueDateFormat = new Date(dueDate.innerHTML);
const dueDateDay = dueDateFormat.getDate();
const dueDateMonthNum = dueDateFormat.getMonth();
const dueDateMonth = month[dueDateMonthNum];
dueDate.innerHTML = `${dueDateMonth}, ${dueDateDay}`
