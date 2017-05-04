function CWinPanel(oSpriteBg, bEnd) {

    var _oBg;
    var _oResultTextStroke;
    var _oResultText;
    var _oTitleTextStoke;
    var _oTitleText;
    var _oScoreTextGoalPlayerStroke;
    var _oScoreTextGoalPlayer;
    var _oScoreTextGoalOpponentStroke;
    var _oScoreTextGoalOpponent;
    var _oScoreMatchTextStroke;
    var _oScoreMatchText;
    var _oNewScoreTextStroke;
    var _oNewScoreText;
    var _oNewScoreText;
    var _oTitleText;
    var _oGroup;
    var _oButMenu;
    var _oButContinue;
    var _oFlagContainer;

    this._init = function (oSpriteBg, bEnd) {
        var iSizeFontSecondaryText = 24;

        _oGroup = new createjs.Container();
        _oGroup.alpha = 1;
        _oGroup.visible = false;
        _oGroup.y = -CANVAS_HEIGHT;

        _oBg = createBitmap(oSpriteBg);
        _oGroup.addChild(_oBg);

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

        _oScoreTextGoalPlayerStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, "#000000");
        _oScoreTextGoalPlayerStroke.x = CANVAS_WIDTH / 2;
        _oScoreTextGoalPlayerStroke.y = (CANVAS_HEIGHT / 2) - 70;
        _oScoreTextGoalPlayerStroke.textAlign = "center";
        _oScoreTextGoalPlayerStroke.outline = 5;

        _oGroup.addChild(_oScoreTextGoalPlayerStroke);

        _oScoreTextGoalPlayer = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oScoreTextGoalPlayer.x = CANVAS_WIDTH / 2;
        _oScoreTextGoalPlayer.y = (CANVAS_HEIGHT / 2) - 70;
        _oScoreTextGoalPlayer.textAlign = "center";

        _oGroup.addChild(_oScoreTextGoalPlayer);

        _oScoreTextGoalOpponentStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, "#000000");
        _oScoreTextGoalOpponentStroke.x = CANVAS_WIDTH / 2;
        _oScoreTextGoalOpponentStroke.y = (CANVAS_HEIGHT / 2) - 10;
        _oScoreTextGoalOpponentStroke.textAlign = "center";
        _oScoreTextGoalOpponentStroke.outline = 5;

        _oGroup.addChild(_oScoreTextGoalOpponentStroke);

        _oScoreTextGoalOpponent = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oScoreTextGoalOpponent.x = CANVAS_WIDTH / 2;
        _oScoreTextGoalOpponent.y = (CANVAS_HEIGHT / 2) - 10;
        _oScoreTextGoalOpponent.textAlign = "center";

        _oGroup.addChild(_oScoreTextGoalOpponent);


        _oScoreMatchTextStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, "#000000");
        _oScoreMatchTextStroke.x = CANVAS_WIDTH / 2;
        _oScoreMatchTextStroke.y = (CANVAS_HEIGHT / 2) + 50;
        _oScoreMatchTextStroke.textAlign = "center";
        _oScoreMatchTextStroke.outline = 5;

        _oGroup.addChild(_oScoreMatchTextStroke);

        _oScoreMatchText = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oScoreMatchText.x = CANVAS_WIDTH / 2;
        _oScoreMatchText.y = (CANVAS_HEIGHT / 2) + 50;
        _oScoreMatchText.textAlign = "center";

        _oGroup.addChild(_oScoreMatchText);

        _oNewScoreTextStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, "#000000");
        _oNewScoreTextStroke.x = CANVAS_WIDTH / 2;
        _oNewScoreTextStroke.y = (CANVAS_HEIGHT / 2) + 110;
        _oNewScoreTextStroke.textAlign = "center";
        _oNewScoreTextStroke.outline = 5;

        _oGroup.addChild(_oNewScoreTextStroke);

        _oNewScoreText = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oNewScoreText.x = CANVAS_WIDTH / 2;
        _oNewScoreText.y = (CANVAS_HEIGHT / 2) + 110;
        _oNewScoreText.textAlign = "center";

        _oGroup.addChild(_oNewScoreText);

        var oSpriteButContinue = s_oSpriteLibrary.getSprite("but_continue_big");
        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5 + 250, CANVAS_HEIGHT * 0.5 + 175, oSpriteButContinue, _oGroup);
        _oButContinue.pulseAnimation();

        if (bEnd === false) {
            var oSpriteButHome = s_oSpriteLibrary.getSprite("but_home");
            _oButMenu = new CGfxButton(CANVAS_WIDTH * 0.5 - 250, CANVAS_HEIGHT * 0.5 + 175, oSpriteButHome, _oGroup);
            _oButMenu.addEventListener(ON_MOUSE_DOWN, this._onExit, this);

            _oButContinue.addEventListener(ON_MOUSE_DOWN, this._onContinue, this);
        } else {
            _oButContinue.addEventListener(ON_MOUSE_DOWN, this._onEnd, this);
        }

        _oFlagContainer = new createjs.Container();

        _oGroup.addChild(_oFlagContainer);

        s_oStage.addChild(_oGroup);

    };

    this.unload = function () {


        s_oStage.removeChild(_oGroup);
        if (_oButMenu) {
            _oButMenu.unload();
            _oButMenu = null;
        }

        if (_oButContinue) {
            _oButContinue.unload();
            _oButContinue = null;
        }

    };

    this.show = function (iGoalPlayer, iGoalOpponent, iPlayerTeam, iOpponentTeam, oInfoScore) {

        var szPlayerTeam = eval("TEXT_TEAM_CODE_" + iPlayerTeam);
        var szOpponentTeam = eval("TEXT_TEAM_CODE_" + iOpponentTeam);

        _oResultText.text = szPlayerTeam + " " + iGoalPlayer + " - " + iGoalOpponent + " " + szOpponentTeam;
        _oResultTextStroke.text = szPlayerTeam + " " + iGoalPlayer + " - " + iGoalOpponent + " " + szOpponentTeam;

        _oTitleTextStoke.text = TEXT_WIN;
        _oTitleText.text = TEXT_WIN;

        _oScoreTextGoalPlayerStroke.text = TEXT_SCORE_GOAL_PLAYER + " " + oInfoScore.player_goal_score;
        _oScoreTextGoalPlayer.text = TEXT_SCORE_GOAL_PLAYER + " " + oInfoScore.player_goal_score;

        _oScoreTextGoalOpponentStroke.text = TEXT_SCORE_GOAL_OPPONENT + " " + oInfoScore.opponent_goal_score;
        _oScoreTextGoalOpponent.text = TEXT_SCORE_GOAL_OPPONENT + " " + oInfoScore.opponent_goal_score;

        _oScoreMatchTextStroke.text = TEXT_MACTH_SCORE + ": " + oInfoScore.score_match;
        _oScoreMatchText.text = TEXT_MACTH_SCORE + ": " + oInfoScore.score_match;

        _oNewScoreTextStroke.text = TEXT_TOTAL_SCORE + ": " + oInfoScore.new_score;
        _oNewScoreText.text = TEXT_TOTAL_SCORE + ": " + oInfoScore.new_score;

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
        var oCharacter = createSprite(oSpriteSheet, "win", (oSpriteCharacterPos.width / 2) / 3, (oSpriteCharacterPos.height / 2), oSpriteCharacterPos.width / 3, oSpriteCharacterPos.height);

        oCharacter.x = CANVAS_WIDTH * 0.5 - 440;
        oCharacter.y = CANVAS_HEIGHT * 0.5 + 91;

        _oGroup.addChild(oCharacter);

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
        var oOpponent = createSprite(oSpriteSheet, "angry", (oSpriteCharacterPos.width / 2) / 3, (oSpriteCharacterPos.height / 2), oSpriteCharacterPos.width / 3, oSpriteCharacterPos.height);

        oOpponent.x = CANVAS_WIDTH * 0.5 + 440;
        oOpponent.y = CANVAS_HEIGHT * 0.5 + 91;
        oOpponent.scaleX = -1;

        _oGroup.addChild(oOpponent);

        _oGroup.visible = true;

        createjs.Tween.get(_oGroup).to({y: 0}, 1250, createjs.Ease.elasticOut).call(function () {
            if (s_oAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_oAdsLevel = 1;
            } else {
                s_oAdsLevel++;
            }
        });

        $(s_oMain).trigger("save_score", oInfoScore.new_score);
        $(s_oMain).trigger("share_event", oInfoScore.new_score);
    };

    this._onContinue = function () {
        var oParent = this;
        createjs.Tween.get(_oGroup).to({y: CANVAS_HEIGHT}, 750, createjs.Ease.quartIn).call(function () {
            oParent.unload();
        });

        _oButContinue.block(true);
        _oButMenu.block(true);
        s_oGame.onContinue(s_oStage.getChildIndex(_oGroup));
    };

    this._onEnd = function () {
        _oButContinue.block(true);
        this.unload();
        s_oGame._onEnd();
    };

    this._onExit = function () {

        this.unload();

        s_oGame.onExit();
    };

    this._init(oSpriteBg, bEnd);

    return this;
}