export function renderHeader() {
    return `
        <header class="site-header">
            <div class="logo">
                <h1>🛍️ Simple Ecommerce</h1>
            </div>
            <div class="hero-actions">
                <div id="cart-icon" title="View Cart">
                    🛒 <span id="cart-count">0</span>
                </div>
            </div>
        </header>
    `;
}