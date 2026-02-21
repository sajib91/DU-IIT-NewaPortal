// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

// Health Check
app.get('/', (req, res) => {
    res.status(200).json({ message: 'News Portal API is running smoothly on Port 5001!' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});