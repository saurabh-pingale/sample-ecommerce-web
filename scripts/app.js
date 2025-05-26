import { renderHeader } from "../components/header.js";
import { renderMain } from "../components/main.js";
import { renderCartModal } from "../components/modal.js";
import { ProductUI } from "./ui/ProductUI.js";

document.addEventListener('DOMContentLoaded', () =>{
    const app = document.getElementById('app');

    app.innerHTML = `
        ${renderHeader()}
        ${renderMain()}
        ${renderCartModal()}
    `;
    const productUI = new ProductUI('products-container');
    productUI.renderProducts();
});