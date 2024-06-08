document.getElementById('check').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    const feedbackList = validatePassword(password);
    displayFeedback(feedbackList);
});

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let feedbackList = [];
    let isSecure = true;

    if (password.length < minLength) {
        feedbackList.push(`Password must be at least ${minLength} characters long.`);
        isSecure = false;
    }
    if (!hasUpperCase) {
        feedbackList.push('Password must contain at least one uppercase letter.');
        isSecure = false;
    }
    if (!hasLowerCase) {
        feedbackList.push('Password must contain at least one lowercase letter.');
        isSecure = false;
    }
    if (!hasNumbers) {
        feedbackList.push('Password must contain at least one number.');
        isSecure = false;
    }
    if (!hasSpecialChars) {
        feedbackList.push('Password must contain at least one special character.');
        isSecure = false;
    }
    
    if (isSecure) {
        feedbackList = ['Password is strong.'];
    } else {
        feedbackList.unshift('Insecure password');
    }

    return { feedbackList, isSecure };
}

function displayFeedback(feedbackData) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = '';

    const message = document.createElement('div');
    message.className = `feedback-message ${feedbackData.isSecure ? 'secure' : 'insecure'}`;
    message.textContent = feedbackData.feedbackList[0];
    feedbackElement.appendChild(message);

    const ul = document.createElement('ul');
    feedbackData.feedbackList.slice(1).forEach(feedback => {
        const li = document.createElement('li');
        li.textContent = feedback;
        ul.appendChild(li);
    });
    feedbackElement.appendChild(ul);
}

