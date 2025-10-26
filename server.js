
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static('.'));

// Content Security Policy middleware
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");
    next();
});

const accountSid = 'AC8b888b02f9970ef8bc905c406e1fdfbb';
const authToken = '73f5ca78596169fa2e9541cac8246d8f';
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;
    if (!to || !message) {
        return res.status(400).send('Missing to or message');
    }
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

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en puerto 3000');
});
