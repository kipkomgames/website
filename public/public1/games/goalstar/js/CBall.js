function CBall(iXPos, iYPos, oSprite) {

    var _oBall;

    this._init = function (iXPos, iYPos, oSprite) {

        _oBall = createBitmap(oSprite);
        _oBall.x = iXPos;
        _oBall.y = iYPos;

        _oBall.regX = oSprite.width * 0.5;
        _oBall.regY = oSprite.height * 0.5;

        s_oStage.addChild(_oBall);

    };

    this.unload = function () {
        s_oStage.removeChild(_oBall);
    };

    this.setVisible = function (bVisible) {
        _oBall.visible = bVisible;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oBall.x = iXPos;
        _oBall.y = iYPos;
    };

    this.setAngle = function (iAngle) {
        _oBall.rotation = iAngle;
    };

    this.getX = function () {
        return _oBall.x;
    };

    this.getY = function () {
        return _oBall.y;
    };

    this.scale = function (fValue) {
        _oBall.scaleX = fValue;
        _oBall.scaleY = fValue;
    };

    this.getScale = function () {
        return _oBall.scaleX;
    };

    this.childIndex = function (iValue) {
        s_oStage.setChildIndex(_oBall, iValue);
    };

    this._init(iXPos, iYPos, oSprite);

    return this;
}
