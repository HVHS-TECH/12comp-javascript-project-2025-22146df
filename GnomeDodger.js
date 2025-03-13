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


/*******************************************************/
//SETUP

function setup() {
    cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT)
    stickman = new Sprite((GAMEWIDTH/2), (GAMEHEIGHT/2), PLAYERSIZE, PLAYERSIZE, 'd');
    stickman.color = 'black';

    //let gnomey = (random(1,499));
    //let gnomex = (random(1,499));
    gnomeMakerH();
    gnomeMakerV();

    Lwall = new Sprite (0, (GAMEHEIGHT/2), GAMEHEIGHT, 5, 'k')
    Lwall.color = 'black';
    Rwall = new Sprite (500, (GAMEHEIGHT/2), 5, 'k')
    Rwall.color = 'black';
    Twall = new Sprite ((GAMEWIDTH/2), 0, 5, 'k')
    Twall.color = 'black';
    Bwall = new Sprite ((GAMEWIDTH/2), 500, 5, 'k')
    
}

/*******************************************************/
//GAME

function draw(){
    background('white');
    movement();
    gnomeDetectH();
    gnomeDetectV();

   
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
    gnomeV.remove();
    gnomeMakerV();
  } else{
    console.log("TOP");
  }
}
function gnomeDetectH(){
  if (gnomeH.x>GAMEWIDTH){
    console.log("inside");
    gnomeH.remove();
    gnomeMakerH();
  } else{
    console.log("RIGHTWALL");
  }
}
/*******************************************************/