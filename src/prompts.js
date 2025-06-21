const inquirer = require('inquirer');
const { addCredential, viewCredentials } = require('./credentialManager');

async function mainMenu() {
  let exit = false;
  while (!exit) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'Add Credential',
          'View My Credentials',
          'Logout',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'Add Credential':
        await addCredential();
        break;
      case 'View My Credentials':
        await viewCredentials();
        break;
      case 'Logout':
        exit = true;
        break;
      case 'Exit':
        process.exit(0);
    }
  }
}

module.exports = mainMenu;