const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST: Add feedback
router.post('/', async (req, res) => {
  try {
    const { studentname, coursecode, comments, rating } = req.body;

    // Validation
    if (!studentname || !coursecode || !rating) {
      return res.status(400).json({ error: 'studentname, coursecode, and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const query = `
      INSERT INTO feedback (studentname, coursecode, comments, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING id, studentname, coursecode, comments, rating, created_at
    `;

    const values = [studentname, coursecode, comments || null, parseInt(rating)];
    const result = await pool.query(query, values);

    const row = result.rows[0];
    res.status(201).json({
      id: row.id,
      studentname: row.studentname,
      coursecode: row.coursecode,
      comments: row.comments || '',
      rating: parseInt(row.rating),  // Ensure number
      created_at: row.created_at
    });
  } catch (err) {
    console.error('POST Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET: Retrieve all feedback
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback ORDER BY created_at DESC');

    const formatted = result.rows.map(row => ({
      id: row.id,
      studentname: row.studentname,
      coursecode: row.coursecode,
      comments: row.comments || '',
      rating: parseInt(row.rating),  // Force number
      created_at: row.created_at
    }));

    res.json(formatted);
  } catch (err) {
    console.error('GET Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// DELETE: Remove feedback by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM feedback WHERE id = $1 RETURNING id', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;