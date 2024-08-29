const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const SALT = 3;

//pull env variables
require('dotenv').config();

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: process.env.PG
});
  
(async () => {
  const db = await pool.connect();

  try {
    //create tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS tickets (
      ticket_id SERIAL PRIMARY KEY,
      requestor_id INT NOT NULL,
      status_id INT NOT NULL,
      header VARCHAR(255) NOT NULL,
      body VARCHAR(400) NOT NULL,
      urgent BOOLEAN NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS requestors (
      requestor_id SERIAL PRIMARY KEY,
      first_name VARCHAR(85) NOT NULL,
      last_name VARCHAR(85) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ticket_status_description (
      status_id SERIAL PRIMARY KEY,
      description VARCHAR(85) NOT NULL
    )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS admin (
      admin_id SERIAL PRIMARY KEY,
      username VARCHAR(85) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      salt VARCHAR(255) NOT NULL
    )`);

    // Insert data
    await db.query(`
      INSERT INTO ticket_status_description (status_id, description)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING`, [1, 'new']);

    await db.query(`
      INSERT INTO ticket_status_description (status_id, description)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING`, [2, 'in progress']);

    await db.query(`
      INSERT INTO ticket_status_description (status_id, description)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING`, [3, 'resolved']);

    //create initial admin user
    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedPassword = await bcrypt.hash('adminPassword', salt);

    await db.query(`
      INSERT INTO admin (username, password_hash, salt)
      VALUES ($1, $2, $3)
      ON CONFLICT DO NOTHING`, ['admin', hashedPassword, salt]);

    console.log('Tables and initial data created successfully');
  } catch (err) {
    console.error('Error executing SQL:', err.message);
  } finally {
    db.release();
  }
})();

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};