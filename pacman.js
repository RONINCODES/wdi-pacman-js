// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;
var ghostEaten = 0;
var level = 1;
var valid = 0;
var name='';
var times=0;

var bonus = {
  1: ['cherry', 100],
  2: ['strawberry', 300],
  3: ['orange', 500],
  4: ['orange', 500],
  5: ['apple', 700],
  6: ['apple', 700],
  7: ['pineapple', 1000],
  8: ['pineapple', 1000],
  9: ['galaxian_spaceship', 2000],
  10: ['galaxian_spaceship', 2000],
  11: ['bell', 3000],
  12: ['bell', 3000],
  13: ['key', 5000]
}

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
  if (times >=3){
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);}
  else {
displayPromptforname();
  }
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives +     '    Dots: ' + dots +  '\nLevel: ' + level +  '\nName: '+ name+'\nPower-Pellets:' + powerPellets );

}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
 valid = 0
  var random = Math.floor((Math.random() * 5) + 1);
  if(random == 3) {
    var index = level
    if(level > 13) {
      index=13
    }
    console.log('\n======Yay! here is your bonus=====');
    console.log('(m) Eat ' + bonus[index][0]+' for bonus');
    valid =1
  }
  console.log('(d) Eat Dot');
  console.log('(e) Eat 10 Dots');
  console.log('(f) Eat 100 Dots');
  console.log('(g) Eat All Dots');
  if (powerPellets > 0) {
  console.log('(p) Eat Power-Pellet') }
  console.log('(1) Eat Inky (' + amIEdible(inky) + ')');
  console.log('(2) Eat Blinky (' + amIEdible(blinky) + ')');
  console.log('(3) Eat Pinky (' + amIEdible(pinky) + ')');
  console.log('(4) Eat Clyde (' + amIEdible(clyde) + ')');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}




// Menu Options
function eatDot(num) {
  if ((num == 1) && (dots >= 1)) {
  console.log('\nmmm mmm good dot!');
  score += 10;
  dots -= 1;
} else if ((num == 10) && (dots >= 10)){
  score += 100;
  dots -= 10;
} else if ((num == 100) && (dots >= 100)) {
  score += 1000;
  dots -= 100;
} else if ((num == 999) && (dots > 0)){
  score += dots * 10;
  dots = 0 ;
} else {
  console.log("\nno more dots for you!")
}
newLevel()
}

function amIEdible(ghost) {
  if (ghost.edible == true) {
    return "edible";
  } else {
    return "inedible";
  }
}


function eatPowerPellet() {
  if (powerPellets <= 0) {
    console.log("\nWe are all out Folks!");
  } else {
  console.log('\nYummy!');
  score += 50;
  powerPellets -= 1;
  newLevel();
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
    console.log("\n " + ghost.name + "was yummy!");
    ghost.edible = false
    lives += 0
    if (ghostEaten == 0) {
    score += 200;
  } else if (ghostEaten == 1) {
    score += 400;
  } else if (ghostEaten == 2) {
    score += 800;
  } else {
    score += 1600;
  }
    ghostEaten += 1
  }
  }

  function newLevel(){
    if (level == 256) {
      console.log('\nCongrats, you have no life, but you win PACMAN YEY!');
      saveHighScore();
      process.exit();
    } else {
      if ((powerPellets == 0) && (dots == 0)) {
      level += 1;
      dots = 240;
      powerPellets =4;
    }
  }
}

function eatBonus() {
  var index = level
  if (level > 13){
    index = 13;

  }
  score += bonus[index][1]
}



//game over function not working yet.
function gameOver() {
  if (lives <= 0) {
    saveHighScore();
    process.exit();
    console.log('\n Game Over');
  }
}

function saveHighScore(){
  var fs = require('fs');
var stream = fs.createWriteStream("my_file.txt");
stream.once('open', function(fd) {
  stream.write("My first row\n");
  stream.write("My second row\n");
  stream.end();
});

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
      eatDot(1);
      break;
    case 'm':
      if (valid==1){
      eatBonus();}
      break;
    case 'e':
      eatDot(10);
      break;
    case 'f':
      eatDot(100);
      break;
    case 'g':
      eatDot(999);
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


function displayPromptforname() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nEnter your '+times+' initials : '); // :v is the Pac-Man emoji.
}
// Draw screen when game first starts

drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  if (times < 3){
    name +=key
    times +=1
  }else{
  processInput(key);}
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
