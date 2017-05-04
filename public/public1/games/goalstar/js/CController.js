function CController() {

    var _pStartPosContainerRight;
    var _pStartPosContainerLeft;
    var _oContainerRightSide;
    var _oContainerLeftSide;
    var _oControlLeft;
    var _oControlRight;
    var _oControlHeadShot;
    var _oControlLegShot;

    this._init = function () {
        _pStartPosContainerRight = {x: CANVAS_WIDTH * 0.5 - 450, y: CANVAS_HEIGHT * 0.5 + 320};
        _pStartPosContainerLeft = {x: CANVAS_WIDTH * 0.5 + 450, y: CANVAS_HEIGHT * 0.5 + 320};

        _oContainerRightSide = new createjs.Container();
        _oContainerRightSide.x = _pStartPosContainerRight.x;
        _oContainerRightSide.y = _pStartPosContainerRight.y;

        _oContainerLeftSide = new createjs.Container();
        _oContainerLeftSide.x = _pStartPosContainerLeft.x;
        _oContainerLeftSide.y = _pStartPosContainerLeft.y;

        var oSpriteArrow = s_oSpriteLibrary.getSprite("arrow");

        _oControlLeft = new CGfxButton(-90, 0, oSpriteArrow, _oContainerRightSide);
        _oControlLeft.addEventListener(ON_MOUSE_DOWN, s_oGame.moveLeft, this);
        _oControlLeft.addEventListener(ON_MOUSE_UP, s_oGame.onCommandLeftUp, this);
        _oControlLeft.setScaleX(-1);

        _oControlRight = new CGfxButton(90, 0, oSpriteArrow, _oContainerRightSide);
        _oControlRight.addEventListener(ON_MOUSE_DOWN, s_oGame.moveRight, this);
        _oControlRight.addEventListener(ON_MOUSE_UP, s_oGame.onCommandRightUp, this);

        var oSpriteHead = s_oSpriteLibrary.getSprite("but_head");

        _oControlHeadShot = new CGfxButton(-90, 0, oSpriteHead, _oContainerLeftSide);
        _oControlHeadShot.addEventListener(ON_MOUSE_DOWN, s_oGame.headShot, this);
        _oControlHeadShot.addEventListener(ON_MOUSE_UP, s_oGame.onCommandActionUp, this);
        
        var oSpriteLeg= s_oSpriteLibrary.getSprite("but_kick");

        _oControlLegShot = new CGfxButton(90, 0, oSpriteLeg, _oContainerLeftSide);
        _oControlLegShot.addEventListener(ON_MOUSE_DOWN, s_oGame.shot, this);
        _oControlLegShot.addEventListener(ON_MOUSE_UP, s_oGame.onCommandActionUp, this);

        s_oStage.addChild(_oContainerRightSide, _oContainerLeftSide);

    };

    this.block = function (bVal) {
        _oControlLeft.block(bVal);
        _oControlRight.block(bVal);
        _oControlHeadShot.block(bVal);
        _oControlLegShot.block(bVal);
    };

    this.getStartPositionRightSide = function () {
        return _pStartPosContainerRight;
    };

    this.getStartPositionLeftSide = function () {
        return _pStartPosContainerLeft;
    };

    this.setPositionRightSide = function (iX, iY) {
        _oContainerRightSide.x = iX;
        _oContainerRightSide.y = iY;
    };

    this.setPositionLeftSide = function (iX, iY) {
        _oContainerLeftSide.x = iX;
        _oContainerLeftSide.y = iY;
    };

    this.unload = function () {
        _oControlHeadShot.unload();
        _oControlHeadShot = null;

        _oControlLeft.unload();
        _oControlLeft = null;

        _oControlRight.unload();
        _oControlRight = null;

        _oControlLegShot.unload();
        _oControlLegShot = null;

        s_oStage.removeChild(_oContainerRightSide, _oContainerLeftSide);
    };

    this._init();

    return this;
}