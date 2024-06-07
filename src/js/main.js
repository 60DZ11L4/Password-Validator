document.getElementById('check').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    document.getElementById('feedback').textContent = `Password length: ${password.length}`;
});
