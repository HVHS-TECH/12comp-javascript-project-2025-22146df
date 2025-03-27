/*******************************************************/
// P5.play: GnomeDodger
//By Dylan Figliola
/*******************************************************/

//VARIABLES
const GAMEHEIGHT = 500;
const GAMEWIDTH = 500;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;
const PLAYERSIZE = 25;
const PLAYERSPEED = 5;
const GNOMESIZE = 20;
const GNOME_Y = 10;
const GNOME_X = 10;
const GNOMESPEED = [2, 5, 10,];
const WALLTHICK = 5;

let gnomex;
let gnomey;
var gameOver = (false);
let score = 0;
var startTime;
var timeLimit = 5;
var remainingTime;
var elapsedTime;



var gnomesH = [];
var gnomesV = [];


/*******************************************************/
//SETUP

function setup() {
  cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT);
  gameSetup();
}
/*******************************************************************************************/
//GAME

function draw() {
  if (gameState === 'start') {
    startScreen();
  } else if (gameState === 'playing')
    runGame();


}
/*******************************************************/
//FUNCTIONS
function movement() {
  // Movement logic
  if (kb.pressing('left')) {
    stickman.vel.x = -PLAYERSPEED;
  } else if (kb.pressing('right')) {
    stickman.vel.x = PLAYERSPEED;
  }

  if (kb.released('left')) {
    stickman.vel.x = 0;
  } else if (kb.released('right')) {
    stickman.vel.x = 0;
  }

  if (kb.pressing('up')) {
    stickman.vel.y = -PLAYERSPEED;
  } else if (kb.pressing('down')) {
    stickman.vel.y = PLAYERSPEED;
  }

  if (kb.released('up')) {
    stickman.vel.y = 0;
  } else if (kb.released('down')) {
    stickman.vel.y = 0;
  }
}


function gnomeMakerH() {
  while (gnomesH.length < 5) { // Keep spawning until we have 5 gnomes
    let gnomeH = new Sprite(GNOME_X, random(5, 495), GNOMESIZE, 'k');
    gnomeH.color = 'red';
    gnomeH.vel.x = random(GNOMESPEED);
    gnomesH.push(gnomeH);
  }
}
function gnomeDetectH() {
  for (let i = gnomesH.length - 1; i >= 0; i--) {
    if (gnomesH[i].x > GAMEWIDTH) { // If gnome moves off screen
      gnomesH[i].remove();
      gnomesH.splice(i, 1); // Remove from array
      score++;
    }
  }
  gnomeMakerH(); // Ensure 5 gnomes exist after checking

}

function gnomeDetectV() {
  for (let i = gnomesV.length - 1; i >= 0; i--) {
    if (gnomesV[i].y > GAMEHEIGHT) { // If gnome moves off screen
      gnomesV[i].remove();
      gnomesV.splice(i, 1);
      score++;
    }
  }
  gnomeMakerV(); // Ensure 5 gnomes exist after checking

}
function gnomeMakerV() {
  while (gnomesV.length < 5) { // Keep spawning until we have 5 gnomes
    let gnomeV = new Sprite(random(5, 495), GNOME_Y, GNOMESIZE, 'k'); // Spawn at the top
    gnomeV.color = 'blue';
    gnomeV.vel.y = random(GNOMESPEED);
    gnomesV.push(gnomeV);
  }
}

function displayScore() {
  fill(0, 0, 0);
  textSize(20);
  text("Score: " + score, GAMEWIDTH - 400, 30); // Move right
}

function displayTimer() {
  if (gameOver) return;
  elapsedTime = floor((millis() - startTime) / 1000); // Convert milliseconds to seconds
  var remainingTime = max(timeLimit - elapsedTime, 0);
  fill(0, 0, 0);
  textSize(20);
  text("Time: " + remainingTime + "s left!", GAMEWIDTH - 400, 55); // Move right
  console.log(elapsedTime);

  if (remainingTime === 0) {
    winGame();
  }
}

