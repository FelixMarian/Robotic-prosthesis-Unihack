const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.post("/send-message", (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Mesajul este necesar" });
    }

    console.log("Mesaj primit pentru trimitere:", message);

    res.json({ success: true, message: "Mesaj trimis cu succes!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
