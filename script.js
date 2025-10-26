let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.title} - ${item.price} <button class="remove" data-index="${index}">Quitar</button>`;
        cartItems.appendChild(li);
        totalPrice += parseInt(item.price.replace(/[^\d]/g, ''));
    });
    total.textContent = totalPrice + ' CLP';
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const game = e.target.parentElement;
            const title = game.querySelector('h2').textContent;
            const price = game.querySelector('.price').textContent;
            cart.push({ title, price });
            updateCart();
        });
    });

    document.querySelectorAll('.buy').forEach(button => {
        button.addEventListener('click', (e) => {
            const game = e.target.parentElement;
            const title = game.querySelector('h2').textContent;
            const price = game.querySelector('.price').textContent;
            // Redirect to payment page with game details
            window.location.href = `payment.html?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
        });
    });

    // Add remove from cart functionality
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });


});
