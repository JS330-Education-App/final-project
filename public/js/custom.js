const role = document.getElementById('role-select');

role.addEventListener('change', function() {
    if (role.value === 'teacher' || role.value === 'student' || role.value === 'parent') {
        document.getElementById('form-common').classList.remove('invisible');
    } else {
        document.getElementById('form-common').classList.add('invisible');
    }

    if (role.value === 'student') {
        document.getElementById('form-student').classList.remove('invisible');
    } else {
        document.getElementById('form-student').classList.add('invisible');
    }

    if (role.value === 'parent') {
        document.getElementById('form-parent').classList.remove('invisible');
    } else {
        document.getElementById('form-parent').classList.add('invisible');
    }
})