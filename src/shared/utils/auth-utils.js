function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserEmail');
}

function updateLoginButton() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (!loginBtn && !logoutBtn) return;
    
    const loggedIn = isLoggedIn();

    if (loginBtn) loginBtn.style.display = loggedIn ? 'none' : 'inline-block';
    if (logoutBtn) logoutBtn.style.display = loggedIn ? 'inline-block' : 'none';
}