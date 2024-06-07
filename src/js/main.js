document.getElementById('check').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    const feedbackList = validatePassword(password);
    displayFeedback(feedbackList);
});

function validatePassword(password) {
    const minLength = 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let feedbackList = [];

    if (password.length < minLength) {
        feedbackList.push(`Password must be at least ${minLength} characters long.`);
    }
    if (!hasUpperCase) {
        feedbackList.push('Password must contain at least one uppercase letter.');
    }
    if (!hasLowerCase) {
        feedbackList.push('Password must contain at least one lowercase letter.');
    }
    if (!hasNumbers) {
        feedbackList.push('Password must contain at least one number.');
    }
    if (!hasSpecialChars) {
        feedbackList.push('Password must contain at least one special character.');
    }
    
    if (password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        feedbackList = ['Password is strong.'];
    } else {
        feedbackList.unshift('Insecure password');
    }

    return feedbackList;
}

function displayFeedback(feedbackList) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = '';
    const ul = document.createElement('ul');
    feedbackList.forEach(feedback => {
        const li = document.createElement('li');
        li.textContent = feedback;
        ul.appendChild(li);
    });
    feedbackElement.appendChild(ul);
}
