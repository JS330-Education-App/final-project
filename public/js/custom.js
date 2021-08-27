const role = document.getElementById('role-select');

role.addEventListener('change', function() {
    if (role.value === 'teachers' || role.value === 'students' || role.value === 'parents') {
        document.getElementById('form-common').classList.remove('invisible');
    } else {
        document.getElementById('form-common').classList.add('invisible');
    }

    if (role.value === 'students') {
        document.getElementById('form-student').classList.remove('invisible');
    } else {
        document.getElementById('form-student').classList.add('invisible');
    }

    if (role.value === 'parents') {
        document.getElementById('form-parent').classList.remove('invisible');
    } else {
        document.getElementById('form-parent').classList.add('invisible');
    }
})