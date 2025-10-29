// backend/server.js
const express = require('express');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedback');
require('dotenv').config(); // MUST BE AT THE TOP!

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000' ,'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Student Feedback API is running!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});