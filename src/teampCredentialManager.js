const inquirer = require('inquirer');
const db = require('./db');
const { getCurrentUser } = require('./tempAuth');

async function addCredential() {
  const { role, platform, username, password } = await inquirer.prompt([
    { name: 'role', message: 'Whose account is this for? (e.g. Mom, Me, Brother)' },
    { name: 'platform', message: 'Platform (e.g. Instagram, Gmail):' },
    { name: 'username', message: 'Account username:' },
    { name: 'password', message: 'Account password:' }
  ]);

  const user = getCurrentUser();
  if (!user) return console.log('You must be logged in to add credentials.');

  await db.query(
    'INSERT INTO credentials (user_id, role, platform, account_username, account_password) VALUES (?, ?, ?, ?, ?)',
    [user.id, role, platform, username, password]
  );

  console.log('Credential saved.');
}

async function viewCredentials() {
  const user = getCurrentUser();
  if (!user) return console.log('You must be logged in to view credentials.');

  const [rows] = await db.query('SELECT * FROM credentials WHERE user_id = ?', [user.id]);
  console.table(rows);
}

module.exports = { addCredential, viewCredentials };