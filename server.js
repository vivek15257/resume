const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for your resume data
const resumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    education: Array,
    skills: Array,
    projects: Array,
    certifications: Array
});

const Resume = mongoose.model('Resume', resumeSchema);

// API endpoint to retrieve resume data
app.get('/api/resume', async (req, res) => {
    const resume = await Resume.find();
    res.json(resume);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
