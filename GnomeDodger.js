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
const GNOMESIZE = 200;

let gnomex;
let gnomey;

/*******************************************************/
//SETUP

function setup() {
    cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT)
    stickman = new Sprite((GAMEWIDTH/2), (GAMEHEIGHT/2), PLAYERSIZE, PLAYERSIZE, 'd');
    stickman.color = 'black';

    let gnomey = (random(1,499));
    let gnomex = (random(1,499));
    gnomeMaker();
}

/*******************************************************/
//GAME

function draw(){
    background('white');
    movement();
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


function gnomeMaker(){
    //make the gnome at a random point on the border
    gnome = new Sprite((0, gnomex), (0, gnomey), GNOMESIZE,'k');
    gnome.color = 'red';
}
/*******************************************************/