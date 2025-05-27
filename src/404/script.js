document.addEventListener('DOMContentLoaded', function() {
    updateLoginButton();
    
    const homeBtn = document.getElementById('home-btn') || document.querySelector('a[href*="home"]');
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '../home/';
        });
    }
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
            window.location.href = '../home/';
        });
    }
    
    const errorContainer = document.querySelector('.error-container') || document.querySelector('main');
    if (errorContainer) {
        errorContainer.style.opacity = '0';
        errorContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            errorContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            errorContainer.style.opacity = '1';
            errorContainer.style.transform = 'translateY(0)';
        }, 100);
    }
});