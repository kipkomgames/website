function CCongratulations(aResults, iScore) {
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _oBg;
    var _oButMenu;
    var _oTitleStroke;
    var _oTitle;
    var _oScoreStroke;
    var _oScore;
    var _oFade;
    var _oResultsContainer;
    var _oAudioToggle;

    this._init = function (aResults, iScore) {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_congratulations'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_home');
        _pStartPosPlay = {x: CANVAS_WIDTH / 2, y: 595};
        _oButMenu = new CGfxButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, s_oStage);
        _oButMenu.addEventListener(ON_MOUSE_UP, this._onButMenuRelease, this);
        _oButMenu.pulseAnimation();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _oTitleStroke = new createjs.Text(TEXT_CONGRATULATIONS, "36px " + FONT_GAME, "#000000");
        _oTitleStroke.x = CANVAS_WIDTH * 0.5;
        _oTitleStroke.y = CANVAS_HEIGHT * 0.5 - 270;
        _oTitleStroke.textAlign = "center";
        _oTitleStroke.outline = 5;
        s_oStage.addChild(_oTitleStroke);

        _oTitle = new createjs.Text(TEXT_CONGRATULATIONS, "36px " + FONT_GAME, TEXT_COLOR);
        _oTitle.x = CANVAS_WIDTH * 0.5;
        _oTitle.y = CANVAS_HEIGHT * 0.5 - 270;
        _oTitle.textAlign = "center";
        s_oStage.addChild(_oTitle);

        var iOffsetY = this.createResultText(aResults);

        _oScoreStroke = new createjs.Text(TEXT_TOTAL_SCORE + ": " + iScore, "50px " + FONT_GAME, "#000000");
        _oScoreStroke.x = CANVAS_WIDTH * 0.5;
        _oScoreStroke.y = CANVAS_HEIGHT * 0.5 + iOffsetY;
        _oScoreStroke.textAlign = "center";
        _oScoreStroke.outline = 5;
        s_oStage.addChild(_oScoreStroke);

        _oScore = new createjs.Text(TEXT_TOTAL_SCORE + ": " + iScore, "50px " + FONT_GAME, TEXT_COLOR);
        _oScore.x = CANVAS_WIDTH * 0.5;
        _oScore.y = CANVAS_HEIGHT * 0.5 + iOffsetY;
        _oScore.textAlign = "center";
        s_oStage.addChild(_oScore);

        var oSpriteCharacterPos = s_oSpriteLibrary.getSprite("character_pose_" + aResults[0].player_team);
        var oData = {
            images: [oSpriteCharacterPos],
            // width, height & registration point of each sprite
            frames: {width: oSpriteCharacterPos.width / 3, height: oSpriteCharacterPos.height, regX: (oSpriteCharacterPos.width / 2) / 3, regY: (oSpriteCharacterPos.height / 2)},
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oCharacter = createSprite(oSpriteSheet, "champion", (oSpriteCharacterPos.width / 2) / 3, (oSpriteCharacterPos.height / 2), oSpriteCharacterPos.width / 3, oSpriteCharacterPos.height);
        var fScale = 0.8;
        oCharacter.scaleX = fScale;
        oCharacter.scaleY = fScale;

        oCharacter.x = CANVAS_WIDTH * 0.5 - 440;
        oCharacter.y = CANVAS_HEIGHT * 0.5 + 125;

        s_oStage.addChild(oCharacter);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);


        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oFade.visible = false;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.createResultText = function (aResults) {
        _oResultsContainer = new createjs.Container();

        var iOffsetY = -200;
        var iTime = 200;
        var bOdd = false;
        var iNumOdd = 0;

        if ((TOT_TEAM - 1) % 2 === 1) {
            bOdd = true;
            iNumOdd = TOT_TEAM - 2;
        }

        for (var i = 0; i < aResults.length; i++, iTime += 150) {
            var oContainer = new createjs.Container();
            oContainer.alpha = 0;

            var szResult = aResults[i].result;
            var iMatchNumber = i + 1;

            var oGoalResultStroke;

            oGoalResultStroke = new createjs.Text(szResult, "28px " + FONT_GAME, "#000000");
            oGoalResultStroke.x = 0;
            oGoalResultStroke.y = 3;
            oGoalResultStroke.textAlign = "center";
            oGoalResultStroke.outline = 5;

            oContainer.addChild(oGoalResultStroke);

            var oGoalResult;

            oGoalResult = new createjs.Text(szResult, "28px " + FONT_GAME, TEXT_COLOR);
            oGoalResult.x = 0;
            oGoalResult.y = 3;
            oGoalResult.textAlign = "center";

            oContainer.addChild(oGoalResult);

            var oMatchNumberStroke;

            oMatchNumberStroke = new createjs.Text(iMatchNumber + ".", "28px " + FONT_GAME, "#000000");
            oMatchNumberStroke.x = -200;
            oMatchNumberStroke.y = 3;
            oMatchNumberStroke.textAlign = "center";
            oMatchNumberStroke.outline = 5;

            oContainer.addChild(oMatchNumberStroke);

            var oMatchNumber;

            oMatchNumber = new createjs.Text(iMatchNumber + ".", "28px " + FONT_GAME, TEXT_COLOR);
            oMatchNumber.x = -200;
            oMatchNumber.y = 3;
            oMatchNumber.textAlign = "center";

            oContainer.addChild(oMatchNumber);

            var oSpriteFlagPlayer = s_oSpriteLibrary.getSprite("flag_" + aResults[i].player_team);

            var oPlayerFlag;

            oPlayerFlag = createBitmap(oSpriteFlagPlayer);
            oPlayerFlag.x = -150;
            oPlayerFlag.y = 5;
            oPlayerFlag.regX = oSpriteFlagPlayer.width * 0.5;
            oPlayerFlag.regY = 0;
            oPlayerFlag.scaleX = 0.3;
            oPlayerFlag.scaleY = 0.3;

            oContainer.addChild(oPlayerFlag);

            var oSpriteFlagOpponent = s_oSpriteLibrary.getSprite("flag_" + aResults[i].opponent_team);

            var oOpponentFlag;

            oOpponentFlag = createBitmap(oSpriteFlagOpponent);
            oOpponentFlag.x = 150;
            oOpponentFlag.y = 5;
            oOpponentFlag.regX = oSpriteFlagPlayer.width * 0.5;
            oOpponentFlag.regY = 0;
            oOpponentFlag.scaleX = 0.3;
            oOpponentFlag.scaleY = 0.3;

            oContainer.addChild(oOpponentFlag);

            oContainer.y = CANVAS_HEIGHT * 0.5 + iOffsetY;
            var iX;
            if (i % 2 === 0) {
                if (iNumOdd === i && bOdd) {
                    iX = CANVAS_WIDTH * 0.5;
                } else {
                    iX = CANVAS_WIDTH * 0.5 - 250;
                }
                oContainer.x = -100;
            } else {
                oContainer.x = CANVAS_WIDTH + 100;
                iX = CANVAS_WIDTH * 0.5 + 250;
                iOffsetY += 40;
            }
            createjs.Tween.get(oContainer).wait(iTime).to({x: iX, alpha: 1}, 500, createjs.Ease.cubicIn);

            _oResultsContainer.addChild(oContainer);
        }

        s_oStage.addChild(_oResultsContainer);

        return iOffsetY + 60;

    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
    };

    this.unload = function () {
        _oButMenu.unload();
        _oButMenu = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();

        s_oCongratulations = null;
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButMenuRelease = function () {
        this.unload();

        s_oMain.gotoMenu();
    };

    s_oCongratulations = this;

    this._init(aResults, iScore);
}

var s_oCongratulations = null;