import { AuthService } from "./services/AuthService.js";
import { CartService } from "./services/CartService.js";
import { OrderService } from "./services/OrderService.js";

export function handleLoginClick() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        localStorage.removeItem('isLoggedIn');
        window.location.hash = '#home';
    } else {
        window.location.hash = '#login';
    }
}

export async function handleLoginFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await AuthService.loginUser(email, password);
        localStorage.setItem('isLoggedIn', 'true');

        const redirect = localStorage.getItem('redirectAfterLogin');
        if (redirect) {
            localStorage.removeItem('redirectAfterLogin');
            window.location.hash = `#${redirect}`;
        } else {
            window.location.hash = '#home';
        }
    } catch (error) {
        alert(error.message);
    }
}

export async function handleRegisterFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        await AuthService.registerUser({ name, email, password });
        alert('Registration successful! Please login.');
        window.location.hash = '#login';
    } catch (error) {
        alert(error.message);
    }
}

export async function handlePlaceOrderClick() {
    try {
        const cartService = new CartService();
        const order = {
            userId: localStorage.getItem('currentUserEmail'),
            items: cartService.getCart(),
            total: cartService.getTotalPrice(),
            date: new Date().toISOString()
        };

        await OrderService.createOrder(order);
        cartService.clearCart();

        alert('Order placed successfully!');
        window.location.hash = '#home';
    } catch (error) {
        alert('Failed to place order: ' + error.message);
    }
}