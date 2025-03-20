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
const GNOMESPEED = [5,10,15,20];
const WALLTHICK = 5;

let gnomex;
let gnomey;
let gameState = "start";
let startButton;
var gameOver = (false);
let score = 0;
var startTime;
var timeLimit = 5;
var remainingTime;
var elapsedTime;



/*******************************************************/
//SETUP

function setup() {
    cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT)
    stickman = new Sprite((GAMEWIDTH/2), (GAMEHEIGHT/2), PLAYERSIZE, PLAYERSIZE, 'd');
    stickman.color = 'black';

    startTime = millis(); //setting the starting time 

    //let gnomey = (random(1,499));
    //let gnomex = (random(1,499));


 /*******************************************************************************************/
 //WALLS
Lwall = new Sprite(0, (GAMEHEIGHT/2), 5, GAMEHEIGHT, 'k');  //Left wall
Lwall.color = 'black';

Rwall = new Sprite(500, (GAMEHEIGHT/2), 5, GAMEHEIGHT, 'k'); //Right wall 
Rwall.color = 'black';

Twall = new Sprite((GAMEWIDTH/2), 0, GAMEWIDTH, 5, 'k'); //Top wall 
Twall.color = 'black';

Bwall = new Sprite((GAMEWIDTH/2), 500, GAMEWIDTH, 5, 'k'); //Bottom wall
Bwall.color = 'black';

    // Create the Start Button
    startButton = createButton("START");
    startButton.position(width/2, height/2); // Center the button
    startButton.style("font-size", "24px");
    startButton.style("font-weight", "bold");
    startButton.style("padding", "10px 20px");
    startButton.style("background-color", "#4CAF50"); // Green button
    startButton.style("color", "white");
    startButton.style("border", "none");
    startButton.style("cursor", "pointer");
    startButton.mousePressed(startGame);
    let buttonWidth = 140;  // Approximate width based on padding & font size
    let buttonHeight = 50;  // Approximate height
    startButton.position(width / 2 - buttonWidth / 2, height / 2 + buttonHeight);
}
/*******************************************************************************************/
//GAME

function draw(){
   if (gameState === 'start'){
    startScreen();
  } else if (gameState === 'playing')
    runGame();

   
}
/*******************************************************/
//FUNCTIONS
function movement(){
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


function gnomeMakerV(){
    //make the gnome at a random point on the border at the top
    let speedV = random(GNOMESPEED); // pick random speed from speed array
    gnomeV = new Sprite(random(5,495), GNOME_Y, GNOMESIZE,'k');
    gnomeV.color = 'red';
    gnomeV.vel.y = speedV;

}

function gnomeMakerH(){
     //make the gnome at a random point on the border
     let speedH = random(GNOMESPEED); // pick random speed from speed array
     gnomeH = new Sprite(GNOME_X, random(5,495), GNOMESIZE,'k');
     gnomeH.color = 'red';
     gnomeH.vel.x = speedH;
}

function gnomeDetectV(){
  if (gnomeV.y>GAMEHEIGHT){
    //detect once gnome has reached the perimeter of gamewindow
    gnomeV.remove();
    gnomeMakerV();
    score++;
  } else{
  
  }
}
function gnomeDetectH(){
  if (gnomeH.x>GAMEWIDTH){
 
    //detect once gnome has reached the perimeter of gamewindow
    gnomeH.remove();
    gnomeMakerH();
    score++;
  } else{

  }
}

function displayScore(){
  fill(0, 0, 0);
  textSize(20);
  text("Score: " + score, 5 ,30);
}

function displayTimer() {
  if (gameOver) return;
  elapsedTime = floor((millis() - startTime) / 1000); // Converting milliseconds to seconds
  var remainingTime = max(timeLimit - elapsedTime, 0)
  fill(0, 0, 0);
  textSize(20);
  text("Time: " + remainingTime + "s left!", 5, 55);
  console.log (elapsedTime);

  if (remainingTime === 0){
    endGame();
  }
}

function endGame() {
  if (gameOver) return;

  gameOver = (true);
  background("red"); 
  fill(0); // Set text colour to black
  textSize(15);
  textAlign(CENTER, CENTER); // Center the text 
  console.log (elapsedTime);
  text("You died after " + elapsedTime + "s, and dodged " + score + " gnomes!", GAMEWIDTH / 2, GAMEHEIGHT / 2);

  stickman.remove;
  gnomeH.remove;
  gnomeV.remove;

  noLoop(); //found noLoop online 
}

function startScreen(){
  background.color = ("#A7C7E7");

    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Gnome Dodger", width / 2, height / 3);

    //INSTRUCTIONS TEXT
    fill(0); // text colour black again
    textSize(20);
    text("Instructions: The aim of the game is \nto dodge as many gnomes as you \ncan for 15 seconds, moving with the \narrow OR WASD keys. \nCan you do it?", 
      width / 2, height / 3 + 200,); 
}
    

function startGame(){
  gameState = 'playing';
  startTime = millis();
  startButton.remove();
}

function runGame(){
  //gnomeMakerH();
  //gnomeMakerV();
  background('white');
  movement();
  gnomeDetectH();
  gnomeDetectV();
  displayScore();
  displayTimer();
}

/*******************************************************/
//TO DO

// function getElapsedTime() {
 // return floor((millis() - startTime) / 1000); 
//}
/*******************************************************/
//END OF GAME
/*******************************************************/