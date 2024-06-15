document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">${product.price} ₽</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image_url}')">Добавить в корзину</button>
                `;
                productList.appendChild(productElement);
            });
        });
});

function addToCart(id, name, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.id === id);
    if (productIndex === -1) {
        cart.push({ id, name, price, image, quantity: 1 });
    } else {
        cart[productIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар добавлен в корзину!');
}
