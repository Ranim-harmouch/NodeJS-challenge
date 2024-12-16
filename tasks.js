
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.trim(); //remove space 
  const parts = text.split(' ');
  console.log(`Received command: ${command}, with arguments: ${parts.slice(1).join(' ')}`);

  if (command === 'quit' || command === 'exit') {
    quit();
  }
  else if(command === 'hello'){
    hello(parts.slice(1).join(' '));  //into a string 
  }
  else if (command === 'help') {
    help();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *@param {string}
 * @returns {void}
 */
function hello(name){
  if (name) {
    console.log(`hello ${name}!`);
  } else {
    console.log('hello!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
 * help 
 * lists all the possible commands
 * It provides a list of all available commands in the application:
 * hello
 * quit
 * exit 
 * help
 * 
 * @returns {void}
 */
function help(){
  console.log('Available commands:');
  console.log('  hello [name]  - Says hello');
  console.log('  quit          - Exits the application');
  console.log('  exit          - Exits the application');
  console.log('  help          - Lists all the possible commands');
}

// The following line starts the application
startApp("Ranim Harmouch")
