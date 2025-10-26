document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('game-title').textContent = urlParams.get('title');
    document.getElementById('game-price').textContent = urlParams.get('price');

    document.getElementById('shipping-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const game = urlParams.get('title');
        const price = urlParams.get('price');

        // Enviar SMS con todos los datos
        const message = `${name} compró ${price} en ${game}. Dirección: ${address}. Tel: ${phone}. Email: ${email}`;
        fetch('http://localhost:3000/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: '+56941656899',
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Compra procesada. SMS enviado.');
                // No redirect to payment platform, just confirm SMS sent
            } else {
                alert('Error enviando SMS.');
            }
            return response.text();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error('Error:', error);
            alert('Error conectando al servidor.');
        });
    });
});
