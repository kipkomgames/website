function CHelpPanel(iXPos, iYPos, oSprite, iPlayerTeam) {
    var _pStartPosPage1To2;
    var _pStartPosPage2To1;
    var _pStartPosPageFinish;
    var _bClickedYet = false;
    var _oHelpBg;
    var _oGroup;
    var _oPage1Container;
    var _oPage2Container;
    var _oButPage1To2;
    var _oButPage2To1;
    var _oButPageFinish;

    this._init = function (iXPos, iYPos, oSprite, iPlayerTeam) {
        _oHelpBg = createBitmap(oSprite);

        _oGroup = new createjs.Container();
        _oGroup.x = iXPos;
        _oGroup.y = iYPos;

        _oGroup.addChild(_oHelpBg);

        s_oStage.addChild(_oGroup);

        this.page1();

        _oGroup.on("pressup", function () {
            var oInfo = {container: _oPage1Container, next_page: 3};
            if (_oPage1Container.visible === true) {

            } else if (_oPage2Container.visible === true) {
                oInfo.container = _oPage2Container;
            }
            if (_oButPage1To2) {
                _oButPage1To2.block(true);
            } else if (_oButPage2To1) {
                _oButPage2To1.block(true);
                _oButPageFinish.block(true);
            }
            s_oHelpPanel.onButPress(oInfo);
        }, null, true);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.page1 = function () {
        if (_oPage1Container) {
            _oPage1Container.visible = true;
            createjs.Tween.get(_oPage1Container).to({alpha: 1}, 750, createjs.Ease.cubicOut);
            return;
        }

        _oPage1Container = new createjs.Container();

        _oPage1Container.alpha = 0;

        var iSizeText = 40;

        var oCommandTextStroke;

        oCommandTextStroke = new createjs.Text(TEXT_COMMANDS, iSizeText + "px " + FONT_GAME, "#000000");
        oCommandTextStroke.textAlign = "center";
        oCommandTextStroke.lineWidth = 600;
        oCommandTextStroke.x = CANVAS_WIDTH * 0.5;
        oCommandTextStroke.y = CANVAS_HEIGHT * 0.5 - 150;
        oCommandTextStroke.outline = 5;

        _oPage1Container.addChild(oCommandTextStroke);

        var oCommandText;

        oCommandText = new createjs.Text(TEXT_COMMANDS, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oCommandText.textAlign = "center";
        oCommandText.lineWidth = 600;
        oCommandText.x = CANVAS_WIDTH * 0.5;
        oCommandText.y = CANVAS_HEIGHT * 0.5 - 150;

        _oPage1Container.addChild(oCommandText);

        var oPlayerRun;

        oPlayerRun = this._createPlayer(iPlayerTeam, "run", CANVAS_WIDTH * 0.5 - 220, CANVAS_HEIGHT * 0.5 - 20, _oPage1Container);

        var oPlayerKick;

        oPlayerKick = this._createPlayer(iPlayerTeam, "shot_help", CANVAS_WIDTH * 0.5 + 220, CANVAS_HEIGHT * 0.5 - 20, _oPage1Container);

        var oPlayerHead;

        oPlayerHead = this._createPlayer(iPlayerTeam, "head_help", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 - 20, _oPage1Container);

        if (!s_bMobile) {

            var oSpriteArrowKeys = s_oSpriteLibrary.getSprite("keyboard");

            var oArrowKeys;

            oArrowKeys = createBitmap(oSpriteArrowKeys);
            oArrowKeys.regX = oSpriteArrowKeys.width * 0.5;
            oArrowKeys.regY = oSpriteArrowKeys.height * 0.5;
            oArrowKeys.x = CANVAS_WIDTH * 0.5 - 220;
            oArrowKeys.y = CANVAS_HEIGHT * 0.5 + 130;

            _oPage1Container.addChild(oArrowKeys);

            var oSpriteXKeys = s_oSpriteLibrary.getSprite("key_kick");

            var oXKeys;

            oXKeys = createBitmap(oSpriteXKeys);
            oXKeys.regX = oSpriteXKeys.width * 0.5;
            oXKeys.regY = oSpriteXKeys.height * 0.5;
            oXKeys.x = CANVAS_WIDTH * 0.5 + 220;
            oXKeys.y = CANVAS_HEIGHT * 0.5 + 130;

            _oPage1Container.addChild(oXKeys);

            var oSpriteZKeys = s_oSpriteLibrary.getSprite("key_head");

            var oZKeys;

            oZKeys = createBitmap(oSpriteZKeys);
            oZKeys.regX = oSpriteZKeys.width * 0.5;
            oZKeys.regY = oSpriteZKeys.height * 0.5;
            oZKeys.x = CANVAS_WIDTH * 0.5;
            oZKeys.y = CANVAS_HEIGHT * 0.5 + 130;

            _oPage1Container.addChild(oZKeys);
        } else {
            var oSpriteArrow = s_oSpriteLibrary.getSprite("arrow");

            var oArrowKeyLeft;

            var fScaleArrow = 0.7;

            oArrowKeyLeft = createBitmap(oSpriteArrow);
            oArrowKeyLeft.regX = oSpriteArrow.width * 0.5;
            oArrowKeyLeft.regY = oSpriteArrow.height * 0.5;
            oArrowKeyLeft.x = CANVAS_WIDTH * 0.5 - 270;
            oArrowKeyLeft.y = CANVAS_HEIGHT * 0.5 + 110;
            oArrowKeyLeft.scaleX = -fScaleArrow;
            oArrowKeyLeft.scaleY = fScaleArrow;

            _oPage1Container.addChild(oArrowKeyLeft);

            var oArrowKeyRight;

            oArrowKeyRight = createBitmap(oSpriteArrow);
            oArrowKeyRight.regX = oSpriteArrow.width * 0.5;
            oArrowKeyRight.regY = oSpriteArrow.height * 0.5;
            oArrowKeyRight.x = CANVAS_WIDTH * 0.5 - 170;
            oArrowKeyRight.y = CANVAS_HEIGHT * 0.5 + 110;
            oArrowKeyRight.scaleX = fScaleArrow;
            oArrowKeyRight.scaleY = fScaleArrow;

            _oPage1Container.addChild(oArrowKeyRight);

            var oSpriteLeg = s_oSpriteLibrary.getSprite("but_kick");
            
            var fScale = 0.6;

            var oArrowKeyLeg;

            oArrowKeyLeg = createBitmap(oSpriteLeg);
            oArrowKeyLeg.regX = oSpriteLeg.width * 0.5;
            oArrowKeyLeg.regY = oSpriteLeg.height * 0.5;
            oArrowKeyLeg.x = CANVAS_WIDTH * 0.5 + 220;
            oArrowKeyLeg.y = CANVAS_HEIGHT * 0.5 + 110;
            oArrowKeyLeg.scaleX = fScale;
            oArrowKeyLeg.scaleY = fScale;

            _oPage1Container.addChild(oArrowKeyLeg);

            var oSpriteHead = s_oSpriteLibrary.getSprite("but_head");

            var oArrowKeyHead;

            oArrowKeyHead = createBitmap(oSpriteHead);
            oArrowKeyHead.regX = oSpriteHead.width * 0.5;
            oArrowKeyHead.regY = oSpriteHead.height * 0.5;
            oArrowKeyHead.x = CANVAS_WIDTH * 0.5;
            oArrowKeyHead.y = CANVAS_HEIGHT * 0.5 + 110;
            oArrowKeyHead.scaleX = fScale;
            oArrowKeyHead.scaleY = fScale;

            _oPage1Container.addChild(oArrowKeyHead);
        }

        createjs.Tween.get(_oPage1Container).to({alpha: 1}, 750, createjs.Ease.cubicOut);

        _pStartPosPage1To2 = {x: CANVAS_WIDTH * 0.5 + 600, y: CANVAS_HEIGHT * 0.5 + 340};

        var oInfo = {container: _oPage1Container, next_page: 2};

        _oButPage1To2 = this.createButtonSwitchPage(_pStartPosPage1To2, _oPage1Container, this.onButPress, 1, oInfo);
        _oButPage1To2.pulseAnimation();

        s_oStage.addChild(_oPage1Container);
    };

    this.page2 = function () {
        if (_oPage2Container) {
            _oPage2Container.visible = true;
            createjs.Tween.get(_oPage2Container).to({alpha: 1}, 750, createjs.Ease.cubicOut);
            return;
        }

        _oPage2Container = new createjs.Container();

        _oPage2Container.alpha = 0;

        var oScoresTextStroke;

        oScoresTextStroke = new createjs.Text(TEXT_SCORES, 40 + "px " + FONT_GAME, "#000000");
        oScoresTextStroke.textAlign = "center";
        oScoresTextStroke.x = CANVAS_WIDTH * 0.5;
        oScoresTextStroke.y = CANVAS_HEIGHT * 0.5 - 150;
        oScoresTextStroke.outline = 5;

        _oPage2Container.addChild(oScoresTextStroke);

        var oScoresText;

        oScoresText = new createjs.Text(TEXT_SCORES, 40 + "px " + FONT_GAME, TEXT_COLOR);
        oScoresText.textAlign = "center";
        oScoresText.lineWidth = 600;
        oScoresText.x = oScoresTextStroke.x;
        oScoresText.y = oScoresTextStroke.y;

        _oPage2Container.addChild(oScoresText);

        var iSizeText = 24;

        var oText1Struct;

        oText1Struct = new createjs.Text(TEXT_SCORE_PLAYER_GOAL + " +" + SCORE_PLAYER_GOAL, iSizeText + "px " + FONT_GAME, "#000000");
        oText1Struct.textAlign = "center";
        oText1Struct.lineWidth = 600;
        oText1Struct.x = CANVAS_WIDTH * 0.5;
        oText1Struct.y = CANVAS_HEIGHT * 0.5 - 60;
        oText1Struct.outline = 5;

        _oPage2Container.addChild(oText1Struct);

        var oText1;

        oText1 = new createjs.Text(oText1Struct.text, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oText1.textAlign = "center";
        oText1.lineWidth = 600;
        oText1.x = oText1Struct.x;
        oText1.y = oText1Struct.y;

        _oPage2Container.addChild(oText1);

        var oText2Struct;

        oText2Struct = new createjs.Text(TEXT_SCORE_OPPONENT_GOAL + " " + SCORE_OPPONENT_GOAL, iSizeText + "px " + FONT_GAME, "#000000");
        oText2Struct.textAlign = "center";
        oText2Struct.lineWidth = 600;
        oText2Struct.x = CANVAS_WIDTH * 0.5;
        oText2Struct.y = CANVAS_HEIGHT * 0.5;
        oText2Struct.outline = 5;

        _oPage2Container.addChild(oText2Struct);

        var oText2;

        oText2 = new createjs.Text(oText2Struct.text, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oText2.textAlign = "center";
        oText2.lineWidth = 600;
        oText2.x = oText2Struct.x;
        oText2.y = oText2Struct.y;

        _oPage2Container.addChild(oText2);

        var oText3Struct;

        oText3Struct = new createjs.Text(TEXT_SCORE_DRAW_MATCH + " +" + SCORE_TIE, iSizeText + "px " + FONT_GAME, "#000000");
        oText3Struct.textAlign = "center";
        oText3Struct.lineWidth = 600;
        oText3Struct.x = CANVAS_WIDTH * 0.5;
        oText3Struct.y = CANVAS_HEIGHT * 0.5 + 60;
        oText3Struct.outline = 5;

        _oPage2Container.addChild(oText3Struct);

        var oText3;

        oText3 = new createjs.Text(oText3Struct.text, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oText3.textAlign = "center";
        oText3.lineWidth = 600;
        oText3.x = oText3Struct.x;
        oText3.y = oText3Struct.y;

        _oPage2Container.addChild(oText3);

        var oText4Struct;

        oText4Struct = new createjs.Text(TEXT_SCOR_WON_MATCH + " +" + SCORE_WIN, iSizeText + "px " + FONT_GAME, "#000000");
        oText4Struct.textAlign = "center";
        oText4Struct.lineWidth = 600;
        oText4Struct.x = CANVAS_WIDTH * 0.5;
        oText4Struct.y = CANVAS_HEIGHT * 0.5 + 120;
        oText4Struct.outline = 5;

        _oPage2Container.addChild(oText4Struct);

        var oText4;

        oText4 = new createjs.Text(oText4Struct.text, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oText4.textAlign = "center";
        oText4.lineWidth = 600;
        oText4.x = oText4Struct.x;
        oText4.y = oText4Struct.y;

        _oPage2Container.addChild(oText4);

        createjs.Tween.get(_oPage2Container).to({alpha: 1}, 750, createjs.Ease.cubicOut);

        _pStartPosPage2To1 = {x: CANVAS_WIDTH * 0.5 - 600, y: CANVAS_HEIGHT * 0.5 + 340};

        var oInfo = {container: _oPage2Container, next_page: 1};

        _oButPage2To1 = this.createButtonSwitchPage(_pStartPosPage2To1, _oPage2Container, this.onButPress, -1, oInfo);

        _pStartPosPageFinish = {x: CANVAS_WIDTH * 0.5 + 600, y: CANVAS_HEIGHT * 0.5 + 340};

        var oInfo1 = {container: _oPage2Container, next_page: 3};

        _oButPageFinish = this.createButtonSwitchPage(_pStartPosPageFinish, _oPage2Container, this.onButPress, 1, oInfo1);
        _oButPageFinish.pulseAnimation();

        s_oStage.addChild(_oPage2Container);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.onButPress = function (oInfo) {
        if (oInfo.next_page === 1) {
            _oButPageFinish.block(true);
            _oButPage2To1.block(true);
            _oButPage1To2.block(false);
        } else if (oInfo.next_page === 2) {
            _oButPage1To2.block(true);
            if (_oButPage2To1) {
                _oButPageFinish.block(false);
                _oButPage2To1.block(false);
            }
        } else if (oInfo.next_page === 3) {
            if (_oButPage2To1) {
                _oButPageFinish.block(true);
                _oButPage2To1.block(true);
            }
            _oButPage1To2.block(true);
        }
        createjs.Tween.get(oInfo.container).to({alpha: 0}, 800).call(function () {
            oInfo.container.visible = false;
            if (oInfo.next_page === 1) {
                s_oHelpPanel.page1();
            } else if (oInfo.next_page === 2) {
                s_oHelpPanel.page2();
            } else if (oInfo.next_page === 3 && !_bClickedYet) {
                s_oHelpPanel._onExitHelp();
            }
        });
    };

    this._createPlayer = function (iID, szState, iX, iY, oContainer) {
        var oSpriteChar = s_oSpriteLibrary.getSprite("team_" + iID);
        var oPlayer;
        oPlayer = new CCharacter(iX, iY, oSpriteChar, 1, oContainer);
        oPlayer.changeState(szState);
        return oPlayer;
    };

    this.createButtonSwitchPage = function (oPos, oContainer, oArgument, fScale, oInfo) {
        var oButton;
        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        oButton = new CGfxButton(oPos.x, oPos.y, oSpriteContinue, oContainer);
        oButton.addEventListenerWithParams(ON_MOUSE_UP, oArgument, this, oInfo);
        oButton.setScaleX(fScale);

        return oButton;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButPage1To2.setPosition(_pStartPosPage1To2.x - iNewX, _pStartPosPage1To2.y - iNewY);
        if (_oButPage2To1)
            _oButPage2To1.setPosition(_pStartPosPage2To1.x + iNewX, _pStartPosPage2To1.y - iNewY);
        if (_oButPageFinish)
            _oButPageFinish.setPosition(_pStartPosPageFinish.x - iNewX, _pStartPosPageFinish.y - iNewY);
    };

    this.unload = function () {
        createjs.Tween.get(_oGroup).to({alpha: 0}, 700, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oGroup);

        });
    };

    this._onExitHelp = function () {

        _bClickedYet = true;
        s_oStage.removeChild(_oPage1Container);
        s_oStage.removeChild(_oPage2Container);
        s_oGame._onExitHelp();

    };

    s_oHelpPanel = this;

    this._init(iXPos, iYPos, oSprite, iPlayerTeam);

}

var s_oHelpPanel = null;