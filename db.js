// backend/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// IMMEDIATE TEST
(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database.');
    client.release();
  } catch (err) {
    console.error('Database connection FAILED:', err.message);
    process.exit(1);
  }
})();

module.exports = pool;