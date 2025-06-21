const inquirer = require('inquirer');
const db = require('./db');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('./encryption');
const authenticateAdmin = require('./adminAuth');

// Tracks whether the current session has admin privileges
let isAdminSession = false;


/**
 * Prompt the user to determine if they are an admin or guest.
 * If admin, authenticate with password and set admin session.
 */
async function setAdminMode() {
  const { isAdmin } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isAdmin',
      message: 'Are you an admin?',
      default: false
    }
  ]);

  if (isAdmin) {
    const verified = await authenticateAdmin();
    if (verified) {
      console.log('Admin mode enabled.');
      isAdminSession = true;
    } else {
      console.log('Incorrect admin password. Running as guest.');
    }
  } else {
    console.log('Guest mode enabled. You can only view records (without passwords).');
  }
}


/**
 * Add a new credential record (admin only).
 * Prompts for role, platform, username, and password.
 * Password is hashed (for login) and encrypted (for admin viewing).
 */
async function addRecord() {
  if (!isAdminSession) return console.log('Guests cannot add records.');

  const { role, platform, username, password } = await inquirer.prompt([
    { name: 'role', message: 'Enter role:' },
    { name: 'platform', message: 'Enter platform:' },
    { name: 'username', message: 'Enter account username:' },
    { name: 'password', message: 'Enter account password:' }
  ]);

  const passwordHash = await bcrypt.hash(password, 12); // Secure hash for verification
  const encryptedPassword = encrypt(password); // Encrypted version for viewing

  await db.query(
    'INSERT INTO credentials (role, platform, username, password_hash, password_encrypted) VALUES (?, ?, ?, ?, ?)',
    [role, platform, username, passwordHash, encryptedPassword]
  );

  console.log('Record added.');
}


/**
 * View all records.
 * Admin sees decrypted passwords; guests see only masked entries.
 */
async function viewRecords() {
  const [rows] = await db.query('SELECT * FROM credentials');

  const formatted = rows.map(row => {
    const formattedRow = { ...row };
    if (isAdminSession) {
      formattedRow.password = decrypt(row.password_encrypted);
    } else {
      formattedRow.password = '******';
    }
    return formattedRow;
  });

  console.table(formatted);
}


/**
 * Edit an existing record (admin only).
 * Allows field-based updates and rehashes/encrypts password if changed.
 */
async function editRecord() {
  if (!isAdminSession) return console.log('Guests cannot edit records.');

  const { id } = await inquirer.prompt([
    { name: 'id', message: 'Enter ID of the record to edit:' }
  ]);
  const { field, value } = await inquirer.prompt([
    { name: 'field', message: 'Which field to edit? (role/platform/username/password):' },
    { name: 'value', message: 'Enter new value:' }
  ]);

  let newValue = value;
  if (field === 'password') {
    newValue = encrypt(value); // Encrypt for admin viewing
    const hash = await bcrypt.hash(value, 12); // Hash for login security
    await db.query(`UPDATE credentials SET password_encrypted = ?, password_hash = ? WHERE id = ?`, [newValue, hash, id]);
  } else {
    await db.query(`UPDATE credentials SET ${field} = ? WHERE id = ?`, [value, id]);
  }
  console.log('Record updated.');
}


/**
 * Delete a credential record by ID (admin only).
 */
async function deleteRecord() {
  if (!isAdminSession) return console.log('Guests cannot delete records.');

  const { id } = await inquirer.prompt([
    { name: 'id', message: 'Enter ID of the record to delete:' }
  ]);

  await db.query('DELETE FROM credentials WHERE id = ?', [id]);
  console.log('Record deleted.');
}

// Export all vault management functions
module.exports = { setAdminMode, addRecord, viewRecords, editRecord, deleteRecord };