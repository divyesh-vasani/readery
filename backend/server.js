const express = require('express'); // Import Express
const app = express(); // Initialize Express
const cors = require('cors'); // Import CORS for cross-origin requests
require('dotenv').config(); // Load environment variables from .env file

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

