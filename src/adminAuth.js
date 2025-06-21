const bcrypt = require('bcrypt');
const inquirer = require('inquirer');
require('dotenv').config();


/**
 * Prompts the user to enter the admin password and verifies it.
 * Compares input against the hashed admin password stored in .env
 *
 * @returns {boolean} true if password matches, false otherwise
 */
async function authenticateAdmin() {

  // Prompt for admin password (input hidden)
  const { password } = await inquirer.prompt([
    { type: 'password', name: 'password', message: 'Enter admin password:' }
  ]);

  // Compare entered password with hashed admin password from .env
  const isMatch = await bcrypt.compare(password, process.env.ADMIN_HASH);
  return isMatch;
}

// Export the function for use in other modules
module.exports = authenticateAdmin;