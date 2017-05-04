var CANVAS_WIDTH = 1360;
var CANVAS_HEIGHT = 840;

var EDGEBOARD_X = 120;
var EDGEBOARD_Y = 122;

var DISABLE_SOUND_MOBILE = false;
var FONT_GAME = "bd_cartoon_shoutregular";
var TEXT_COLOR = "white";

var FPS_TIME = 1000 / 24;

var TIME_STEP_BOX2D = 1 / 60;

var ITINERATION_BOX2D = 10;

var POSITION_ITINERATION_BOX2D = 10;

var TOT_TEAM = 8;

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_HELP = 1;
var STATE_GAME = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;

var TWEEN_END_MACTH_Y = CANVAS_HEIGHT * 0.5;

var MAX_ASSIGNED_STAR = 3;

var LEVEL_DIAGRAM;

var GOAL_AREA = 0;

var GOAL_AREA_ENEMY = 1;

var WALL = 2;

var POLE = 3;

var PLAYER = 4;

var LEG = 5;

var BALL = 6;

var HEAD_SHOOT = 7;

var HEEL = 8;

var OPPONENT = 9;

var TIME_TRY_TO_SHOT_BALL_OPPONENT = 0.7;

var BALL_CATEGORY_COLLISION = 0x0001;
var FIELD_CATEGORY_COLLISION = 0x0002;
var JOINT_CATEGORY_COLLISION = 0x0003;
var OPPONENT_CATEGORY_COLLISION = 0x0004;
var PLAYER_CATEGORY_COLLISION = 0x0005;

var TIME_DESPAWN_HEAD = 0.2;

var STOP_WALK_DISTANCE_PLAYER = 80;

var CLIMB_PART;

var BALL_DENSITY = 1;

var BALL_FRICTION = 0.4;

var BALL_RESTITUTION = 0.8;

var BALL_LINEAR_DAMPING = 0.5;

var BALL_LINEAR_DAMPING_GOAL = 2;

var OBJECT;

var SUPPORTERS_FRAMES = 31;

var SUPPORTERS_POS = {x: 0, y: 120};

var START_TIME_FLAG_TIME = 200;

var STOP_BACK_WALK_POSITION = CANVAS_WIDTH * 0.5 + CANVAS_WIDTH / 5;

var OFFSET_LEG_POS = {x: 10, y: 30};

var OFFSET_HEAD_POS = {x: 15, y: -40};

var OFFSET_HEEL_POS = {x: -5, y: 40};

var OFFSET_LEG_POS_OPPONENT = {x: -10, y: 30};

var OFFSET_HEAD_POS_OPPONENT = {x: -15, y: -40};

var OFFSET_HEEL_POS_OPPONENT = {x: 5, y: 40};

var MIN_DISTANCE_BETWEEN_PLAYER = 150;

var GO_TO_DISTANCE = 230;

var DISTANCE_START_SHOOT_OPPONENT = 95;

var HEEL_SHOOT_DISTANCE_OPPONENT = 100;

var OFFSET_OPPONENT_FORWOARD_BALL = 40;

var WALL_DENSITY = 1;

var WALL_FRICTION = 1.0;

var WALL_RESTITUTION = 0.7;

var WORLD_SCALE = 30;

var TWEEN_CROWD_ON_Y = -170;

var DELETE_LEG_ANGLE_PLAYER = 70;

var DELETE_HEEL_ANGLE_PLAYER = -70;

var DELETE_LEG_ANGLE_OPPONENT = -70;

var DELETE_HEEL_ANGLE_OPPONENT = 70;

var FORCE_AFTER_GOAL_PLAYER = {x: 0.02, y: 0};

var FORCE_AFTER_GOAL_OPPONENT = {x: -0.02, y: 0};

var BALL_POSITION = {x: CANVAS_WIDTH * 0.5, y: 180};

var USER_PLAYER_START_POS = {x: CANVAS_WIDTH * 0.5 - 250, y: CANVAS_HEIGHT * 0.5 + 59};

