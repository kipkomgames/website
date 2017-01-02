function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;
    var _oTeamChoose;
    var _oCongratulations;

    this.initContainer = function () {
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = false;

        canvas.opacity = 0.5;

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundTrack = createjs.Sound.play("soundtrack", {loop: -1});
            }
            this.gotoMenu();
        }
    };

    this._initSounds = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/click.ogg", "click");
            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("./sounds/crowd.ogg", "crowd");
            createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
            createjs.Sound.registerSound("./sounds/goal.ogg", "goal");
            createjs.Sound.registerSound("./sounds/kick.ogg", "kick");
            createjs.Sound.registerSound("./sounds/kick_off.ogg", "kick_off");
        } else {
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/click.mp3", "click");
            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("./sounds/crowd.mp3", "crowd");
            createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
            createjs.Sound.registerSound("./sounds/goal.mp3", "goal");
            createjs.Sound.registerSound("./sounds/kick.mp3", "kick");
            createjs.Sound.registerSound("./sounds/kick_off.mp3", "kick_off");

        }

        RESOURCE_TO_LOAD += 7;

    };

    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_head", "./sprites/but_head.png");
        s_oSpriteLibrary.addSprite("but_kick", "./sprites/but_kick.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_restart_small", "./sprites/but_restart_small.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_continue_big", "./sprites/but_continue_big.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_team", "./sprites/bg_select_team.jpg");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("goal_front", "./sprites/goal_front.png");
        s_oSpriteLibrary.addSprite("goal_back", "./sprites/goal_back.png");
        s_oSpriteLibrary.addSprite("keyboard", "./sprites/keyboard.png");
        s_oSpriteLibrary.addSprite("key_head", "./sprites/key_head.png");
        s_oSpriteLibrary.addSprite("key_kick", "./sprites/key_kick.png");
        s_oSpriteLibrary.addSprite("score_board", "./sprites/score_board.png");
        s_oSpriteLibrary.addSprite("time_board", "./sprites/time_board.png");
        s_oSpriteLibrary.addSprite("contact_ball", "./sprites/contact_ball.png");
        s_oSpriteLibrary.addSprite("goal_text", "./sprites/goal_text.png");
        s_oSpriteLibrary.addSprite("crowd_off", "./sprites/crowd_off.png");
        s_oSpriteLibrary.addSprite("crowd_on", "./sprites/crowd_on.png");
        s_oSpriteLibrary.addSprite("bg_congratulations", "./sprites/bg_congratulations.jpg");
        s_oSpriteLibrary.addSprite("flag_selection", "./sprites/flag_selection.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");

        for (var i = 0; i < TOT_TEAM; i++) {
            s_oSpriteLibrary.addSprite("team_" + i, "./sprites/team_" + i + ".png");
            s_oSpriteLibrary.addSprite("flag_" + i, "./sprites/flag_" + i + ".png");
            s_oSpriteLibrary.addSprite("character_pose_" + i, "./sprites/character_pose_" + i + ".png");
        }

        for (var i = 0; i < SUPPORTERS_FRAMES; i++) {
            s_oSpriteLibrary.addSprite("supporters_" + i, "./sprites/supporters/supporters_" + i + ".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();
            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundTrack = createjs.Sound.play("soundtrack", {loop: -1});
            }
            this.gotoMenu();
        }
    };

    this._onAllImagesLoaded = function () {

    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };

    this.preloaderReady = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
            s_oSoundTrack = createjs.Sound.play("soundtrack", {loop: -1});
        }

        this._loadImages();
        _bUpdate = true;
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoTeamChoose = function () {
        _oTeamChoose = new CTeamChoose();
        _iState = STATE_MENU;
    };

    this.gotoGame = function (iTeamChoosed) {
        _oGame = new CGame(_oData, iTeamChoosed);
        _iState = STATE_GAME;
    };

    this.gotoHelp = function () {
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };

    this.gotoCongratulations = function (oResult, iScore) {
        _oCongratulations = new CCongratulations(oResult, iScore);
        _iState = STATE_MENU;
    };

    this.stopUpdate = function () {
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display", "block");
    };

    this.startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;

    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_oPhysicsController;
var s_oAdsLevel = 1;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack;