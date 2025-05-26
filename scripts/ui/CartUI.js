export class CartUI {
    constructor(conatainerId, cartService, appInstance) {
        this.container = document.getElementById(conatainerId);
        this.cartService = cartService;
        this.appInstance = appInstance;
        this.cartCount = document.getElementById('cart-count');
        this.modal = document.getElementById('cart-modal');
        this.closeBtn = document.getElementById('close-cart');
        this.totalBox = document.getElementById('cart-total');
        this.checkoutBtn = document.getElementById('checkout-btn');

        this._attachModalEvents();
        this._attachCheckout();
    }

    renderCart() {
        const items = this.cartService.getCart();
        this.container.innerHTML = '';

        if (items.length === 0) {
            this.container.innerHTML = `<p>Your cart is empty.</p>`
            this.totalBox.textContent = '';
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
            this.container.appendChild(div);
        });

        this.totalBox.textContent = `Total: $${this.cartService.getTotalPrice().toFixed(2)}`;
    }

    updateCartCount() {
        this.cartCount.textContent = this.cartService.getCartCount();
    }

    openCart() {
        this.modal.classList.remove('hidden');
        this.renderCart();
    }

    closeCart() {
        this.modal.classList.add('hidden');
    }

    _attachModalEvents() {
        this.closeBtn.addEventListener('click', () => this.closeCart());

        window.addEventListener('click', e => {
            if (e.target === this.modal) {
                this.closeCart();
            }
        });

        this.container.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (e.target.classList.contains('add')) {
                const product = this.cartService.findProductById(id);
                this.cartService.addToCart(product);
            } else if (e.target.classList.contains('remove')) {
                this.cartService.removeFromCart(id);
            }
            this.renderCart();
            this.updateCartCount();
        })
    }

    _attachCheckout() {
        this.checkoutBtn.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (!isLoggedIn) {
                localStorage.setItem('redirectAfterLogin', 'checkout');
                window.location.hash = '#login';
                this.closeCart();
                return;
            }

            window.location.hash = '#checkout';
            this.closeCart();
        });
    }
}