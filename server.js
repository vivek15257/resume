// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for frontend

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/contactFormDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for the form data
const ContactFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    const newMessage = new ContactForm({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    newMessage.save((err) => {
        if (err) {
            res.status(500).send('Error saving message');
        } else {
            res.status(200).json({ message: 'Message saved successfully' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
