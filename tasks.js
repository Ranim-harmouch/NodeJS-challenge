
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


//sample list of tasks

let tasks = [
  { task: 'Do projects' },
  { task: 'Tasks' },
  { task: 'Uni homework' },
  { task: 'watch sunset' }
];


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
  const command = parts[0];
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
  else if (command === 'list') {
    listTasks(); 
  }
  else if (command === 'add') {
    addTask(parts.slice(1).join(' ')); // Adds task join all parts 
  }
  else if (command === 'remove') {
    removeTask(parts[1]); 
  }
  else if (command === 'edit') {
    editTask(parts.slice(1)); 
  }
  else{
    unknownCommand(text);
  }
}

/**
 * Handles the edit command
 * @param {Array} args 
 * @returns {void}
 */
function editTask(args) {
  if (args.length === 0) {
    console.log('Error: Please provide a task number or new text.');
    return;
  }

  if (args.length === 1) {
    // Edit the last task if no index is provided
    const newText = args[0];
    if (tasks.length === 0) {
      console.log('No tasks to edit!');
      return;
    }
    tasks[tasks.length - 1].task = newText; // Edit the last task
    console.log(`Last task updated to: "${newText}"`);
  } else if (args.length === 2) {
    // Edit a specific task by index ("edit 1 new text")
    const taskIndex = parseInt(args[0]) - 1; 
    const newText = args[1];

    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      console.log('Error: Invalid task number! Please provide a valid task number.');
      return;
    }

    tasks[taskIndex].task = newText; // Edit the specified task
    console.log(`Task ${taskIndex + 1} updated to: "${newText}"`);
  } else {
    console.log('Error: Invalid input for "edit" command.');
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
 * Lists all tasks with task numbers
 * @returns {void}
 */
function listTasks() {
  if (tasks.length === 0) {
    console.log('No tasks to show!');
    return;
  }
  
  console.log('List of tasks:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task}`);
  });
}

/**
 * Adds a task to the list
 * @param {string} taskDescription //description of the tasks
 * @returns {void}
 */
function addTask(taskDescription) {
  if (!taskDescription) {
    console.log('Error: Please provide a task description.');
    return;
  }
  
  tasks.push({ task: taskDescription });
  console.log(`Task added: "${taskDescription}"`);
}

/**
 * Removes a task from the task list
 * @param {string} index the index or empty string to remove the last task
 * @returns {void}
 */
function removeTask(index) {
  if (index === undefined || index === "") {
    // Remove the last task
    if (tasks.length > 0) {
      const removedTask = tasks.pop(); //pop remove the lst elment 
      console.log(`Removed last task: "${removedTask.task}"`);
    } else {
      console.log('No tasks to remove!');
    }
  } else {
    const taskIndex = parseInt(index) - 1; // Convert to 0-based index
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      console.log('Error: Invalid task number! Please provide a valid task number.');
      return;
    }

    // Remove the task at the given index
    const removedTask = tasks.splice(taskIndex, 1);
    console.log(`Removed task: "${removedTask[0].task}"`);
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
 * list
 * add
 * remove
 * 
 * @returns {void}
 */
function help(){
  console.log('Available commands:');
  console.log('  hello [name]  - Says hello to the provided name or phrase');
  console.log('  quit          - Exits the application');
  console.log('  exit          - Exits the application');
  console.log('  help          - Lists all the possible commands');
  console.log('  list          - Lists all tasks with numbers');
  console.log('  add [task]    - Adds a new task to the task list');
  console.log('  remove [task_number] - Removes the task at the specified number (or last task if no number is provided)');
  console.log('  edit [task_number|new_text] - Edits the task (last task if no number is provided)');
}

// The following line starts the application
startApp("Ranim Harmouch");
