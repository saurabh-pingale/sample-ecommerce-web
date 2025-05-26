export function renderCartModal() {
    return `
        <div id="cart-modal" class="modal hidden">
            <div class="modal-content">
                <span class="close-btn" id="close-cart">&times;</span>
                <h2>Your Cart</h2>
                <div id="cart-items"></div>
                <div id="cart-total"></div>
                <button id="checkout-btn">Checkout</button>
            </div>
        </div>
    `;
}