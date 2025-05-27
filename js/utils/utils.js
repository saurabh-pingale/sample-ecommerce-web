function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserEmail');
}

function updateLoginButton() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        if (isLoggedIn()) {
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = function() {
                logout();
                window.location.href = 'index.html';
            };
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = function() {
                window.location.href = 'login.html';
            };
        }
    }
}