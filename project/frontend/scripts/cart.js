document.addEventListener('DOMContentLoaded', displayCart);

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Ваша корзина пуста</p>';
    } else {
        cart.forEach(item => {
            const productElement = document.createElement('div');
            const itemPrice = parseInt(item.price) * item.quantity;
            totalPrice += itemPrice;
            productElement.innerHTML = `
                <div>
                    <img src="${item.image}" alt="${item.name}" style="width:100px;">
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} ₽</p>
                    <p>Количество: <button onclick="decrementItem('${item.id}')">-</button> ${item.quantity} <button onclick="incrementItem('${item.id}')">+</button></p>
                    <button onclick="removeItem('${item.id}')">Удалить</button>
                </div>
                <hr>
            `;
            cartItems.appendChild(productElement);
        });
        cartTotal.innerHTML = `<p>Общая сумма: ${totalPrice.toLocaleString('ru-RU')} ₽</p>`;
    }
}

function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

function decrementItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === productId);
    if (cart[index].quantity === 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        cart[index].quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function incrementItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === productId);
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}
