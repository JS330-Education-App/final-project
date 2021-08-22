const role = document.getElementById('role-select');

role.addEventListener('change', function() {
    if (role.value === 'teacher') {
        document.getElementById('form-teacher').classList.remove('invisible');
    } else {
        document.getElementById('form-teacher').classList.add('invisible');
    }
})