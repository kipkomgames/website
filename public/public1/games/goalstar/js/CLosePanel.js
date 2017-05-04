function CLosePanel(oSpriteBg) {

    var _oBg;
    var _oResultTextStroke;
    var _oResultText;
    var _oTitleTextStoke;
    var _oTitleText;
    var _oGroup;
    var _oButMenu;
    var _oFlagContainer;
    var _oButRestart;

    this._init = function (oSpriteBg) {

        _oGroup = new createjs.Container();
        _oGroup.alpha = 1;
        _oGroup.visible = false;

        _oGroup.y = CANVAS_HEIGHT;

        _oBg = createBitmap(oSpriteBg);
        _oGroup.addChild(_oBg);

        _oResultTextStroke = new createjs.Text("", "32px " + FONT_GAME, "#000000");
        _oResultTextStroke.x = CANVAS_WIDTH / 2;
        _oResultTextStroke.y = (CANVAS_HEIGHT / 2) - 150;
        _oResultTextStroke.textAlign = "center";
        _oResultTextStroke.outline = 5;

        _oGroup.addChild(_oResultTextStroke);

        _oResultText = new createjs.Text("", "32px " + FONT_GAME, TEXT_COLOR);
        _oResultText.x = CANVAS_WIDTH / 2;
        _oResultText.y = (CANVAS_HEIGHT / 2) - 150;
        _oResultText.textAlign = "center";

        _oGroup.addChild(_oResultText);

        _oTitleTextStoke = new createjs.Text("", "50px " + FONT_GAME, "#000000");
        _oTitleTextStoke.x = CANVAS_WIDTH / 2;
        _oTitleTextStoke.y = 174;
        _oTitleTextStoke.textAlign = "center";
        _oTitleTextStoke.outline = 5;

        _oGroup.addChild(_oTitleTextStoke);

        _oTitleText = new createjs.Text("", "50px " + FONT_GAME, TEXT_COLOR);
        _oTitleText.x = CANVAS_WIDTH / 2;
        _oTitleText.y = 174;
        _oTitleText.textAlign = "center";

        _oGroup.addChild(_oTitleText);

        _oFlagContainer = new createjs.Container();

        _oGroup.addChild(_oFlagContainer);

        s_oStage.addChild(_oGroup);

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_home");
        _oButMenu = new CGfxButton(CANVAS_WIDTH * 0.5 - 200, CANVAS_HEIGHT * 0.5 + 175, oSpriteButHome, _oGroup);
        _oButMenu.addEventListener(ON_MOUSE_DOWN, this._onExit, this);

        var oSpriteButRestart = s_oSpriteLibrary.getSprite("but_restart");
        _oButRestart = new CGfxButton(CANVAS_WIDTH * 0.5 + 200, CANVAS_HEIGHT * 0.5 + 175, oSpriteButRestart, _oGroup);
        _oButRestart.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);
        _oButRestart.pulseAnimation();

    };

    this.unload = function () {
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oGroup);
            _oButMenu.unload();
            _oButMenu = null;

            _oButRestart.unload();
            _oButRestart = null;
        });
    };

    this.show = function (iGoalPlayer, iGoalOpponent, iPlayerTeam, iOpponentTeam) {

        var szPlayerTeam = eval("TEXT_TEAM_CODE_" + iPlayerTeam);
        var szOpponentTeam = eval("TEXT_TEAM_CODE_" + iOpponentTeam);

        _oResultText.text = szPlayerTeam + " " + iGoalPlayer + " - " + iGoalOpponent + " " + szOpponentTeam;
        _oResultTextStroke.text = szPlayerTeam + " " + iGoalPlayer + " - " + iGoalOpponent + " " + szOpponentTeam;

        _oTitleTextStoke.text = TEXT_LOSE;
        _oTitleText.text = TEXT_LOSE;

        var oSpriteFlagPlayer = s_oSpriteLibrary.getSprite("flag_" + iPlayerTeam);

        var oFlagPlayer = createBitmap(oSpriteFlagPlayer);

        oFlagPlayer.x = _oResultText.x - 180;
        oFlagPlayer.y = _oResultText.y + 15;
        oFlagPlayer.regX = oSpriteFlagPlayer.width * 0.5;
        oFlagPlayer.regY = oSpriteFlagPlayer.height * 0.5;
        oFlagPlayer.scaleX = 0.4;
        oFlagPlayer.scaleY = 0.4;

        _oFlagContainer.addChild(oFlagPlayer);

        var oSpriteFlagOpponent = s_oSpriteLibrary.getSprite("flag_" + iOpponentTeam);

        var oFlagOpponent = createBitmap(oSpriteFlagOpponent);

        oFlagOpponent.x = _oResultText.x + 180;
        oFlagOpponent.y = _oResultText.y + 15;
        oFlagOpponent.regX = oSpriteFlagOpponent.width * 0.5;
        oFlagOpponent.regY = oSpriteFlagOpponent.height * 0.5;
        oFlagOpponent.scaleX = 0.4;
        oFlagOpponent.scaleY = 0.4;

        _oFlagContainer.addChild(oFlagOpponent);

        var oSpriteCharacterPos = s_oSpriteLibrary.getSprite("character_pose_" + iPlayerTeam);
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
        var oCharacter = createSprite(oSpriteSheet, "angry", (oSpriteCharacterPos.width / 2) / 3, (oSpriteCharacterPos.height / 2), oSpriteCharacterPos.width / 3, oSpriteCharacterPos.height);

        var oSpriteCharacterPos = s_oSpriteLibrary.getSprite("character_pose_" + iOpponentTeam);

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
        var oOpponent = createSprite(oSpriteSheet, "win", (oSpriteCharacterPos.width / 2) / 3, (oSpriteCharacterPos.height / 2), oSpriteCharacterPos.width / 3, oSpriteCharacterPos.height);

        oOpponent.x = CANVAS_WIDTH * 0.5 + 440;
        oOpponent.y = CANVAS_HEIGHT * 0.5 + 91;
        oOpponent.scaleX = -1;

        _oGroup.addChild(oOpponent);

        oCharacter.x = CANVAS_WIDTH * 0.5 - 440;
        oCharacter.y = CANVAS_HEIGHT * 0.5 + 91;

        _oGroup.addChild(oCharacter);

        _oGroup.visible = true;

        createjs.Tween.get(_oGroup).to({y: 0}, 1250, createjs.Ease.elasticOut).call(function () {
            if (s_oAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_oAdsLevel = 1;
            } else {
                s_oAdsLevel++;
            }
        });
    };

    this._onRestart = function () {
        this.unload();

        s_oGame.restartLevel();
    };

    this._onExit = function () {
        this.unload();

        s_oGame.onExit();
    };

    this._init(oSpriteBg);

    return this;
}