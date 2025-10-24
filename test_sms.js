const http = require('http');

const data = JSON.stringify({
    to: '+56941656899',
    message: 'Prueba: Juan compró $10.000 CLP en Juego 1. Dirección: Calle 123. Tel: 987654321. Email: test@example.com'
});

console.log('Sending data:', data);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/send-sms',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(data);
req.end();
