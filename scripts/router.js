import { renderLoginPage } from './pages/LoginPage.js';
import { renderRegisterPage } from './pages/RegisterPage.js';
import { renderCheckoutPage } from './pages/CheckoutPage.js';
import { renderHomePage } from './pages/HomePage.js';

export function handleRouting() {
    const hash = window.location.hash;

    if (hash.startsWith('#/login')) {
        const redirectTo = new URLSearchParams(hash.split('?')[1]).get('from') || '/';
        renderLoginPage(redirectTo);
    } else if (hash.startsWith('#/register')) {
        const redirectTo = new URLSearchParams(hash.split('?')[1]).get('from') || '/';
        renderRegisterPage(redirectTo);
    } else if (hash === '#/checkout') {
        renderCheckoutPage();
    } else {
        renderHomePage();
    }
}