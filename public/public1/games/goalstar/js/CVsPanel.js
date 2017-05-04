function CVsPanel(oSprite, iPlayerTeam, iOpponentTeam, iLv, iTimeAnim) {

    var _pStartContinuePos;
    var _oContainer;
    var _oVsPanel;
    var _oPlayerTeamFlag;
    var _oOpponentTeamFlag;
    var _oVsTextStroke;
    var _oVsText;
    var _oPlayerCharacter;
    var _oOpponentCharacter;
    var _oContPlayerTeam;
    var _oContOpponentTeam;
    var _oContVsText;
    var _oButContinue;

    this._init = function (oSprite, iPlayerTeam, iOpponentTeam, iLv, iTimeAnim) {
        _oContainer = new createjs.Container();

        if (oSprite !== null) {
            _oVsPanel = createBitmap(oSprite);
            _oContainer.addChild(_oVsPanel);
        }

        _oContPlayerTeam = new createjs.Container();
        _oContOpponentTeam = new createjs.Container();
        _oContVsText = new createjs.Container();

        var iLevel = iLv + 1;

        var oTextMatchStroke;
        oTextMatchStroke = new createjs.Text(TEXT_MATCH + " " + iLevel, "32px " + FONT_GAME, "#000000");
        oTextMatchStroke.x = CANVAS_WIDTH * 0.5;
        oTextMatchStroke.y = CANVAS_HEIGHT * 0.5 - 150;
        oTextMatchStroke.textAlign = "center";
        oTextMatchStroke.outline = 5;
        _oContainer.addChild(oTextMatchStroke);

        var oTextMatch;
        oTextMatch = new createjs.Text(TEXT_MATCH + " " + iLevel, "32px " + FONT_GAME, TEXT_COLOR);
        oTextMatch.x = CANVAS_WIDTH * 0.5;
        oTextMatch.y = CANVAS_HEIGHT * 0.5 - 150;
        oTextMatch.textAlign = "center";
        _oContainer.addChild(oTextMatch);

        var oSpriteFlagPlayer = s_oSpriteLibrary.getSprite("flag_" + iPlayerTeam);
        _oPlayerTeamFlag = createBitmap(oSpriteFlagPlayer);
        _oPlayerTeamFlag.regX = oSpriteFlagPlayer.width * 0.5;
        _oPlayerTeamFlag.regY = oSpriteFlagPlayer.height * 0.5;
        _oPlayerTeamFlag.x = CANVAS_WIDTH * 0.5 - 200;
        _oPlayerTeamFlag.y = CANVAS_HEIGHT * 0.5 + 30;

        _oContPlayerTeam.addChild(_oPlayerTeamFlag);

        var oSpriteFlagOpponent = s_oSpriteLibrary.getSprite("flag_" + iOpponentTeam);
        _oOpponentTeamFlag = createBitmap(oSpriteFlagOpponent);
        _oOpponentTeamFlag.regX = oSpriteFlagOpponent.width * 0.5;
        _oOpponentTeamFlag.regY = oSpriteFlagOpponent.height * 0.5;
        _oOpponentTeamFlag.x = CANVAS_WIDTH * 0.5 + 200;
        _oOpponentTeamFlag.y = CANVAS_HEIGHT * 0.5 + 30;

        _oContOpponentTeam.addChild(_oOpponentTeamFlag);

        var oSpritePlayer = s_oSpriteLibrary.getSprite("team_" + iPlayerTeam);
        _oPlayerCharacter = new CCharacter(CANVAS_WIDTH * 0.5 - 250, CANVAS_HEIGHT * 0.5 + 10, oSpritePlayer, 0, _oContPlayerTeam);

        var oSpriteOpponent = s_oSpriteLibrary.getSprite("team_" + iOpponentTeam);
        _oOpponentCharacter = new COpponent(CANVAS_WIDTH * 0.5 + 250, CANVAS_HEIGHT * 0.5 + 10,
                oSpriteOpponent, CHARACTER_SPEED, null, null, _oContOpponentTeam);

        _oContOpponentTeam.x = CANVAS_WIDTH * 0.5;
        _oContPlayerTeam.x = -CANVAS_WIDTH * 0.5;

        _oContVsText.x = CANVAS_WIDTH * 0.5;
        _oContVsText.y = CANVAS_HEIGHT * 0.5 + 30;

        _oContainer.addChild(_oContPlayerTeam, _oContOpponentTeam, _oContVsText);

        var iT = iTimeAnim;

        if (iT !== null) {

        } else {
            iT = 0;
        }

        createjs.Tween.get(_oContOpponentTeam).wait(iT).to({x: 0}, 1000, createjs.Ease.elasticOut);

        var oParent = this;
        createjs.Tween.get(_oContPlayerTeam).wait(iT).to({x: 0}, 1000, createjs.Ease.elasticOut).call(function () {
            oParent._createVsText(_oContVsText);
            _oContVsText.scaleX = 10;
            _oContVsText.scaleY = 10;
            createjs.Tween.get(_oContVsText).to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.bounceOut).call(function () {
                oParent._createButContinue(_oContainer, CANVAS_WIDTH * 0.5 + 600, CANVAS_HEIGHT * 0.5 + 340);
            });
        });

        s_oStage.addChild(_oContainer);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (_oButContinue)
            _oButContinue.setPosition(_pStartContinuePos.x - iNewX, _pStartContinuePos.y - iNewY);
    };

    this._createButContinue = function (oContainer, iX, iY) {
        _pStartContinuePos = {x: iX, y: iY};
        var oSprite = s_oSpriteLibrary.getSprite('but_continue');
        _oButContinue = new CGfxButton(_pStartContinuePos.x, _pStartContinuePos.y, oSprite, oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onExitVsPanel, this);
        _oButContinue.pulseAnimation();
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this._createVsText = function (oContainer) {
        _oVsTextStroke = new createjs.Text(TEXT_VS, "100px " + FONT_GAME, "#000000");
        _oVsTextStroke.x = 0;
        _oVsTextStroke.y = 0;
        _oVsTextStroke.textAlign = "center";
        _oVsTextStroke.textBaseline = "middle";
        _oVsTextStroke.outline = 5;
        oContainer.addChild(_oVsTextStroke);

        _oVsText = new createjs.Text(TEXT_VS, "100px " + FONT_GAME, TEXT_COLOR);
        _oVsText.x = 0;
        _oVsText.y = 0;
        _oVsText.textAlign = "center";
        _oVsText.textBaseline = "middle";
        oContainer.addChild(_oVsText);
    };

    this.setChildIndex = function (iVal) {
        s_oStage.setChildIndex(_oContainer, iVal);
    };

    this.unload = function () {
        s_oStage.removeChild(_oContainer);
    };

    this._onExitVsPanel = function () {
        var oParent = this;

        oParent.unload();
        s_oGame._onExitVsPanel();
        s_oInterface.unloadHelpPanel();
    };

    this._init(oSprite, iPlayerTeam, iOpponentTeam, iLv, iTimeAnim);

    s_oVsPanel = this;

    return this;
}

var s_oVsPanel = null;