function endGame() {
  if (gameOver) return; // Prevent running twice

  gameOver = true;
  background("red");
  fill(0); // Set text color to black
  textSize(15);
  textAlign(CENTER, CENTER);
  text("You died after " + elapsedTime + "s, and dodged " + score + " gnomes!", GAMEWIDTH / 2, GAMEHEIGHT / 2);
  text("Restart out of order please refresh", GAMEWIDTH/ 2, GAMEHEIGHT / 2 + 50);
  allSprites.remove();


  noLoop(); // found noLoop and Loop through GPT

}


function startScreen() {
  console.log("startScreen")
  background.color = ("#A7C7E7");
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Gnome Dodger", width / 2, height / 3);

  //INSTRUCTIONS TEXT
  fill(0); // text colour black again
  textSize(20);
  text("Instructions: The aim of the game is \nto dodge as many gnomes as you \ncan for 15 seconds, moving with the \narrow OR WASD keys. \nPress Enter To Start.",
    width / 2, height / 3 + 200,);

if(key === " " || key === "Enter"){
  console.log("game started!");
  startGame();
}


}


function startGame() {
  background("white");
  gameState = 'playing';
  startTime = millis();
}

function runGame() {
  if (frameCount % 60 === 0) {
    gnomeMakerH();
    gnomeMakerV();
  }
  background('white');
  movement();
  gnomeDetectH();
  gnomeDetectV();
  displayScore();
  displayTimer();
  gnomeTouch();
}

function gnomeTouch() {
  for (let i = 0; i < gnomesH.length; i++) {
    if (stickman.collide(gnomesH[i])) {
      endGame(); // End the game if collision detected
      return;
    }
  }

  for (let i = 0; i < gnomesV.length; i++) {
    if (stickman.collide(gnomesV[i])) {
      endGame(); // End the game if collision detected
      return;
    }
  }
}

function winGame() {
  if (gameOver) return; // Prevent running multiple times

  gameOver = true;
  background("gold");
  fill(0); // Set text color to black
  textSize(20);
  textAlign(CENTER, CENTER);
  text("YOU WIN!\nYou dodged " + score + " gnomes\nDuring " + elapsedTime + "s!", GAMEWIDTH / 2, GAMEHEIGHT / 2);

  text("Restart unavailable right now please", GAMEWIDTH / 2, GAMEHEIGHT / 2 + 50);

  stickman.remove();
  for (let i = 0; i < gnomesH.length; i++) {
    gnomesH[i].remove();
  }
  gnomesH = [];
  for (let i = 0; i < gnomesV.length; i++) {
    gnomesV[i].remove();
  }
  gnomesV = [];
  noLoop(); // Stop the game loop
}

function keyPressed() {
  if (key === 'r' || key === 'R') { //R = restart button
    restartGame();
  }
}

function restartGame() {
  background("white");
  allSprites.remove();

  startTime = millis();

  
  gameSetup();
}

function gameSetup() {
  gameState = "setup";
  if (gameState == "setup"){
  console.log("setting up game");
  stickman = new Sprite((GAMEWIDTH / 2), (GAMEHEIGHT / 2), PLAYERSIZE, PLAYERSIZE, 'd');
  stickman.color = 'black';

  Lwall = new Sprite(0, (GAMEHEIGHT / 2), 5, GAMEHEIGHT, 'k');  //Left wall
  Lwall.color = 'black';

  Rwall = new Sprite(500, (GAMEHEIGHT / 2), 5, GAMEHEIGHT, 'k'); //Right wall 
  Rwall.color = 'black';

  Twall = new Sprite((GAMEWIDTH / 2), 0, GAMEWIDTH, 5, 'k'); //Top wall 
  Twall.color = 'black';

  Bwall = new Sprite((GAMEWIDTH / 2), 500, GAMEWIDTH, 5, 'k'); //Bottom wall
  Bwall.color = 'black';
  gameOver = false;
  score = 0;
  startTime = millis(); //setting the starting time 
  gameState = "start";
  }
}
/*******************************************************/
//TO DO

// function getElapsedTime() {
// return floor((millis() - startTime) / 1000);
//}
/*******************************************************/
//END OF GAME
/*******************************************************/