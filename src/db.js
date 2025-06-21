// Import the MySQL2 library for database interaction
const mysql = require('mysql2');

// Load environment variables from .env file (e.g. DB credentials)
const dotenv = require('dotenv');
dotenv.config();

// Create a connection pool to efficiently manage multiple connections
const pool = mysql.createPool({
  connectionLimit: 10,           // Max number of concurrent connections
  host: process.env.DB_HOST,     // MySQL host
  user: process.env.DB_USER,     // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_DATABASE, // Name of the database
});

// Export a promise-based version of the pool for use with async/await
module.exports = pool.promise();