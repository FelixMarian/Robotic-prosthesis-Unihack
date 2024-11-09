const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;
const net = require('net');

let connectionStatus = 0;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});


// Get to see if the status has changed
app.get('/api/status', (req, res) => {
    res.json({ status: connectionStatus });
});


// Function to send and receive data from Raspberry via TCP
const sendTcpMessage = (message, onStautsChange) => {
    const client = new net.Socket();
    client.connect(5000, '192.168.187.135', () => {
        console.log('Conectat la Raspberry Pi');
        connectionStatus=2;
        client.write(message);
    });

    client.on('data', (data) => {
        console.log('Mesaj primit de la serverul TCP:', data.toString());
        client.destroy();
    });

    client.on('close', () => {
        console.log('Conexiune închisă');
    });

    client.on('error', (error) => {
        console.error('Eroare TCP:', error);
    });
};

app.post('/send-message', (req, res) => {
    const { message } = req.body;
    if (message) {
        sendTcpMessage(message);
        res.status(200).send('Mesaj trimis');
    } else {
        res.status(400).send('Mesajul este necesar');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
