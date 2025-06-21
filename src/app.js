// Import inquirer for command-line prompts
const inquirer = require('inquirer');

// Import main functions from vaultManager module
const { setAdminMode, addRecord, viewRecords, editRecord, deleteRecord } = require('./vaultManager');

// Main function to run the CLI app
async function run() {
  console.log('Welcome to the Vault Manager');

  // Ask if the user is admin or guest; set access level accordingly
  await setAdminMode();

  let exit = false;

  // Main loop
  while (!exit) {

    // Prompt the user for an action
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
          'Add Record',
          'View All Records',
          'Edit Record',
          'Delete Record',
          'Exit'
        ]
      }
    ]);

    // Route the selected action to the appropriate function
    switch (action) {
      case 'Add Record':
        await addRecord();
        break;
      case 'View All Records':
        await viewRecords();
        break;
      case 'Edit Record':
        await editRecord();
        break;
      case 'Delete Record':
        await deleteRecord();
        break;
      case 'Exit':
        exit = true;
        console.log('Exiting Vault Manager.');
        break;
    }
  }
}


run();