document.getElementById('check').addEventListener('click', async function() {
    const password = document.getElementById('password').value;
    const feedbackData = validatePassword(password);
    const isLeaked = await checkPasswordLeak(password);
    displayFeedback(feedbackData, isLeaked);
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
        feedbackList.push('Password must be at least ' + minLength + ' characters long.');
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

async function checkPasswordLeak(password) {
    const proxyUrl = 'https://corsproxy.io/?';
    const hibpApiUrl = 'https://api.pwnedpasswords.com/range/';
    const sha1 = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest('SHA-1', sha1);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5).toUpperCase();
    
    try {
        const response = await fetch(proxyUrl + hibpApiUrl + prefix);
        const text = await response.text();
        return text.includes(suffix);
    } catch (error) {
        console.error('Error checking password leak:', error);
        return false;
    }
}

function displayFeedback(feedbackData, isLeaked) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = '';

    const message = document.createElement('div');
    message.className = `feedback-message ${feedbackData.isSecure && !isLeaked ? 'secure' : 'insecure'}`;
    message.textContent = feedbackData.isSecure && !isLeaked ? 'Password is strong.' : 'Insecure password';
    feedbackElement.appendChild(message);

    const ul = document.createElement('ul');
    feedbackData.feedbackList.slice(1).forEach(feedback => {
        const li = document.createElement('li');
        li.className = 'feedback-item';
        li.textContent = feedback;
        ul.appendChild(li);
    });

    const leakInfo = document.createElement('li');
    leakInfo.className = `leak-message ${isLeaked ? 'leaked' : 'not-leaked'}`;
    leakInfo.textContent = isLeaked ? 'This password has been leaked!' : 'This password has not been leaked.';
    ul.appendChild(leakInfo);

    feedbackElement.appendChild(ul);
}

