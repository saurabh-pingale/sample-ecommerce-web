let cartService;

document.addEventListener('DOMContentLoaded', async function() {
    cartService = new CartService();
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartCount && cartService) {
        cartCount.textContent = cartService.getCartCount();
    }

    document.getElementById('cart-icon').addEventListener('click', function() {
        cartModal.classList.remove('hidden');
        renderCart();
    });

    closeBtn.addEventListener('click', function() {
        cartModal.classList.add('hidden');
    });

    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.add('hidden');
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
        cartModal.classList.add('hidden');
    });

    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        try {
            const response = await fetch('home.json');
            const products = await response.json();
            cartService.setProducts(products);

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.imageUrl}" width="150" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button data-id="${product.id}">Add To Cart</button>
                `;
                productsContainer.appendChild(card);
            });

            productsContainer.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON') {
                    const id = parseInt(e.target.dataset.id);
                    const product = products.find(p => p.id === id);
                    cartService.addToCart(product);
                    updateCartCount();
                    cartModal.classList.remove('hidden');
                    renderCart();
                }
            });
        } catch (error) {
            console.error('Error loading products:', error);
            productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }
    
    updateLoginButton();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
            updateLoginButton();
            window.location.reload();
        });
    }

    function updateCartCount() {
        if (cartCount && cartService) {
            cartCount.textContent = cartService.getCartCount();
        }
    }

    function renderCart() {
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
});