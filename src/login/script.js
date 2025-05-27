document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                await AuthService.loginUser(email, password);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUserEmail', email);

                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect');
                
                if (redirect) {
                    window.location.href =  `../${redirect}/index.html`;
                } else {
                    window.location.href = '../home/index.html';
                }
            } catch (error) {
                alert(error.message);
            }
        });
});