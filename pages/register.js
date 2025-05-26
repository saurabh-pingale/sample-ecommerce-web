export function renderRegisterPage() {
    return `
        <div class="auth-container">
            <h2>Register</h2>
            <form id="register-form">
                <div class="form-group">
                    <label for="register-name">Name</label>
                    <input type="text" id="register-name" required>
                </div>
                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input type="email" id="register-email" required>
                </div>
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <input type="password" id="register-password" required>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    `;
}