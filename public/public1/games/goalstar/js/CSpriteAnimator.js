function CSpriteAnimator() {

    var _oContainer;
    var _aSprites;
    var _iFrame;
    var _bStartAnimation;
    var _iTimeElapsed = 0;
    var _iCycle = 0;
    var _iActualCycle = 0;

    this._init = function () {

        _bStartAnimation = false;

        _iFrame = 0;

        _oContainer = new createjs.Container();

        _aSprites = new Array();

        s_oStage.addChild(_oContainer);

    };


    this.loadSprites = function (oSprite, iX, iY, iRegX, iRegY) {
        var iID = _aSprites.length;

        _aSprites[iID] = createBitmap(oSprite);
        _aSprites[iID].x = iX;
        _aSprites[iID].y = iY;
        _aSprites[iID].regX = iRegX;
        _aSprites[iID].regY = iRegY;

        if (iID !== 0)
            _aSprites[iID].visible = false;

        _oContainer.addChild(_aSprites[iID]);
    };

    this.unload = function () {
        s_oStage.removeChild(_oContainer);
    };

    this.startAnimation = function (iCycle) {
        _iFrame = 0;
        _iCycle = iCycle;
        _iActualCycle = 0;
        _bStartAnimation = true;
    };

    this.getStateAnimation = function () {
        return _bStartAnimation;
    };

    this.update = function () {
        if (_bStartAnimation) {
            _iTimeElapsed += s_iTimeElaps;
            if (_iTimeElapsed >= 30) {
                _iFrame++;
                if (_iFrame < _aSprites.length) {
                    _aSprites[_iFrame - 1].visible = false;
                    _aSprites[_iFrame].visible = true;
                } else if (_iActualCycle === _iCycle) {
                    _bStartAnimation = false;
                    _aSprites[_aSprites.length - 1].visible = false;
                    _aSprites[0].visible = true;
                } else {
                    _iActualCycle++;
                    _iFrame = 1;
                    _aSprites[_aSprites.length - 1].visible = false;
                    _aSprites[0].visible = true;
                }
            }
            _iTimeElapsed = 0;
        }
    };


    this._init();

    return this;
}

