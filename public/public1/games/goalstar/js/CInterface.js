function CInterface(iPlayerTeam, iOpponentTeam) {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosPause;
    var _oButExit;
    var _oButPause;
    var _oHelpPanel;
    var _oAudioToggle;
    var _oVsPanel;
    var _oLosePanel;
    var _oWinPanel;
    var _oScoreBoard;
    var _oTimeBoard;
    var _oCrowd;
    var _oController;
    var _oPause;
    var _szPlayerTeam;
    var _szOpponentTeam;
    var _iPlayerTeam;
    var _iOpponentTeam;

    this._init = function (iPlayerTeam, iOpponentTeam) {

        this.setTeams(iPlayerTeam, iOpponentTeam);

        var oSpriteScoreBoard = s_oSpriteLibrary.getSprite("score_board");

        _oScoreBoard = new CScoreBoard(oSpriteScoreBoard, CANVAS_WIDTH * 0.5, (oSpriteScoreBoard.height * 0.5),
                _szPlayerTeam, _szOpponentTeam, _iPlayerTeam, _iOpponentTeam);

        var oSpriteTimeBoard = s_oSpriteLibrary.getSprite("time_board");

        _oTimeBoard = new CTimeBoard(oSpriteTimeBoard, 10, oSpriteTimeBoard.height * 0.5 - 4);

        var oSpriteCrowdOff = s_oSpriteLibrary.getSprite("crowd_off");

        var iPosCrowdOff = CANVAS_HEIGHT - oSpriteCrowdOff.height * 0.5;

        _oCrowd = new CCrowd(oSpriteCrowdOff, 0, iPosCrowdOff);

        if (s_bMobile) {
            _oController = new CController();
            this.blockCommand(true);
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = {x: _pStartPosExit.x - oSprite.height - 10, y: _pStartPosExit.y};
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
        _oButPause.addEventListener(ON_MOUSE_UP, this._onPause, this);

        this.blockAllButton(true);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosPause.x - oSprite.height - 10, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }


        _oHelpPanel = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite('bg_help'), _iPlayerTeam);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.setTeams = function (iPlayerTeam, iOpponentTeam) {
        _szPlayerTeam = eval("TEXT_TEAM_CODE_" + iPlayerTeam);
        _szOpponentTeam = eval("TEXT_TEAM_CODE_" + iOpponentTeam);

        _iPlayerTeam = iPlayerTeam;
        _iOpponentTeam = iOpponentTeam;
    };

    this.setTeamsFlagScoreBoard = function (iPlayerTeam, iOpponentTeam) {
        _oScoreBoard.changeTeamsFlag(iPlayerTeam, iOpponentTeam);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        _oButPause.setPosition(_pStartPosPause.x - iNewX, iNewY + _pStartPosPause.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        var oPosScore = _oScoreBoard.getStartPosition();
        _oScoreBoard.setPosition(oPosScore.x, oPosScore.y + iNewY);

        var oPosTime = _oTimeBoard.getStartPosition();
        _oTimeBoard.setPosition(oPosTime.x + iNewX, oPosTime.y + iNewY);

        if (s_bMobile)
            this.controllerPos(iNewX, iNewY);

    };

    this.controllerPos = function (iNewX, iNewY) {
        var oPosRightSide = _oController.getStartPositionRightSide();
        var oPosLeftSide = _oController.getStartPositionLeftSide();

        _oController.setPositionLeftSide(oPosLeftSide.x - iNewX, oPosLeftSide.y - iNewY);
        _oController.setPositionRightSide(oPosRightSide.x + iNewX, oPosRightSide.y - iNewY);

    };

    this.unload = function () {
        _oButExit.unload();
        _oButExit = null;

        if (_oHelpPanel)
            _oHelpPanel.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (s_bMobile)
            _oController.unload();

        s_oInterface = null;
    };

    this.refreshResult = function (iYouResult, iOpponentResult) {
        _oScoreBoard.refresh(_szPlayerTeam + " " + iYouResult + " - " + iOpponentResult + " " + _szOpponentTeam);
    };

    this.refreshTime = function (szTime) {
        _oTimeBoard.refresh(szTime);
    };

    this.onExitFromHelp = function () {
        this.createVsPanel(null, _iPlayerTeam, _iOpponentTeam, null, null, 0);
    };

    this.crowdEffectOn = function () {
        var oPos = _oCrowd.getPosition();

        var oSpriteCrowdOn = s_oSpriteLibrary.getSprite("crowd_on");

        oPos.y += oSpriteCrowdOn.height * 0.3;

        _oCrowd.crowOn(s_oSpriteLibrary.getSprite("crowd_on"), oPos.x, oPos.y, 750);
    };

    this.createEndMatchText = function (iGoalPlayer, iOpponentPlayer, bWin, oInfoScore, bEnd) {
        var oContainer = new createjs.Container();

        oContainer.x = CANVAS_WIDTH * 0.5;
        oContainer.y = -50;

        var oEndMatchTextStroke = new createjs.Text(TEXT_FINISH, "50px " + FONT_GAME, "#000000");
        oEndMatchTextStroke.x = 0;
        oEndMatchTextStroke.y = 0;
        oEndMatchTextStroke.textAlign = "center";
        oEndMatchTextStroke.outline = 5;
        oContainer.addChild(oEndMatchTextStroke);

        var oEndMatchText = new createjs.Text(TEXT_FINISH, "50px " + FONT_GAME, TEXT_COLOR);
        oEndMatchText.x = 0;
        oEndMatchText.y = 0;
        oEndMatchText.textAlign = "center";
        oContainer.addChild(oEndMatchText);

        s_oStage.addChild(oContainer);

        createjs.Tween.get(oContainer).to({y: TWEEN_END_MACTH_Y}, 1250, createjs.Ease.elasticOut).call(function () {
            createjs.Tween.get(oContainer).to({scaleX: 0, scaleY: 0}, 500, createjs.Ease.quartIn).call(function () {
                if (bWin) {
                    s_oInterface.createWinPanel(iGoalPlayer, iOpponentPlayer, oInfoScore, bEnd);
                } else {
                    s_oInterface.createLosePanel(iGoalPlayer, iOpponentPlayer, oInfoScore);
                }
                setVolume(s_oSoundTrack, 1);
                s_oStage.removeChild(oContainer);
            });
        });
    };

    this.createExtendedTimeText = function () {
        var oContainer = new createjs.Container();

        oContainer.x = -100;
        oContainer.y = CANVAS_HEIGHT * 0.5;

        var oExtTimeTextStroke = new createjs.Text(TEXT_TIME_EXTENDED, "50px " + FONT_GAME, "#000000");
        oExtTimeTextStroke.x = 0;
        oExtTimeTextStroke.y = 0;
        oExtTimeTextStroke.textAlign = "center";
        oExtTimeTextStroke.outline = 5;
        oContainer.addChild(oExtTimeTextStroke);

        var oExtTimeText = new createjs.Text(TEXT_TIME_EXTENDED, "50px " + FONT_GAME, TEXT_COLOR);
        oExtTimeText.x = 0;
        oExtTimeText.y = 0;
        oExtTimeText.textAlign = "center";
        oContainer.addChild(oExtTimeText);

        s_oStage.addChild(oContainer);

        createjs.Tween.get(oContainer).to({x: CANVAS_WIDTH * 0.5}, 750, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(oContainer).to({x: CANVAS_WIDTH + 100}, 750, createjs.Ease.cubicIn).call(function () {
                s_oGame.extendTime();
                s_oStage.removeChild(oContainer);
            });
        });
    };

    this.createLosePanel = function (iGoalPlayer, iOpponentPlayer) {
        _oLosePanel = new CLosePanel(s_oSpriteLibrary.getSprite("bg_congratulations"));
        _oLosePanel.show(iGoalPlayer, iOpponentPlayer, _iPlayerTeam, _iOpponentTeam);
    };

    this.createWinPanel = function (iGoalPlayer, iOpponentPlayer, oInfoScore, bEnd) {
        _oWinPanel = new CWinPanel(s_oSpriteLibrary.getSprite("bg_congratulations"), bEnd);
        _oWinPanel.show(iGoalPlayer, iOpponentPlayer, _iPlayerTeam, _iOpponentTeam, oInfoScore);
    };

    this.createVsPanel = function (oSprite, iPlayerTeam, iOpponentTeam, iIndex, iLv, iTimeAnim) {
        _oVsPanel = new CVsPanel(oSprite, iPlayerTeam, iOpponentTeam, iLv, iTimeAnim);
        if (iIndex !== null) {
            _oVsPanel.setChildIndex(iIndex);
        }

    };

    this.blockAllButton = function (bVal) {
        _oButExit.block(bVal);
        _oButPause.block(bVal);
    };

    this.getScoreBoardResult = function () {
        return _oScoreBoard.getResult();
    };

    this.unloadHelpPanel = function () {
        if (_oHelpPanel) {
            _oHelpPanel.unload();
            _oHelpPanel = null;
        }
    };

    this.createGoalText = function (iX, iY) {
        var oSpriteGoal = s_oSpriteLibrary.getSprite("goal_text");

        var oGoal;

        oGoal = createBitmap(oSpriteGoal);
        oGoal.regX = oSpriteGoal.width * 0.5;
        oGoal.regY = oSpriteGoal.height * 0.5;
        oGoal.x = iX;
        oGoal.y = iY;
        oGoal.scaleX = 0;
        oGoal.scaleY = 0;

        s_oStage.addChild(oGoal);

        createjs.Tween.get(oGoal).to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.quadOut).call(function () {
            createjs.Tween.get(oGoal).wait(500).to({scaleX: 0, scaleY: 0, alpha: 0}, 500, createjs.Ease.quadOut).call(function () {
                s_oStage.removeChild(oGoal);
            });
        });
    };

    this._onExitVsPanel = function () {
        _oVsPanel.unload();
        _oVsPanel = null;
    };

    this.createStartMatchText = function () {
        var oContainer = new createjs.Container();

        oContainer.x = CANVAS_WIDTH * 0.5;
        oContainer.y = -50;

        var oStartMatchTextStroke = new createjs.Text(TEXT_KICK_OFF, "50px " + FONT_GAME, "#000000");
        oStartMatchTextStroke.x = 0;
        oStartMatchTextStroke.y = 0;
        oStartMatchTextStroke.textAlign = "center";
        oStartMatchTextStroke.outline = 5;
        oContainer.addChild(oStartMatchTextStroke);

        var oStartMatchText = new createjs.Text(TEXT_KICK_OFF, "50px " + FONT_GAME, TEXT_COLOR);
        oStartMatchText.x = 0;
        oStartMatchText.y = 0;
        oStartMatchText.textAlign = "center";
        oContainer.addChild(oStartMatchText);

        s_oStage.addChild(oContainer);

        createjs.Tween.get(oContainer).to({y: TWEEN_END_MACTH_Y}, 1250, createjs.Ease.elasticOut).call(function () {
            createjs.Tween.get(oContainer).to({scaleX: 0, scaleY: 0}, 500, createjs.Ease.quartIn).call(function () {
                s_oGame.startMatch();
                s_oStage.removeChild(oContainer);
            });
        });
    };

    this.createPauseInterface = function () {
        _oPause = new CPause();
    };

    this.unloadPause = function () {
        _oPause.unload();
        _oPause = null;
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        var _oAreYouSure = new CAreYouSurePanel(s_oStage);
        _oAreYouSure.show();
    };

    this.blockCommand = function (bVal) {
        if (s_bMobile)
            _oController.block(bVal);
    };

    this._onPause = function () {
        s_oGame.unpause(false);
        this.createPauseInterface();
    };


    s_oInterface = this;

    this._init(iPlayerTeam, iOpponentTeam);

    return this;
}

var s_oInterface = null;