var OPPONENT_START_POS = {x: CANVAS_WIDTH * 0.5 + 250, y: CANVAS_HEIGHT * 0.5 + 59};

var GOAL_AREA_VERTEX = [{x: 0, y: 7}, {x: 0, y: 231}, {x: 89, y: 231}, {x: 89, y: 7}];

var PLAYER_POLYGON = [[{x: 22.5, y: 16}, {x: -16.5, y: 53}, {x: -35, y: 23}, {x: 36.5, y: -26}, {x: 44.5, y: -10}],
    [{x: -2.5, y: -68}, {x: 30.5, y: -68}, {x: 36.5, y: -64}, {x: -13.5, y: -11}, {x: -20.5, y: -24},
        {x: -20.5, y: -50}],
    [{x: -25.5, y: 79}, {x: -26.5, y: 68}, {x: -16.5, y: 53}, {x: 10.5, y: 70}, {x: 14.5, y: 80}],
    [{x: -16.5, y: 53}, {x: 22.5, y: 16}, {x: 17.5, y: 62}, {x: 10.5, y: 70}],
    [{x: -35.5, y: 23}, {x: -35, y: 15}, {x: -13.5, y: -11}, {x: 36.5, y: -64}, {x: 36.5, y: -26}]];

var OPPONENT_POLYGON = [[{x: 36.000, y: 8.000}, {x: 18.000, y: 42.000}, {x: 14.000, y: -20.000}],
    [{x: -13.500, y: 69.500}, {x: -21.500, y: 5.500}, {x: 18.000, y: 42.000}, {x: 27.000, y: 60.000},
        {x: 26.167, y: 68.833}],
    [{x: 21.000, y: -61.000}, {x: 22.000, y: -37.000}, {x: 14.000, y: -20.000}, {x: -28.500, y: -79.500},
        {x: -0.500, y: -79.500}],
    [{x: -44.500, y: -24.500}, {x: -37.000, y: -37.000}, {x: -21.500, y: 5.500}],
    [{x: 14.000, y: -20.000}, {x: 18.000, y: 42.000}, {x: -21.500, y: 5.500}, {x: -37.000, y: -37.000},
        {x: -28.500, y: -79.500}],
    [{x: -37.000, y: -73.000}, {x: -28.500, y: -79.500}, {x: -37.000, y: -37.000}]];

var OFFSET_FIELD_Y = 35;
var OFFSET_FIELD_X = 35;

//FIELD DIAGRAM

var FIELD_DIAGRAM = [[{x: 120, y: -200}, {x: 120, y: 560}], [{x: 120, y: 560}, {x: 1240, y: 560}],
    [{x: 1240, y: 560}, {x: 1240, y: -200}], [{x: 1240, y: -200}, {x: 120, y: -200}]];

var OBJECT = [[{x: 142, y: 324, angle: 0, density: 0, friction: 0.0, restitution: 0.0, offset_front: {x: 0, y: 0}, sensor: true,
            offset_back: {x: 30, y: 0}, info: {type: GOAL_AREA_ENEMY}, vertex: GOAL_AREA_VERTEX}],
    [{x: 1128, y: 324, angle: 0, density: 0, friction: 0.0, restitution: 0.0, offset_front: {x: 90, y: 0}, sensor: true,
            offset_back: {x: 60, y: 0}, info: {type: GOAL_AREA}, vertex: GOAL_AREA_VERTEX}],
    [{x: 142, y: 300, width: 120, height: 3, angle: 15, density: 0, friction: 0.5, restitution: 1, sensor: false,
            info: {type: POLE}}],
    [{x: 1218, y: 300, width: 120, height: 3, angle: -15, density: 0, friction: 0.5, restitution: 1, sensor: false,
            info: {type: POLE}}]];

