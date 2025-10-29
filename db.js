

// backend/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required for Render Postgres
});

// IMMEDIATE TEST
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database.');
    client.release();
  } catch (err) {
    console.error('❌ Database connection FAILED:', err.message);
    process.exit(1);
  }
})();

module.exports = pool;
