import { renderHeader } from "../components/header.js";
import { renderMain } from "../components/main.js";
import { renderCartModal } from "../components/modal.js";
import { renderLoginPage } from "../pages/login.js";
import { renderRegisterPage } from "../pages/register.js";
import { renderCheckoutPage } from "../pages/checkout.js";
import { renderNotFoundPage } from "../pages/notFound.js";
import { ProductUI } from "./ui/ProductUI.js";
import { CartService } from "./services/CartService.js";
import {
    handleLoginClick,
    handleLoginFormSubmit,
    handleRegisterFormSubmit,
    handlePlaceOrderClick
} from "./handlers.js";
import { isLoggedIn } from "./utils/auth.js";

export const routes = [
    {
        path: 'home',
        component: async () => `
            ${renderHeader(isLoggedIn())}
            ${renderMain()}
            ${renderCartModal()}
        `,
        setup: () => {
            new ProductUI('products-container').renderProducts();

            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.addEventListener('click', handleLoginClick);
            }
        }
    },
    {
        path: 'login',
        component: async () => `
            ${renderHeader(isLoggedIn())}
            ${renderLoginPage()}
        `,
        setup: () => {
            document.getElementById('login-form').addEventListener('submit', handleLoginFormSubmit);
            document.getElementById('register-link').addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '#register';
            });
        }
    },
    {
        path: 'register',
        component: async () => `
            ${renderHeader(isLoggedIn())}
            ${renderRegisterPage()}
        `,
        setup: () => {
            document.getElementById('register-form').addEventListener('submit', handleRegisterFormSubmit);
        }
    },
    {
        path: 'checkout',
        component: async () => {
            const cartService = new CartService();
            const cartItems = cartService.getCart();
            const totalPrice = cartService.getTotalPrice();

            return `
                ${renderHeader(isLoggedIn())}
                ${renderCheckoutPage(cartItems, totalPrice)}
            `;
        },
        setup: () => {
            document.getElementById('place-order-btn').addEventListener('click', handlePlaceOrderClick);
        }
    },
    {
        path: 'not-found',
        component: async () => `
            ${renderHeader(isLoggedIn())}
            ${renderNotFoundPage()}
        `
    }
];