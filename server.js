require('dotenv').config();
const express = require('express');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const pool = require('./db'); 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(cors({
  origin: ['http://localhost:3000' ,'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());


app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Student Feedback API is running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});