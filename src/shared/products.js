function initializeProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    const products = ProductService.getProducts();
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
            openCart();
        }
    });
}