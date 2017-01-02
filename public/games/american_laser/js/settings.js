var CANVAS_WIDTH = 960;
var CANVAS_HEIGHT = 1260;

var EDGEBOARD_X = 96;
var EDGEBOARD_Y = 0;

var DISABLE_SOUND_MOBILE = false;

var FPS_TIME      = 1000/24;
var FONT_GAME = "Alef";

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP   = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT  = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END   = 5;
var ON_PRESS_MOVE = 6;

var NUM_FRUITS = 6;
var Y_START_FRUIT = CANVAS_HEIGHT + 200;
var OCCURENCE_FRUIT;
var MAX_FRUIT_ROT_SPEED;
var NUM_LIVES;
var STARTING_SIMULTANEOUS_FRUITS;
var MAX_SIMULTANEOUS_FRUITS;
var FRUIT_TO_CUT_FOR_LEVEL_UP;
var TIME_FOR_COMBO;
var COMBO_TWO_FRUIT;
var LINE_DRAW_INTERVAL = 100;
var BOMB_SYMBOL = 6;
var SOUNDTRACK_VOLUME = 0.5;