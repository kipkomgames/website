function CGame(oData, iTeamChoosed) {
    var _bStartGame = true;
    var _bInput = false;
    var _bPressedKeys = false;
    var _bPressedShift = false;
    var _bFinish = false;
    var _bGoal = false;
    var _bBlockAI = false;
    var _bBallForwardPlayer = true;
    var _bExtendedMatch = false;
    var _iScore;
    var _iLevel;
    var _iPlayerTeam;
    var _iGoalPlayer;
    var _iGoalOpponent;
    var _oInterface;
    var _oBg;
    var _oSideLeft;
    var _oSideRight;
    var _oPhysicsObject;
    var _oBallPhysics;
    var _oBallSprite;
    var _oBallVelocity;
    var _oOffset;
    var _oCharacter;
    var _oOpponent;
    var _oPlayerCollision;
    var _oOpponentCollision;
    var _oImpulseAfterGoal;
    var _oGoal;
    var _oSupporters;
    var _oCrowdAudio;
    var _aLinesField;
    var _aSpriteObjects;
    var _aObject;
    var _aResults;
    var _aOpponentsTeamVs;
    var _fTimeDespawnHead;
    var _fTimeAfterGoal;
    var _fTimeMatch;

    this._init = function () {

        $(s_oMain).trigger("start_session");

        _bStartGame = false;
        _iScore = 0;

        _iLevel = 0;

        _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(_oBg);

        s_oPhysicsController = new CPhysicsController();
        _oPhysicsObject = new CPhysicsObject();

        _oPhysicsObject.createAContactListener();

        _aLinesField = new Array();
        _aObject = new Array();
        _aSpriteObjects = new Array();
        _aResults = new Array();

        this.createSupporters();

        var oSpriteCharacter = s_oSpriteLibrary.getSprite("team_" + iTeamChoosed);

        _oGoal = new CGoal();

        var oSpriteBall = s_oSpriteLibrary.getSprite("ball");

        this._createBall(oSpriteBall, BALL_POSITION.x, BALL_POSITION.y, BALL_DENSITY, BALL_FRICTION, BALL_RESTITUTION);

        this._createPlayer(oSpriteCharacter, USER_PLAYER_START_POS.x, USER_PLAYER_START_POS.y, s_oStage);

        this.createLevel();

        _iPlayerTeam = iTeamChoosed;

        _aOpponentsTeamVs = this._createRandomOpponentTeamOrder();

        _oOpponentCollision = this._createOpponentCollision();

        this.createOpponent(_aOpponentsTeamVs[_iLevel], OPPONENT_START_POS.x, OPPONENT_START_POS.y, s_oStage);

        _oGoal.createGoalFront();

        _iGoalOpponent = 0;
        _iGoalPlayer = 0;

        _fTimeAfterGoal = 0;

        _fTimeDespawnHead = 0;

        _oCrowdAudio = playSound("crowd", 1, -1);

        _oInterface = new CInterface(iTeamChoosed, _aOpponentsTeamVs[_iLevel]);

        _oInterface.refreshResult(_iGoalPlayer, _iGoalOpponent);

        _fTimeMatch = REGULAR_MATCH_TIME;

        _oInterface.refreshTime(TEXT_TIME + ": " + Math.ceil(_fTimeMatch));

        if (s_bMobile === false) {
            document.onkeydown = onKeyDown;
            document.onkeyup = onKeyUp;
        }
    };

    this._createRandomOpponentTeamOrder = function () {
        var aTeam = new Array();
        var iID = 0;
        for (var i = 0; i < TOT_TEAM; i++) {
            if (_iPlayerTeam !== i) {
                aTeam[iID] = i;
                iID++;
            }
        }
        aTeam = shuffle(aTeam);
        return aTeam;
    };

    this.createLevel = function () {
        var aLevelDiagram = FIELD_DIAGRAM;
        for (var i = 0; i < aLevelDiagram.length; i++) {
            var oStartPos = aLevelDiagram[i][0];
            var oEndPos = aLevelDiagram[i][1];
            _aLinesField[i] = _oPhysicsObject.addLine(0, 0, oStartPos, oEndPos, 0, WALL_DENSITY, WALL_FRICTION, WALL_RESTITUTION);
        }

        var aObjectLevel = OBJECT;
        for (var i = 0; i < aObjectLevel.length; i++) {
            for (var j = 0; j < aObjectLevel[i].length; j++) {
                if (aObjectLevel[i][j].info.type !== POLE) {
                    _aObject[i] = {object: _oPhysicsObject.addPolygon(aObjectLevel[i][j]), type: "polygon"};
                } else if (aObjectLevel[i][j].info.type === POLE) {
                    _aObject[i] = {object: _oPhysicsObject.addRectangle(aObjectLevel[i][j], _oOffset), type: "polygon"};
                }
                this.createSpriteObject(aObjectLevel[i][j]);
            }
        }
    };

    function onKeyDown(evt) {
        if (_bInput === true) {
            if (evt.keyCode === 88) {
                s_oGame.shot();
            } else if (evt.keyCode === 90 && !_bPressedShift) {
                s_oGame.headShot();
            }

            if (!_bPressedKeys) {
                if (evt.keyCode === 37) {
                    s_oGame.moveLeft();
                } else if (evt.keyCode === 39) {
                    s_oGame.moveRight();
                }
            }
        }
        evt.preventDefault();
        return false;
    }

    function onKeyUp(evt) {
        if (_bInput === true) {
            if (evt.keyCode === 37) {
                s_oGame.onCommandLeftUp();
            } else if (evt.keyCode === 39) {
                s_oGame.onCommandRightUp();
            }
            if (evt.keyCode === 90 || evt.keyCode === 88) {
                s_oGame.onCommandActionUp();
            }
        }
    }

    this.onCommandLeftUp = function () {
        _bPressedKeys = false;
        _oCharacter.setDirection(0);
        _bPressedKeyLeft = false;
        _oCharacter.changeState("idle");
    };

    this.onCommandRightUp = function () {
        _bPressedKeys = false;
        _oCharacter.setDirection(0);
        _bPressedKeyRight = false;
        _oCharacter.changeState("idle");
    };

    this.onCommandActionUp = function () {
        _bPressedShift = false;
    };

    this.shot = function () {
        if (_oCharacter.getHeadShoot() === false && _oCharacter.getHeelShoot() === false
                && _oCharacter.getLegShoot() === false) {
            if (_bBallForwardPlayer) {
                _oCharacter.createPlayerLeg(_oPhysicsObject);
                _oCharacter.changeState("shot");
            } else {
                _oCharacter.createHeel(_oPhysicsObject);
                _oCharacter.changeState("heel_shot");
            }
        }
    };

    this.headShot = function () {
        if (_oCharacter.getHeadShoot() === false && _oCharacter.getHeelShoot() === false
                && _oCharacter.getLegShoot() === false) {
            _oCharacter.createPlayerHead(_oPhysicsObject);
            if (_oCharacter.getDirection() === 0) {
                _oCharacter.changeState("head_shot_idle");
            } else if (_oCharacter.getDirection() === -1 || _oCharacter.getDirection() === 1) {
                _oCharacter.changeState("head_shot_run");
            }
        }
    };

    this.moveLeft = function () {
        _bPressedKeys = true;
        _oCharacter.setDirection(-1); //left
        _oCharacter.changeState("reverse");
    };

    this.moveRight = function () {
        _bPressedKeys = true;
        _oCharacter.setDirection(1); //right
        _oCharacter.changeState("run");
        _oCharacter.rotate(1);
    };

    this.createSpriteObject = function (oObject) {
        var oSprite;
        var _bAccetableType = false;
        var iID = _aSpriteObjects.length;
        if (oObject.info.type === GOAL_AREA) {

        } else if (oObject.info.type === GOAL_AREA_ENEMY) {

        } else if (oObject.info.type === WALL) {
            this.createGraphicsWallObject(oObject);
        }

        if (_bAccetableType) {
            var oOffset = {x: oObject.offset.x, y: oObject.offset.y};
            _aSpriteObjects[iID] = createBitmap(oSprite);
            _aSpriteObjects[iID].x = oObject.x + oOffset.x;
            _aSpriteObjects[iID].y = oObject.y + oOffset.y;
            _aSpriteObjects[iID].rotation = oObject.angle;
            s_oStage.addChild(_aSpriteObjects[iID]);
        }
    };

    this.setBallLinearDamping = function (fValue) {
        s_oPhysicsController.setElementLinearDamping(_oBallPhysics, fValue);
    };

    this.unload = function () {
        _bStartGame = false;

        if (_oSideRight) {
            _oSideRight.unload();
            _oSideRight = null;
        }

        if (_oSideLeft) {
            _oSideLeft.unload();
            _oSideLeft = null;
        }

        _oInterface.unload();

        _oBallSprite.unload();

        this.destroyEnginePhysics();

        _oCharacter.unload();

        _oOpponent.unload();

        _oCrowdAudio.destroy();

        s_oStage.removeAllChildren();

        createjs.Tween.removeAllTweens();

        if (s_bMobile === false) {
            document.onkeydown = null;
            document.onkeyup = null;
        }
    };

    this.destroyEnginePhysics = function () {

        s_oPhysicsController.destroyAllJoint();
        s_oPhysicsController.destroyAllBody();
        s_oPhysicsController.destroyWorld();

        s_oPhysicsController = null;
    };

    this._createPlayer = function (oSprite, iX, iY, oParentContainer) {
        _oCharacter = new CCharacter(iX, iY, oSprite, CHARACTER_SPEED, oParentContainer);

        _oPlayerCollision = _oPhysicsObject.addCollisionShape(PLAYERS_COLLISION);
        _oCharacter.update(_oPlayerCollision);

    };

    this.createOpponent = function (iTeam, iX, iY, oParentContainer) {
        var oSprite = s_oSpriteLibrary.getSprite("team_" + iTeam);
        _oOpponent = new COpponent(iX, iY, oSprite, OPPONENT_SPEEDS[_iLevel], _oPhysicsObject, _oOpponentCollision, oParentContainer);
        _oOpponent.setDistanceProtection(OPPONENT_DISTANCE_PROTECTION[_iLevel]);
    };

    this._createOpponentCollision = function () {
        var oCollision;
        oCollision = _oPhysicsObject.addCollisionShape(OPPONENT_COLLISION);
        return oCollision;
    };

    this.resetPlayersPos = function () {
        _oCharacter.setPosition(USER_PLAYER_START_POS.x, USER_PLAYER_START_POS.y);

        var oPosFx1 = {x: _oCharacter.getX() + PLAYERS_COLLISION.rec_offset.x,
            y: _oCharacter.getY() + PLAYERS_COLLISION.rec_offset.y};
        var oPosFx2 = {x: _oCharacter.getX() + PLAYERS_COLLISION.sph_offset.x,
            y: _oCharacter.getY() + PLAYERS_COLLISION.sph_offset.y};
        s_oPhysicsController.setElementPosition(_oPlayerCollision.fixture1, oPosFx1);
        s_oPhysicsController.setElementPosition(_oPlayerCollision.fixture2, oPosFx2);

        _bInput = true;
    };

    this.resetOpponentPos = function () {
        _oOpponent.setPosition(OPPONENT_START_POS.x, OPPONENT_START_POS.y);

        var oPosFx1 = {x: _oOpponent.getX() + OPPONENT_COLLISION.rec_offset.x,
            y: _oOpponent.getY() + OPPONENT_COLLISION.rec_offset.y};
        var oPosFx2 = {x: _oOpponent.getX() + OPPONENT_COLLISION.sph_offset.x,
            y: _oOpponent.getY() + OPPONENT_COLLISION.sph_offset.y};
        s_oPhysicsController.setElementPosition(_oOpponentCollision.fixture1, oPosFx1);
        s_oPhysicsController.setElementPosition(_oOpponentCollision.fixture2, oPosFx2);

    };

    this.removeLeg = function (oLeg) {

        s_oPhysicsController.destroyJoint(oLeg.jointLeg);
        s_oPhysicsController.destroyJoint(oLeg.jointFoot);

        s_oPhysicsController.destroyBody(oLeg.fixture1);
        s_oPhysicsController.destroyBody(oLeg.fixture2);
        s_oPhysicsController.destroyBody(oLeg.fixture3);
    };

    this.removeHead = function (oHead) {
        s_oPhysicsController.destroyJoint(oHead.joint);

        s_oPhysicsController.destroyBody(oHead.fixture1);
        s_oPhysicsController.destroyBody(oHead.fixture2);
    };

    this._createBall = function (oSprite, iX, iY, iDensity, iFriction, iRestitution) {
        //OBJECT WITH PHYSICS
        _oBallPhysics = _oPhysicsObject.addBall(oSprite.width / 2, iX, iY, iDensity, iFriction, iRestitution);

        //VISIBLE OBJECT
        _oBallSprite = new CBall(iX, iY, oSprite);

    };

    this.getBallSpritePos = function () {
        var oPos = {x: _oBallSprite.getX(), y: _oBallSprite.getY()};
        return oPos;
    };

    this.getCharacterPos = function () {
        var oPos = {x: _oCharacter.getX(), y: _oCharacter.getY()};
        return oPos;
    };

    this.getPlayerTeam = function () {
        return _iPlayerTeam;
    };

    this.getOpponentTeam = function () {
        return _aOpponentsTeamVs[_iLevel];
    };

    this.addImpulseToBall = function (oDir) {
        s_oPhysicsController.applyImpulse(_oBallPhysics, oDir);
    };

    this.setBallLinearDamping = function (fValue) {
        s_oPhysicsController.setElementLinearDamping(_oBallPhysics, fValue);
    };

    this.playerGoal = function () {
        if (!_bGoal && !_bFinish) {
            _iGoalPlayer++;
            _oInterface.crowdEffectOn();
            _oSupporters.startAnimation(1);
            this.afterGoal();
            playSound("goal", 1, 0);
            _oImpulseAfterGoal = FORCE_AFTER_GOAL_PLAYER;
        }
    };

    this.createSupporters = function () {
        _oSupporters = new CSpriteAnimator();

        for (var i = 0; i < SUPPORTERS_FRAMES; i++) {
            _oSupporters.loadSprites(s_oSpriteLibrary.getSprite("supporters_" + i), SUPPORTERS_POS.x, SUPPORTERS_POS.y, 0, 0);
        }
    };

    this.opponentGoal = function () {
        if (!_bGoal && !_bFinish) {
            _iGoalOpponent++;
            this.afterGoal();
            playSound("game_over", 1, 0);
            _oImpulseAfterGoal = FORCE_AFTER_GOAL_OPPONENT;
        }
    };

    this.playKickSound = function () {
        if (!_bFinish)
            playSound("kick", 1, 0);
    };

    this.afterGoal = function () {
        _oInterface.refreshResult(_iGoalPlayer, _iGoalOpponent);
        _bGoal = true;
        _fTimeAfterGoal = TIME_RESET_BALL;

        _oInterface.createGoalText(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 - 150);

        this.blockMatch();
        this.setBallLinearDamping(BALL_LINEAR_DAMPING_GOAL);
    };

    this.blockMatch = function () {
        _bInput = false;
        _oCharacter.setDirection(0);

        _oCharacter.changeState("idle");
        _oOpponent.move(0);

        _bPressedKeyLeft = false;
        _bPressedKeyRight = false;
        _bBlockAI = true;
        _bPressedKeys = false;
        if (s_bMobile)
            _oInterface.blockCommand(true);
    };

    this.restartBallPos = function () {
        var oPos = {x: BALL_POSITION.x, y: BALL_POSITION.y};
        s_oPhysicsController.setElementPosition(_oBallPhysics, oPos);
        s_oPhysicsController.setElementLinearVelocity(_oBallPhysics, {x: 0, y: 0});
        s_oPhysicsController.setElementAngularVelocity(_oBallPhysics, 0);
        var oCurPos = s_oPhysicsController.getElementPosition(_oBallPhysics);
        if (oCurPos.x <= 0) {
            s_oPhysicsController.setElementPosition(_oBallPhysics, oPos);
        }

        this.moveBall();

        this.setBallLinearDamping(BALL_LINEAR_DAMPING);
    };

    this.resetState = function () {
        _bGoal = false;
        _bBlockAI = false;
    };

    this.addObjectToStage = function (oObject, oInfos, oSprite) {
        oObject.x = oInfos.x;
        oObject.y = oInfos.y;
        oObject.regX = oSprite.width / 2;
        oObject.regY = oSprite.height / 2;
        s_oStage.addChild(oObject);
    };

    this.onExit = function () {
        this.unload();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        setVolume(s_oSoundTrack, 1);
        s_oMain.gotoMenu();
    };

    this._onExitHelp = function () {
        _oInterface.onExitFromHelp();
    };

    this._onExitVsPanel = function () {
        _oInterface._onExitVsPanel();
        _oInterface.createStartMatchText();

        $(s_oMain).trigger("start_level", _iLevel);
    };

    this.startMatch = function () {
        _bStartGame = true;
        _bInput = true;
        this.resetState();
        _bFinish = false;
        _bExtendedMatch = false;
        _oInterface.blockAllButton(false);

        if (s_bMobile)
            _oInterface.blockCommand(false);

        setVolume(s_oSoundTrack, 0.3);
        playSound("kick_off", 1, 0);
    };

    this.moveBall = function () {
        var oInfo = s_oPhysicsController.getElementPosition(_oBallPhysics);
        _oBallSprite.setPosition(oInfo.x, oInfo.y);
        _oBallSprite.setAngle(oInfo.angle);
    };

    this.addHitEffect = function (oPoint) {
        if (_bFinish) {
            return;
        }

        var oHit;

        var oSpriteHit = s_oSpriteLibrary.getSprite("contact_ball");

        oHit = createBitmap(oSpriteHit);
        oHit.x = oPoint.x;
        oHit.y = oPoint.y;
        oHit.regX = oSpriteHit.width * 0.5;
        oHit.regY = oSpriteHit.height * 0.5;

        s_oStage.addChild(oHit);

        createjs.Tween.get(oHit).wait(100).call(function () {
            s_oStage.removeChild(oHit);
        });

    };

    this.unloadLevel = function () {
        for (var i = 0; i < _aLinesField.length; i++) {
            s_oPhysicsController.destroyBody(_aLinesField[i]);
        }

        for (var i = 0; i < _aObject.length; i++) {
            if (_aObject[i].type === "polygon") {
                s_oPhysicsController.destroyBody(_aObject[i].object);
            } else if (_aObject[i].type === "line") {
                var aLine = _aObject[i].object;
                for (var j = 0; j < aLine.length; j++) {
                    s_oPhysicsController.destroyBody(aLine[j]);
                }
            }
        }

        _aLinesField = new Array();
        _aObject = new Array();
    };

    this.onContinue = function (iIndex) {
        _iLevel++;

        this.nextLevel();

        this.restartBallPos();
        this.resetOpponentPos();
        this.resetPlayersPos();
        this.resetResult();

        _bStartGame = false;
        _bInput = false;

        if (s_bMobile)
            _oInterface.blockCommand(true);

        _oCharacter.update(_oPlayerCollision, _oOpponent.getX());

        s_oPhysicsController.update();

        var oSpriteMsgBox = s_oSpriteLibrary.getSprite("msg_box");
        _oInterface.createVsPanel(oSpriteMsgBox, _iPlayerTeam, _aOpponentsTeamVs[_iLevel], iIndex, _iLevel, 750);
    };

    this.unpause = function (bVal) {
        _bStartGame = bVal;
        if (bVal === true) {
            _oCharacter.playAnimation();
            _oOpponent.playAnimation();
        } else {
            _oCharacter.stopAnimation();
            _oOpponent.stopAnimation();
        }
    };

    this.nextLevel = function () {
        var iIndex = _oOpponent.getChildIndex();

        _oOpponent.unload();
        this.createOpponent(_aOpponentsTeamVs[_iLevel], OPPONENT_START_POS.x, OPPONENT_START_POS.y, s_oStage);
        _oOpponent.setChildIndex(iIndex);

        _oInterface.setTeams(_iPlayerTeam, _aOpponentsTeamVs[_iLevel]);
        _oInterface.setTeamsFlagScoreBoard(_iPlayerTeam, _aOpponentsTeamVs[_iLevel]);

    };

    this.restartLevel = function () {
        this.resetResult();

        this.restartBallPos();
        this.resetPlayersPos();
        this.resetOpponentPos();
        this.resetState();

        _oInterface.blockAllButton(false);

        if (s_bMobile)
            _oInterface.blockCommand(false);

        _bExtendedMatch = false;
        _bFinish = false;

        playSound("kick_off", 1, 0);

    };

    this.resetResult = function () {
        _fTimeMatch = REGULAR_MATCH_TIME;
        _oInterface.refreshTime(TEXT_TIME + ": " + Math.ceil(_fTimeMatch));

        _iGoalOpponent = 0;
        _iGoalPlayer = 0;

        _oInterface.refreshResult(_iGoalPlayer, _iGoalOpponent);
    };

    this.ballForwoardPlayer = function () {
        if (_oCharacter.getX() > _oBallSprite.getX()) {
            _bBallForwardPlayer = false;
        } else {
            _bBallForwardPlayer = true;
        }
    };

    this.matchTime = function (fSecond) {
        if (_fTimeMatch > 0) {
            _fTimeMatch -= fSecond;
            var szTime;
            if (_bExtendedMatch === false) {
                szTime = TEXT_TIME + ": " + Math.ceil(_fTimeMatch);
            } else {
                szTime = TEXT_TIME_EXT + ": " + Math.ceil(_fTimeMatch);
            }
            _oInterface.refreshTime(szTime);
            this.changeOpponentStrategy();
        } else {
            this.finishTime();
        }
    };

    this.changeOpponentStrategy = function () {
        if (_iGoalOpponent < _iGoalPlayer && _fTimeMatch < TIME_OPP_BECOME_AGGRESSIVE) {
            if (!_oOpponent.getAggressive()) {
                _oOpponent.setAggressive(true, _iLevel);
            }
        } else {
            if (_oOpponent.getAggressive()) {
                _oOpponent.setAggressive(false, _iLevel);
            }
        }
    };

    this.extendTime = function () {
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetState();
        this.resetOpponentPos();
        _fTimeMatch = EXTENDED_MATCH_TIME;
        _oInterface.refreshTime(TEXT_TIME_EXT + ": " + Math.ceil(_fTimeMatch));
        _bFinish = false;
        if (s_bMobile)
            _oInterface.blockCommand(false);
        playSound("kick_off", 1, 0);
    };

    this.finishTime = function () {

        this.blockMatch();

        _oCharacter.changeState("idle");
        _oOpponent.changeState("idle");

        _bFinish = true;

        if (_iGoalPlayer === _iGoalOpponent && _bExtendedMatch === false) {
            _oInterface.createExtendedTimeText();
            _bExtendedMatch = true;
            return;
        }

        var bWin = false;
        var bEnd = false;

        _oOpponent.removeAllComponent();

        var oInfoScore = this.calculateNewScore();

        if (_iGoalPlayer > _iGoalOpponent) {
            bWin = true;
            playSound("goal", 1, 0);
            _iScore = oInfoScore.new_score;
            this.storesResult();
            if (_iLevel === TOT_TEAM - 2) {
                bEnd = true;
            }
        } else {
            bWin = false;
            playSound("game_over", 1, 0);
        }

        $(s_oMain).trigger("end_level", _iLevel);

        _oInterface.createEndMatchText(_iGoalPlayer, _iGoalOpponent, bWin, oInfoScore, bEnd);
        _oInterface.blockAllButton(true);

    };

    this.storesResult = function () {
        _aResults[_iLevel] = {player_team: _iPlayerTeam, opponent_team: _aOpponentsTeamVs[_iLevel],
            result: _oInterface.getScoreBoardResult()};
    };

    this._onEnd = function () {
        this.unload();
        $(s_oMain).trigger("end_session");
        setVolume(s_oSoundTrack, 1);
        s_oMain.gotoCongratulations(_aResults, _iScore);
    };

    this.calculateNewScore = function () {
        var oInfo = {score: _iScore, player_goal_score: 0, opponent_goal_score: 0, score_match: 0, new_score: 0};

        oInfo.player_goal_score = _iGoalPlayer * SCORE_PLAYER_GOAL;
        oInfo.opponent_goal_score = _iGoalOpponent * SCORE_OPPONENT_GOAL;

        if (_bExtendedMatch) {
            oInfo.score_match = SCORE_TIE;
        } else {
            oInfo.score_match = SCORE_WIN;
        }

        oInfo.new_score = oInfo.score + oInfo.player_goal_score + oInfo.opponent_goal_score + oInfo.score_match;

        return oInfo;
    };

    this.startGameAfterGoal = function () {
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetState();
        this.resetOpponentPos();
        playSound("kick_off", 1, 0);
        if (s_bMobile)
            _oInterface.blockCommand(false);
        this.addImpulseToBall(_oImpulseAfterGoal);
    };

    this.update = function () {
        if (_bStartGame) {

            var fSecond = 1 / createjs.Ticker.framerate;

            this.moveBall();

            _oBallVelocity = s_oPhysicsController.getElementVelocity(_oBallPhysics);

            if (_bGoal) {
                if (_oSupporters.getStateAnimation()) {
                    _oSupporters.update();
                }
                _fTimeAfterGoal -= fSecond;
                if (_fTimeAfterGoal <= 0) {
                    this.startGameAfterGoal();
                }
            } else {
                if (!_bBlockAI) {
                    var oPosChar = {x: _oCharacter.getX(), y: _oCharacter.getY()};
                    _oOpponent.update(_oOpponentCollision, _oBallVelocity, oPosChar, _iLevel);
                }
                if (!_bFinish)
                    this.matchTime(fSecond);
            }

            this.ballForwoardPlayer();

            _oCharacter.update(_oPlayerCollision, _oOpponent.getX());

            s_oPhysicsController.update();

        }
    };

    s_oGame = this;

    TIME_RESET_BALL = oData.time_reset_ball;
    REGULAR_MATCH_TIME = oData.regular_match_time;
    EXTENDED_MATCH_TIME = oData.extend_match_time;
    SCORE_PLAYER_GOAL = oData.add_score_player_goal;
    SCORE_OPPONENT_GOAL = oData.remove_score_opponent_goal;
    SCORE_WIN = oData.score_win;
    SCORE_TIE = oData.score_tie;
    OPPONENT_SPEEDS = oData.opponent_speeds;
    CHARACTER_SPEED = oData.character_speed;
    OPPONENT_DISTANCE_PROTECTION = oData.opponent_distance_protection;
    OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT = oData.opponent_distance_protection_after_shoot;
    OPPONENT_DISTANCE_PROTECTION_AGG = oData.opponent_distance_protection_aggressive;
    OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT_AGG = oData.opponent_distance_protection_after_shoot_aggressive;
    REACT_OPP_FOR_HEEL_SHOOT = oData.reactivity_opponent_for_hell_shoot;
    BALL_AND_CHARACTER_DISTANCE_PROTECTION = oData.ball_and_character_distance_protection;
    BALL_VELOCITY_X_REACTION = oData.ball_velocity_x_reaction;
    BALL_VELOCITY_X_REACTION_ATTACK = oData.ball_velocity_x_reaction_attack;
    TIME_REACTION_FROM_SAVE_TO_GO = oData.time_reaction_from_save_to_go;
    TIME_OPP_BECOME_AGGRESSIVE = oData.time_opp_become_aggressive;
    TIME_AFTER_REACTION = oData.time_after_reaction;
    TIME_INTERVAL_SHOOT = oData.time_interval_shoot;
    TIME_IN_PROTECT_STATE = oData.time_in_protection_state;
    TIME_REFRESH_AI = oData.time_refresh_AI;
    NUM_LEVEL_FOR_ADS = oData.num_levels_for_ads;

    this._init();
}

var s_oGame;