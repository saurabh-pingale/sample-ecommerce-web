let cartService;

function initializeCart() {
    cartService = new CartService();
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    updateCartCount();

    document.getElementById('cart-icon').addEventListener('click', function() {
        openCart();
    });

    closeBtn.addEventListener('click', function() {
        closeCart();
    });

    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    cartItems.addEventListener('click', function(e) {
        const id = parseInt(e.target.dataset.id);
        if (e.target.classList.contains('add')) {
            const product = cartService.findProductById(id);
            cartService.addToCart(product);
        } else if (e.target.classList.contains('remove')) {
            cartService.removeFromCart(id);
        }
        renderCart();
        updateCartCount();
    });

    checkoutBtn.addEventListener('click', function() {
        if (!isLoggedIn()) {
            window.location.href = '../login/index.html?redirect=checkout';
        } else {
            window.location.href = '../checkout/index.html';
        }
        closeCart();
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount && cartService) {
        cartCount.textContent = cartService.getCartCount();
    }
}

function openCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.remove('hidden');
    renderCart();
}

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('hidden');
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const items = cartService.getCart();
    
    cartItems.innerHTML = '';

    if (items.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '';
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <div>
                <button data-id="${item.id}" class="add">+</button>
                <button data-id="${item.id}" class="remove">-</button>
            </div>    
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = `Total: $${cartService.getTotalPrice().toFixed(2)}`;
}