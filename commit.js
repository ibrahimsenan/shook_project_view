// Import necessary modules
const { exec } = require('child_process');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for commit message
rl.question('Enter the commit message: ', (commitMessage) => {
  console.log(`Commit message entered: ${commitMessage}`);

  // Prompt user for issue type
  console.log('\nWhat type is the issue?');
  console.log('1: User Story');
  console.log('2: Bug');
  console.log('3: Testing');
  console.log('4: Dev');
  rl.question('Enter the number corresponding to the issue type: ', (issueType) => {
    console.log(`Issue type selected: ${issueType}`);

    // Determine emoji based on issue type
    let emoji;
    switch (issueType) {
      case '1':
        emoji = '🔠';
        break;
      case '2':
        emoji = '🐛';
        break;
      case '3':
        emoji = '🔬';
        break;
      case '4':
        emoji = '💻';
        break;
      default:
        console.log('Invalid choice, please commit again and enter a valid option.');
        rl.close();
        return;
    }

    // Construct final commit message with emoji
    const finalMessage = `${emoji} ${commitMessage}`;
    console.log(`Final commit message: ${finalMessage}`);

    // Run git commit command
    exec(`git commit -m "${finalMessage}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    // Close readline interface
    rl.close();
  });
});