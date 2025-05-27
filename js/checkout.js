document.addEventListener('DOMContentLoaded', function() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html?redirect=checkout';
        return;
    }

    const cartService = new CartService();
    const checkoutItems = document.getElementById('checkout-items');
    const totalAmount = document.getElementById('checkout-total-amount');
    
    const cartItems = cartService.getCart();
    const total = cartService.getTotalPrice();

    if (cartItems.length === 0) {
        checkoutItems.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('place-order-btn').disabled = true;
        return;
    }

    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'checkout-item';
        div.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        checkoutItems.appendChild(div);
    });

    totalAmount.textContent = `Total: $${total.toFixed(2)}`;

    document.getElementById('place-order-btn').addEventListener('click', async function() {
        try {
            const order = {
                userId: localStorage.getItem('currentUserEmail'),
                items: cartItems,
                total: total,
                date: new Date().toISOString()
            };

            await OrderService.createOrder(order);
            cartService.clearCart();

            alert('Order placed successfully!');
            window.location.href = 'index.html';
        } catch (error) {
            alert('Failed to place order: ' + error.message);
        }
    });

    document.getElementById('logout-btn').addEventListener('click', function() {
        logout();
        window.location.href = 'index.html';
    });
});