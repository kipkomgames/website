function CScoreBoard(oSprite, iX, iY, szPlayerTeam, szOpponentTeam, iPlayerTeam, iOpponentTeam) {

    var _pStartPosGoalResultContainer;
    var _oContainer;
    var _oScoreBoard;
    var _oGoalResult;
    var _oGoalResultStroke;
    var _oPlayerTeamFlag;
    var _oOpponentTeamFlag;

    this._init = function (oSprite, iX, iY, szPlayerTeam, szOpponentTeam, iPlayerTeam, iOpponentTeam) {
        _pStartPosGoalResultContainer = {x: iX, y: iY};

        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosGoalResultContainer.x;
        _oContainer.y = _pStartPosGoalResultContainer.y;

        _oScoreBoard = createBitmap(oSprite);
        _oScoreBoard.x = 0;
        _oScoreBoard.y = -3;
        _oScoreBoard.regX = oSprite.width * 0.5;
        _oScoreBoard.regY = 0;

        _oContainer.addChild(_oScoreBoard);

        _oGoalResultStroke = new createjs.Text(szPlayerTeam + " 0 - 0 " + szOpponentTeam, "28px " + FONT_GAME, "#000000");
        _oGoalResultStroke.x = 0;
        _oGoalResultStroke.y = oSprite.height * 0.5 - 3;
        _oGoalResultStroke.textAlign = "center";
        _oGoalResultStroke.textBaseline = "middle";
        _oGoalResultStroke.outline = 5;

        _oContainer.addChild(_oGoalResultStroke);

        _oGoalResult = new createjs.Text(szPlayerTeam + " 0 - 0 " + szOpponentTeam, "28px " + FONT_GAME, TEXT_COLOR);
        _oGoalResult.x = 0;
        _oGoalResult.y = _oGoalResultStroke.y;
        _oGoalResult.textAlign = "center";
        _oGoalResult.textBaseline = "middle";

        _oContainer.addChild(_oGoalResult);

        var oSpriteFlagPlayer = s_oSpriteLibrary.getSprite("flag_" + iPlayerTeam);

        _oPlayerTeamFlag = createBitmap(oSpriteFlagPlayer);
        _oPlayerTeamFlag.x = -170;
        _oPlayerTeamFlag.y = 5;
        _oPlayerTeamFlag.regX = oSpriteFlagPlayer.width * 0.5;
        _oPlayerTeamFlag.regY = 0;
        _oPlayerTeamFlag.scaleX = 0.3;
        _oPlayerTeamFlag.scaleY = 0.3;

        _oContainer.addChild(_oPlayerTeamFlag);

        var oSpriteFlagOpponent = s_oSpriteLibrary.getSprite("flag_" + iOpponentTeam);

        _oOpponentTeamFlag = createBitmap(oSpriteFlagOpponent);
        _oOpponentTeamFlag.x = 170;
        _oOpponentTeamFlag.y = 5;
        _oOpponentTeamFlag.regX = oSpriteFlagPlayer.width * 0.5;
        _oOpponentTeamFlag.regY = 0;
        _oOpponentTeamFlag.scaleX = 0.3;
        _oOpponentTeamFlag.scaleY = 0.3;

        _oContainer.addChild(_oOpponentTeamFlag);

        s_oStage.addChild(_oContainer);

    };

    this.changeTeamsFlag = function (iPlayerTeam, iOpponentTeam) {
        _oPlayerTeamFlag.image = s_oSpriteLibrary.getSprite("flag_" + iPlayerTeam);
        _oOpponentTeamFlag.image = s_oSpriteLibrary.getSprite("flag_" + iOpponentTeam);
    };

    this.getStartPosition = function () {
        return _pStartPosGoalResultContainer;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.unload = function () {
        s_oStage.removeChild(_oContainer);
    };

    this.refresh = function (szText) {
        _oGoalResultStroke.text = szText;
        _oGoalResult.text = szText;
    };

    this.getResult = function () {
        var szText = _oGoalResult.text;
        return szText;
    };

    this._init(oSprite, iX, iY, szPlayerTeam, szOpponentTeam, iPlayerTeam, iOpponentTeam);

    return this;
}