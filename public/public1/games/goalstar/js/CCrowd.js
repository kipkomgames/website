function CCrowd(oSprite, iX, iY) {

    var _oCrowdOff;
    var _oContainer;

    this._init = function (oSprite, iX, iY) {

        _oCrowdOff = createBitmap(oSprite);
        _oCrowdOff.x = iX;
        _oCrowdOff.y = iY;
        _oCrowdOff.regX = 0;
        _oCrowdOff.regY = oSprite.height * 0.5;

        _oContainer = new createjs.Container();

        _oContainer.addChild(_oCrowdOff);

        s_oStage.addChild(_oContainer);

    };

    this.getPosition = function () {
        return {x: _oCrowdOff.x, y: _oCrowdOff.y};
    };

    this.crowOn = function (oSprite, iX, iY, iTimeTo) {
        var oCrowOn;

        oCrowOn = createBitmap(oSprite);
        oCrowOn.x = iX;
        oCrowOn.y = iY;
        oCrowOn.regX = 0;
        oCrowOn.regY = oSprite.height * 0.5;

        _oContainer.addChild(oCrowOn);

        var iToY = iY + TWEEN_CROWD_ON_Y;

        createjs.Tween.get(oCrowOn).to({y: iToY}, iTimeTo, createjs.Ease.quartOut).call(function () {
            createjs.Tween.get(oCrowOn).to({y: iY}, iTimeTo - 100, createjs.Ease.quartIn).call(function () {
                s_oStage.removeChild(oCrowOn);
            });
        });
    };

    this.unload = function () {
        s_oStage.removeChild(_oContainer);
    };

    this._init(oSprite, iX, iY);

    return this;
}

