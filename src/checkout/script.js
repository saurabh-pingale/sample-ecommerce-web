document.addEventListener('DOMContentLoaded', function() {
    if (!isLoggedIn()) {
        window.location.href = '../login/?redirect=checkout';
        return;
    }

    const cartService = new CartService();
    const checkoutItems = document.getElementById('checkout-items');
    const totalAmount = document.getElementById('checkout-total-amount');
    
    const cartItems = cartService.getCart();
    const total = cartService.getTotalPrice();

    if (cartItems.length === 0) {
        if (checkoutItems) {
            checkoutItems.innerHTML = '<p>Your cart is empty.</p>';
        }
        const placeOrderBtn = document.getElementById('place-order-btn');
        if (placeOrderBtn) {
            placeOrderBtn.disabled = true;
        }
        return;
    }

    if (checkoutItems) {
        cartItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'checkout-item';
            div.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
            `;
            checkoutItems.appendChild(div);
        });
    }

    if (totalAmount) {
        totalAmount.textContent = `Total: ${total.toFixed(2)}`;
    }

    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', async function() {
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
                window.location.href = '../home/';
            } catch (error) {
                alert('Failed to place order: ' + error.message);
            }
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
            window.location.href = '../home/';
        });
    }
});