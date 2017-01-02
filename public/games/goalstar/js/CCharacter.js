function CCharacter(iXPos, iYPos, oSprite, iSpeed, oParentContainer) {

    var _oCharacter;
    var _oInfoData = {};
    var _iOffsetWallRight;
    var _iOffsetWallLeft;
    var _iOffsetCharacterWidth;
    var _iOffsetCharacterHeight;
    var _iSpeed;
    var _iSpeedRate;
    var _iSpeedDown;
    var _iDir = 0;
    var _oLeg;
    var _oHead;
    var _oHeel;
    var _oParentContainer;
    var _bLegShoot = false;
    var _bHeadShoot = false;
    var _bHeelShoot = false;

    this._init = function (iXPos, iYPos, oSprite, iSpeed, oParentContainer) {

        _oParentContainer = oParentContainer;

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 8, height: oSprite.height / 7, regX: (oSprite.width / 2) / 8, regY: (oSprite.height / 2) / 7},
            animations: {
                idle: [0, 11, "idle", 0.5],
                run: [12, 22],
                shot: [23, 28],
                head_shot_run: [29, 37],
                head_shot_idle: [38, 48],
                heel_shot: [49, 55],
                head_help: [38, 48, "head_help"],
                shot_help: [23, 28, "shot_help"],
                reverse: {
                    frames: [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12]
                }
            }
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oCharacter = createSprite(oSpriteSheet, "idle", (oSprite.width / 2) / 8, (oSprite.height / 2) / 7, oSprite.width / 8, oSprite.height / 7);

        _oCharacter.x = iXPos;
        _oCharacter.y = iYPos;

        _iOffsetCharacterHeight = oSprite.height / 7;
        _iOffsetCharacterWidth = oSprite.width / 8;

        _iSpeedDown = 0;

        var iEdgeRightWidth = -(_iOffsetCharacterWidth);
        var iEdgeLeftWidth = _iOffsetCharacterWidth;
        _iOffsetWallRight = CANVAS_WIDTH + iEdgeRightWidth;
        _iOffsetWallLeft = iEdgeLeftWidth;

        _iSpeedRate = iSpeed;

        _iSpeed = CHARACTER_SPEED * _iSpeedRate;

        _oParentContainer.addChild(_oCharacter);

    };

    this.getX = function () {
        return _oCharacter.x;
    };

    this.getY = function () {
        return _oCharacter.y;
    };

    this.setPosition = function (iXPos, iYPos) {
        if (iXPos === null) {

        } else {
            _oCharacter.x = iXPos;
        }
        if (iYPos === null) {

        } else {
            _oCharacter.y = iYPos;
        }
    };

    this.setDirection = function (iVal) {
        _iDir = iVal;
    };

    this.getDirection = function () {
        return _iDir;
    };

    this.rotate = function (iValue) {
        _oCharacter.scaleX = iValue;
    };

    this.setVisible = function (bVal) {
        _oCharacter.visible = bVal;
    };

    this.changeState = function (szState) {

        _oCharacter.gotoAndPlay(szState);

        if (szState === "shot" || szState === "head_shot_run" || szState === "head_shot_idle" || szState === "heel_shot") {
            this._onFinishAnimation();
        }
    };

    this.stopAnimation = function () {
        _oCharacter.stop();
    };

    this.playAnimation = function () {
        _oCharacter.play();
    };

    this._onFinishAnimation = function () {
        _oCharacter.on("animationend", function () {
            if (_iDir === 0) {
                _oCharacter.gotoAndPlay("idle");
            } else if (_iDir === -1) {
                _oCharacter.gotoAndPlay("reverse");
            } else {
                _oCharacter.gotoAndPlay("run");
            }
            _oCharacter.removeAllEventListeners();
        });
    };

    this.setInfoData = function (szKey, oValue) {
        _oInfoData[szKey] = oValue;
    };

    this.getInfoData = function (szKey) {
        return _oInfoData[szKey];
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oCharacter);
        s_oCharacter = null;
    };

    this.createPlayerHead = function (oPhysicsObject) {
        var oPlayerPos;

        oPlayerPos = {x: _oCharacter.x + OFFSET_HEAD_POS.x, y: _oCharacter.y + OFFSET_HEAD_POS.y};

        _oHead = oPhysicsObject.addHead(oPlayerPos, PLAYER_HEAD);

        _bHeadShoot = true;
    };

    this.createHeel = function (oPhysicsObject) {
        var oPlayerPos;

        oPlayerPos = {x: _oCharacter.x + OFFSET_HEEL_POS.x, y: _oCharacter.y + OFFSET_HEEL_POS.y};

        _oHeel = oPhysicsObject.addLeg(oPlayerPos, PLAYER_HEEL);

        _bHeelShoot = true;
    };

    this.createPlayerLeg = function (oPhysicsObject) {

        var oPlayerPos;

        oPlayerPos = {x: _oCharacter.x + OFFSET_LEG_POS.x, y: _oCharacter.y + OFFSET_LEG_POS.y};

        _oLeg = oPhysicsObject.addLeg(oPlayerPos, PLAYER_LEG);

        _bLegShoot = true;
    };

    this.getLegShoot = function () {
        return _bLegShoot;
    };

    this.getHeadShoot = function () {
        return _bHeadShoot;
    };

    this.getHeelShoot = function () {
        return _bHeelShoot;
    };

    this.movement = function (oPlayerCollision, oOpponentX) {
        var oPosFx1 = s_oPhysicsController.getElementPosition(oPlayerCollision.fixture1);
        var oPosFx2 = s_oPhysicsController.getElementPosition(oPlayerCollision.fixture2);
        var oPosFx3 = s_oPhysicsController.getElementPosition(oPlayerCollision.fixture3);

        var fDistanceX = oOpponentX - _oCharacter.x;

        if (fDistanceX > STOP_WALK_DISTANCE_PLAYER || _iDir < 0) {
            oPosFx1.x += (_iSpeed * _iDir);
        }

        if (oPosFx1.x >= _iOffsetWallRight) {
            oPosFx1.x = _iOffsetWallRight;
        } else if (oPosFx1.x <= _iOffsetWallLeft) {
            oPosFx1.x = _iOffsetWallLeft;
        }

        oPosFx2.x = oPosFx1.x + PLAYERS_COLLISION.sph_offset.x - PLAYERS_COLLISION.rec_offset.x;
        oPosFx3.x = oPosFx1.x + PLAYERS_COLLISION.rec_neck.x - PLAYERS_COLLISION.rec_offset.x;

        s_oPhysicsController.setElementPosition(oPlayerCollision.fixture1, oPosFx1);
        s_oPhysicsController.setElementPosition(oPlayerCollision.fixture2, oPosFx2);
        s_oPhysicsController.setElementPosition(oPlayerCollision.fixture3, oPosFx3);

        _oCharacter.x = oPosFx1.x + PLAYERS_COLLISION.rec_center_width;
        _oCharacter.y = oPosFx1.y - PLAYERS_COLLISION.rec_offset.y;
    };

    this.update = function (oPlayerCollision, oOpponentX) {

        this.movement(oPlayerCollision, oOpponentX);

        if (_bLegShoot === true) {
            var fAngleLeg = s_oPhysicsController.getJointAngle(_oLeg.jointLeg);
            var oPos = {x: _oCharacter.x + OFFSET_LEG_POS.x, y: _oCharacter.y + OFFSET_LEG_POS.y};
            s_oPhysicsController.setElementPosition(_oLeg.fixture2, oPos);
            if (fAngleLeg >= DELETE_LEG_ANGLE_PLAYER) {
                s_oGame.removeLeg(_oLeg);
                _bLegShoot = false;
            }
        } else if (_bHeadShoot === true) {
            var fTranslationHead = s_oPhysicsController.getJointTranslation(_oHead.joint);
            var oPos = {x: _oCharacter.x + OFFSET_HEAD_POS.x, y: _oCharacter.y + OFFSET_HEAD_POS.y};
            s_oPhysicsController.setElementPosition(_oHead.fixture2, oPos);
            if (fTranslationHead >= PLAYER_HEAD.distance - 0.1) {
                s_oGame.removeHead(_oHead);
                _bHeadShoot = false;
            }
        } else if (_bHeelShoot === true) {
            var fAngleHeel = s_oPhysicsController.getJointAngle(_oHeel.jointLeg);
            var oPos = {x: _oCharacter.x + OFFSET_HEEL_POS.x, y: _oCharacter.y + OFFSET_HEEL_POS.y};
            s_oPhysicsController.setElementPosition(_oHeel.fixture2, oPos);
            if (fAngleHeel <= DELETE_HEEL_ANGLE_PLAYER) {
                s_oGame.removeLeg(_oHeel);
                _bHeelShoot = false;
            }
        }
    };

    s_oCharacter = this;

    this._init(iXPos, iYPos, oSprite, iSpeed, oParentContainer);
}

var s_oCharacter;

