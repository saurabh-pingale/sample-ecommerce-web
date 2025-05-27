document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    initializeProducts();
    
    updateLoginButton();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
            updateLoginButton();
            window.location.reload();
        });
    }
});