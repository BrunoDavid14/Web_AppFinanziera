require('dotenv').config();
console.log('DB_USER:', process.env.DB_USER); // Debería mostrar 'postgres'

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: "Rambo#12345",
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};