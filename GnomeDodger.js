/*******************************************************/
// P5.play: GnomeDodger
//By Dylan Figliola
/*******************************************************/

//VARIABLES
const GAMEHEIGHT = 500;
const GAMEWIDTH = 500;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;
const PLAYERSIZE = 75;
/*******************************************************/
//SETUP

function setup() {
    cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT)
    player = new Sprite((GAMEWIDTH/2), (GAMEHEIGHT/2), PLAYERSIZE, PLAYERSIZE, 'd');
    player.color = 'black';
}

/*******************************************************/
//GAME

function draw(){
    background('white');
}
/*******************************************************/
