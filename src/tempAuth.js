const bcrypt = require('bcrypt');
const inquirer = require('inquirer');
const db = require('./db');

let currentUser = null;

async function register() {
  const { username, password } = await inquirer.prompt([
    { name: 'username', message: 'Choose a username:' },
    { type: 'password', name: 'password', message: 'Choose a password:' }
  ]);

  const hash = await bcrypt.hash(password, 10);
  try {
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
    console.log('Registration successful!');
  } catch (err) {
    console.error('Username may already exist.');
  }
}

async function login() {
  const { username, password } = await inquirer.prompt([
    { name: 'username', message: 'Enter your username:' },
    { type: 'password', name: 'password', message: 'Enter your password:' }
  ]);

  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length === 0) return console.log('User not found.');

  const match = await bcrypt.compare(password, rows[0].password);
  if (match) {
    console.log('Login successful!');
    currentUser = rows[0];
  } else {
    console.log('Incorrect password.');
  }
}

module.exports = {
    register,
    login,
    getCurrentUser: () => currentUser
  };