
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.raw({ type: 'application/json' }));
app.use(express.json({ strict: false, reviver: (key, value) => value }));
app.use(express.urlencoded({ extended: true }));

const accountSid = 'AC8b888b02f9970ef8bc905c406e1fdfbb';
const authToken = '6f7bfea1c63513f7fe0a776a70f880dd';
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    let body;
    try {
        body = JSON.parse(req.body.toString());
    } catch (e) {
        console.log('Error parsing JSON:', e.message);
        return res.status(400).send('Invalid JSON');
    }
    console.log('Parsed body:', body);
    const { to, message } = body;
    console.log('Intentando enviar SMS a:', to, 'Mensaje:', message);
    if (!to || !message) {
        console.log('Missing to or message');
        return res.status(400).send('Missing to or message');
    }
    console.log('To:', to, 'Message:', message);
    // Now use Twilio
    client.messages
        .create({
            body: message,
            messagingServiceSid: 'MG96d389e2a561c9266894d185b73ab0ee',
            to: to
        })
        .then(message => {
            console.log('SMS enviado:', message.sid);
            res.status(200).send('SMS enviado');
        })
        .catch(error => {
            console.error('Error enviando SMS:', error.message);
            res.status(500).send('Error enviando SMS: ' + error.message);
        });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