var PLAYERS_COLLISION = {x: USER_PLAYER_START_POS.x, y: USER_PLAYER_START_POS.y, angle: 0, density: 70, friction: 0.1,
    restitution: 0.1, rec_offset: {x: -30, y: 40}, sensor: false, info: {type: PLAYER}, recWidth: 24, recHeight: 40, rec_center_width: 12,
    radius: 32, sph_offset: {x: -12, y: -35}, rec_neck: {x: -50, y: -13, width: 4, height: 7, angle: 45}};

var PLAYER_LEG = {width: 2, height: 20, density: 50, pivotX: 0, pivotY: -24, friction: 0.5, restitution: 2, radius: 10,
    info: {type: LEG}, lowerAngle: 0, upperAngle: DELETE_LEG_ANGLE_PLAYER, power: 2000, speed: 8};

var PLAYER_HEEL = {width: 2, height: 25, density: 50, pivotX: -4, pivotY: -26, friction: 0.5, restitution: 2, radius: 10,
    info: {type: HEEL}, lowerAngle: DELETE_HEEL_ANGLE_PLAYER, upperAngle: 0, power: 2000, speed: -8};

var PLAYER_HEAD = {radius: 30, density: 50, friction: 0.5, restitution: 4, info: {type: HEAD_SHOOT},
    distance: 20 / WORLD_SCALE, power: 4000, speed: 5, mov_allowed: {x: 1, y: 0.1}};


var OPPONENT_COLLISION = {x: OPPONENT_START_POS.x, y: OPPONENT_START_POS.y, angle: 0, density: 100, friction: 0.1,
    restitution: 0.1, rec_offset: {x: 30, y: 40}, sensor: false, info: {type: OPPONENT}, recWidth: 24, recHeight: 40, rec_center_width: -12,
    radius: 32, sph_offset: {x: 12, y: -35}, rec_neck: {x: 50, y: -13, width: 4, height: 7, angle: -45}};

var OPPONENT_LEG = {width: 2, height: 20, density: 50, pivotX: -4, pivotY: -24, friction: 0.5, restitution: 2, radius: 10,
    info: {type: LEG}, lowerAngle: DELETE_LEG_ANGLE_OPPONENT, upperAngle: 0, power: 2000, speed: -8};

var OPPONENT_HEEL = {width: 2, height: 25, density: 50, pivotX: 4, pivotY: -26, friction: 0.5, restitution: 2, radius: 10,
    info: {type: HEEL}, lowerAngle: 0, upperAngle: DELETE_HEEL_ANGLE_OPPONENT, power: 2000, speed: 8};

var OPPONENT_HEAD = {radius: 30, density: 50, friction: 0.5, restitution: 2, info: {type: HEAD_SHOOT},
    distance: 50 / WORLD_SCALE, power: 4000, speed: 5, mov_allowed: {x: -1, y: 0.1}};

var FLAG_POSITION = [{x: 691, y: 285}, {x: 896, y: 330}, {x: 978, y: 458}, {x: 890, y: 574}, {x: 691, y: 619},
    {x: 492, y: 567}, {x: 390, y: 448}, {x: 495, y: 321}];

var TIME_RESET_BALL;
var REGULAR_MATCH_TIME;
var EXTENDED_MATCH_TIME;
var OPPONENT_SPEEDS;
var CHARACTER_SPEED;
var OPPONENT_DISTANCE_PROTECTION;
var OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT;
var OPPONENT_DISTANCE_PROTECTION_AGG;
var OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT_AGG;
var REACT_OPP_FOR_HEEL_SHOOT;
var BALL_VELOCITY_X_REACTION;
var BALL_VELOCITY_X_REACTION_ATTACK;
var BALL_AND_CHARACTER_DISTANCE_PROTECTION;
var TIME_REACTION_FROM_SAVE_TO_GO;
var TIME_OPP_BECOME_AGGRESSIVE;
var TIME_AFTER_REACTION;
var TIME_INTERVAL_SHOOT;
var TIME_IN_PROTECT_STATE;
var SCORE_PLAYER_GOAL;
var SCORE_OPPONENT_GOAL;
var SCORE_WIN;
var SCORE_TIE;
var NUM_LEVEL_FOR_ADS;