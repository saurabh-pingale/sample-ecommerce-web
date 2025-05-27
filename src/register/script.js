document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

     registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                await AuthService.registerUser({ name, email, password });
                alert('Registration successful! Please login.');
                window.location.href = '../login/index.html';
            } catch (error) {
                alert(error.message);
            }
        });
});