const express = require('express'); // Import express framework
const mongoose = require('mongoose'); // Import mongoose to connect to MongoDB
const dotenv = require('dotenv'); // Import dotenv to load environment variables

dotenv.config(); // Load the variables from the .env file

const app = express(); // Create an instance of the express application
app.use(express.json()); // Enable the app to handle incoming JSON data

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Example route that responds with 'Hello, Backend!' when accessed
app.get('/', (req, res) => {
  res.send('Hello, Backend!');
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
