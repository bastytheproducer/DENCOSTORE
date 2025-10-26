
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSP middleware to allow necessary sources
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");
    next();
});

app.use(express.static('.'));

const accountSid = 'AC8b888b02f9970ef8bc905c406e1fdfbb';
const authToken = '73f5ca78596169fa2e9541cac8246d8f';
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;
    if (!to || !message) {
        return res.status(400).send('Missing to or message');
    }
    // Simulate SMS sending for testing without actual Twilio credentials
    console.log('Simulated SMS to:', to, 'Message:', message);
    res.status(200).send('SMS enviado (simulado)');
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en puerto 3000');
});
