// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde]


// Define your ghosts here

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n\n\nPower-Pellets:' + powerPellets );
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet')
  console.log('(1) Eat Inky');
  console.log('(2) Eat Blinky');
  console.log('(3) Eat Pinky');
  console.log('(4) Eat Clyde');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}



function eatPowerPellet() {
  if (powerPellets <= 0) {
    console.log("\nWe are all out Folks!");
  } else {
  console.log('\nYummy!');
  score += 50;
  powerPellets -= 1;
  for (var index = 0; index < ghosts.length; index++) {
  ghosts[index].edible = true;
 }
}
}

function eatGhost(ghost){
  if (ghost.edible === false ) {
    lives -= 1;
    gameOver();
    console.log('\n'+ ghost.name + ", The " + ghost.colour + " coloured ghost killed Pac-Man");
  }else {
    console.log("\nYummy")
    lives += 0
  }
  }
//game over function not working yet.
function gameOver() {
  if (lives <= 0) {
    process.exit();
    console.log('\n Game Over');
  }
}







// console.log(+ ghost.name + "" + ghost.colour + "killed Pac Man");

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
      case 'p':
        eatPowerPellet();
        break;
      case '1':
        eatGhost(inky);
        break;
        case '2':
          eatGhost(blinky);
          break;
          case '3':
            eatGhost(pinky);
            break;
            case '4':
              eatGhost(clyde);
              break;
    default:
      console.log('\nInvalid Command!');
  }
}





//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
