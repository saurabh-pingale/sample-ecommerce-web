export function renderCheckoutPage(cartItems, totalPrice) {
    return `
        <div class="checkout-container">
            <h2>Checkout</h2>
            <div id="checkout-items">
                ${cartItems.map(item => `
                    <div class="checkout-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="checkout-total">
                <strong>Total: $${totalPrice.toFixed(2)}</strong>
            </div>
            <button id="place-order-btn">Place Order</button>
        </div>
    `;
}