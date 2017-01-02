function CGoal() {

    var _aAllGoal;
    var _oGoalPlayerBack;
    var _oGoalEnemyBack;
    var _oGoalPlayerFront;
    var _oGoalEnemyFront;

    this._init = function () {
        _aAllGoal = new Array();

        var oPlayerGoalProperty = OBJECT[0][0];
        var oEnemyGoalProperty = OBJECT[1][0];

        var oSpriteGoalBack = s_oSpriteLibrary.getSprite("goal_back");

        _oGoalPlayerBack = createBitmap(oSpriteGoalBack);
        _oGoalPlayerBack.x = oPlayerGoalProperty.x + oPlayerGoalProperty.offset_back.x;
        _oGoalPlayerBack.y = oPlayerGoalProperty.y + oPlayerGoalProperty.offset_back.y;
        _oGoalPlayerBack.regX = oSpriteGoalBack.width * 0.5;
        _oGoalPlayerBack.regy = oSpriteGoalBack.heigth * 0.5;

        s_oStage.addChild(_oGoalPlayerBack);

        _aAllGoal[0] = _oGoalPlayerBack;

        _oGoalEnemyBack = createBitmap(oSpriteGoalBack);
        _oGoalEnemyBack.x = oEnemyGoalProperty.x + oEnemyGoalProperty.offset_back.x;
        _oGoalEnemyBack.y = oEnemyGoalProperty.y + oEnemyGoalProperty.offset_back.y;
        _oGoalEnemyBack.regX = oSpriteGoalBack.width * 0.5;
        _oGoalEnemyBack.regy = oSpriteGoalBack.heigth * 0.5;
        _oGoalEnemyBack.scaleX = -1;

        s_oStage.addChild(_oGoalEnemyBack);
        _aAllGoal[1] = _oGoalEnemyBack;
    };

    this.createGoalFront = function () {

        var oPlayerGoalProperty = OBJECT[0][0];
        var oEnemyGoalProperty = OBJECT[1][0];

        var oSpriteGoalFront = s_oSpriteLibrary.getSprite("goal_front");

        _oGoalPlayerFront = createBitmap(oSpriteGoalFront);
        _oGoalPlayerFront.x = oPlayerGoalProperty.x + oPlayerGoalProperty.offset_front.x;
        _oGoalPlayerFront.y = oPlayerGoalProperty.y + oPlayerGoalProperty.offset_front.y;
        _oGoalPlayerFront.regX = oSpriteGoalFront.width * 0.5;
        _oGoalPlayerFront.regy = oSpriteGoalFront.heigth * 0.5;

        s_oStage.addChild(_oGoalPlayerFront);

        _aAllGoal[2] = _oGoalPlayerFront;

        _oGoalEnemyFront = createBitmap(oSpriteGoalFront);
        _oGoalEnemyFront.x = oEnemyGoalProperty.x + oEnemyGoalProperty.offset_front.x;
        _oGoalEnemyFront.y = oEnemyGoalProperty.y + oEnemyGoalProperty.offset_front.y;
        _oGoalEnemyFront.regX = oSpriteGoalFront.width * 0.5;
        _oGoalEnemyFront.regy = oSpriteGoalFront.heigth * 0.5;
        _oGoalEnemyFront.scaleX = -1;

        s_oStage.addChild(_oGoalEnemyFront);

        _aAllGoal[3] = _oGoalEnemyFront;
    };


    this.unload = function () {
        for (var i = 0; i < _aAllGoal.length; i++) {
            s_oStage.removeChild(_aAllGoal[i]);
        }
    };


    this._init();

    return this;
}
