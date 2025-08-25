const pool = require('./db');

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
}

testConnection();