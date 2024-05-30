document.getElementById('check').addEventListener('click', fu
nction() {
const password = document.getElementById('password').valu
e;
document.getElementById('feedback').textContent = `Passwo
rd length: ${password.length}`;
});
