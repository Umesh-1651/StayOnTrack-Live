
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const quotationRoutes = require('./routes/quotationRoutes');

// Initialize environment variables
dotenv.config();

// Set up Express app
const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.VITE_BACKEND;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Routes
app.use(`${API_URL}/users`, userRoutes);
app.use(`${API_URL}/quotations`, quotationRoutes);

// Basic health check route
app.get(`${API_URL}/health`, (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Root fallback (optional)
app.get('/', (req, res) => {
  res.send('Welcome to StayOnTrack API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
