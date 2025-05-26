import { ProductService } from "../services/ProductService.js";
import { CartService } from "../services/CartService.js";
import { CartUI } from "./CartUI.js";

export class ProductUI {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.cartService = new CartService();
        this.cartUI = new CartUI('cart-items', this.cartService);
        this.products = ProductService.getProducts();
        this.cartService.setProducts(this.products);
    }

    renderProducts() {
        this.container.innerHTML = '';
        this.products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.imageUrl}" width="150" />
                <h3>${product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button data-id="${product.id}">Add To Cart</button>
            `;
            this.container.appendChild(card);
        });

        this.container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const id = parseInt(e.target.dataset.id);
                const product = this.products.find(p => p.id === id);
                this.cartService.addToCart(product);
                this.cartUI.updateCartCount();
                this.cartUI.openCart();
            }
        });

        document.getElementById('cart-icon').addEventListener('click', () => {
            this.cartUI.openCart();
        });
    }
}