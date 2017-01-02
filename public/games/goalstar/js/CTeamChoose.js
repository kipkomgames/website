function CTeamChoose() {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosContinue;
    var _oBg;
    var _oButContinue;
    var _oContTextSelectTeam;
    var _oFade;
    var _oAudioToggle;
    var _oButExit;
    var _oFlagSelect;
    var _oContainer;
    var _aPlayerTeamFlag;
    var _aPlayerTeamCharacter;
    var _aTeamText;
    var _iActiveTeam;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_select_team'));
        s_oStage.addChild(_oBg);

        _aTeamText = new Array();

        _aPlayerTeamFlag = new Array();
        _aPlayerTeamCharacter = new Array();

        _oContainer = new createjs.Container();

        _iActiveTeam = 0;

        var iTimeAnim = 1500;

        for (var i = 0; i < TOT_TEAM; i++) {
            var iTimeWait = Math.floor(Math.random() * 500);
            this._createFlag(i, FLAG_POSITION[i].x, FLAG_POSITION[i].y, iTimeWait, iTimeAnim, _oContainer);
            this._createPlayer(i, _oContainer);
        }

        var oSpriteFlagSelection = s_oSpriteLibrary.getSprite("flag_selection");

        _oFlagSelect = createBitmap(oSpriteFlagSelection);
        _oFlagSelect.x = _aPlayerTeamFlag[0].getX();
        _oFlagSelect.y = _aPlayerTeamFlag[0].getY();
        _oFlagSelect.regX = oSpriteFlagSelection.width * 0.5;
        _oFlagSelect.regY = oSpriteFlagSelection.height * 0.5;

        s_oStage.addChild(_oContainer);

        _oContainer.y = 12;

        _oContTextSelectTeam = new createjs.Container();

        var oSelectTeamText;

        oSelectTeamText = new createjs.Text(TEXT_SELECT_YOUR_TEAM, "48px " + FONT_GAME, TEXT_COLOR);
        oSelectTeamText.textAlign = "center";
        oSelectTeamText.x = 0;
        oSelectTeamText.y = 0;

        var oSelectTeamTextStroke;

        oSelectTeamTextStroke = new createjs.Text(TEXT_SELECT_YOUR_TEAM, "48px " + FONT_GAME, "#000000");
        oSelectTeamTextStroke.textAlign = "center";

        oSelectTeamTextStroke.x = 0;
        oSelectTeamTextStroke.y = 0;
        oSelectTeamTextStroke.outline = 5;

        _oContTextSelectTeam.x = 682;
        _oContTextSelectTeam.y = 176;

        _oContTextSelectTeam.addChild(oSelectTeamTextStroke, oSelectTeamText);

        s_oStage.addChild(_oContTextSelectTeam);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width / 2) - 60, y: (oSprite.height / 2) + 20};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _pStartPosContinue = {x: CANVAS_WIDTH * 0.5 + 600, y: CANVAS_HEIGHT * 0.5 + 340};
        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        _oButContinue = new CGfxButton(_pStartPosContinue.x, _pStartPosContinue.y, oSpriteContinue, s_oStage);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        _oButContinue.pulseAnimation();

        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSpriteExit.width / 2) - 15, y: (oSpriteExit.height / 2) + 20};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSpriteExit, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oFade.visible = false;
            _oContainer.addChild(_oFlagSelect);
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this._createFlag = function (i, iOffsetX, iOffsetY, iTimeWait, iTimeAnim, oContainer) {
        var oSpriteFlag = s_oSpriteLibrary.getSprite("flag_" + i);
        _aPlayerTeamFlag[i] = new CGfxButton(iOffsetX, iOffsetY, oSpriteFlag, oContainer);
        _aPlayerTeamFlag[i].addEventListenerWithParams(ON_MOUSE_UP, this._onButTeamChoose, this, i);

        var oButtonFlag = _aPlayerTeamFlag[i].getButton();

        oButtonFlag.scaleX = 0;
        oButtonFlag.scaleY = 0;

        createjs.Tween.get(oButtonFlag).wait(iTimeWait).to({scaleY: 1, scaleX: 1}, iTimeAnim, createjs.Ease.elasticOut);
    };

    this._createPlayer = function (i, oContainer) {
        var oSpriteChar = s_oSpriteLibrary.getSprite("team_" + i);
        _aPlayerTeamCharacter[i] = new CCharacter(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 + 30, oSpriteChar, 1, oContainer);
        _aPlayerTeamCharacter[i].changeState("run");
        if (i !== 0)
            _aPlayerTeamCharacter[i].setVisible(false);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        _oButContinue.setPosition(_pStartPosContinue.x - iNewX, _pStartPosContinue.y - iNewY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
    };

    this._onButTeamChoose = function (iID) {
        if (_iActiveTeam !== iID) {
            _aPlayerTeamCharacter[iID].setVisible(true);
            _oFlagSelect.x = _aPlayerTeamFlag[iID].getX();
            _oFlagSelect.y = _aPlayerTeamFlag[iID].getY();

            _aPlayerTeamCharacter[_iActiveTeam].setVisible(false);

            _iActiveTeam = iID;
        }
    };

    this.unload = function () {
        for (var i = 0; i < _aPlayerTeamFlag.length; i++) {
            _aPlayerTeamFlag[i].unload();
            _aPlayerTeamFlag[i] = null;
        }

        _oButExit.unload();
        _oButExit = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();

        s_oTeamChoose = null;
    };

    this._onExit = function () {
        this.unload();

        s_oMain.gotoMenu();
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButContinueRelease = function () {
        this.unload();

        s_oMain.gotoGame(_iActiveTeam);
    };

    s_oTeamChoose = this;

    this._init();
}

var s_oTeamChoose = null;