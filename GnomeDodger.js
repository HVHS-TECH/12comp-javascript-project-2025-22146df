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
let score = 0;
let startTime;



/*******************************************************/
//SETUP

function setup() {
    cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT)
    stickman = new Sprite((GAMEWIDTH/2), (GAMEHEIGHT/2), PLAYERSIZE, PLAYERSIZE, 'd');
    stickman.color = 'black';

    startTime = millis(); //setting the starting time 

    //let gnomey = (random(1,499));
    //let gnomex = (random(1,499));
    gnomeMakerH();
    gnomeMakerV();

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
}
/*******************************************************************************************/
//GAME

function draw(){
    background('white');
    movement();
    gnomeDetectH();
    gnomeDetectV();
    displayScore();
    displayTimer();

   
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
    console.log("bottom");
    //detect once gnome has reached the perimeter of gamewindow
    gnomeV.remove();
    gnomeMakerV();
    score++;
  } else{
    console.log("TOP");
  }
}
function gnomeDetectH(){
  if (gnomeH.x>GAMEWIDTH){
    console.log("inside");
    //detect once gnome has reached the perimeter of gamewindow
    gnomeH.remove();
    gnomeMakerH();
    score++;
  } else{
    console.log("RIGHTWALL");
  }
}

function displayScore(){
  fill(0, 0, 0);
  textSize(20);
  text("Score: " + score, 5 ,30);
}

function displayTimer() {
  let elapsedTime = floor((millis() - startTime) / 1000); // Converting milliseconds to seconds
  fill(0, 0, 0);
  textSize(20);
  text("Time: " + elapsedTime + "s", 5, 55);
}
/*******************************************************/