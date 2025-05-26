export function renderLoginPage() {
    return `
        <div class="auth-container">
            <h2>Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" required>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#" id="register-link">Register here</a></p>
        </div>
    `;
}