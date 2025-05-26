export class CartService {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.products = [];
    }

    setProducts(products) {
        this.products = products;
    }

    addToCart(product) {
        const found = this.cart.find(p => p.id === product.id);
        if(found) {
            found.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this._persist();
    }

    removeFromCart(id) {
        const index = this.cart.findIndex(p => p.id === id);
        if (index > -1) {
            this.cart[index].quantity -= 1;
            if (this.cart[index].quantity <= 0) {
                this.cart.splice(index, 1)
            }
            this._persist();
        }
    }

    findProductById(id) {
        return this.products.find(p => p.id === id);
    }

    getCart() {
        return this.cart;
    }

    getCartCount() {
        return this.cart.reduce((sum, p) => sum + p.quantity, 0);
    }

    getTotalPrice() {
        return this.cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this._persist();
    }

    _persist() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}