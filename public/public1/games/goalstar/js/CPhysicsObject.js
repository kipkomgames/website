function CPhysicsObject() {
    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = Box2D.Dynamics.b2World;
    var b2MassData = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
    var b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
    var b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJointDef;
    var b2WorldManifold = Box2D.Collision.b2WorldManifold;

    var _bContactOccured;      //maybe this is to delete.

    var _oWorld;

    var _oGame;
    var _oPhysicController;

    this.init = function () {
        _bContactOccured = false;

        _oPhysicController = s_oPhysicsController.getInstance();
        _oGame = s_oGame;
        _oWorld = _oPhysicController.getWorld();

    };

    this.addWall = function (iWidth, iHeight, iX, iY, iAngle, density, friction, restitution) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;

        var bodyDef = new b2BodyDef;
        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(iWidth / WORLD_SCALE, iHeight / WORLD_SCALE);
        bodyDef.position.Set(iX / WORLD_SCALE, iY / WORLD_SCALE);
        bodyDef.angle = iAngle * Math.PI / 180;
        _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);
    };

    this.addLine = function (iX, iY, oStartPoint, oEndPoint, iAngle, density, friction, restitution) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;
        fixDef.filter.categoryBits = FIELD_CATEGORY_COLLISION;
        fixDef.filter.maskBits = -1;
        fixDef.filter.groupIndex = 1;

        var bodyDef = new b2BodyDef;
        //create ground

        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(iX / WORLD_SCALE, iY / WORLD_SCALE);
        bodyDef.angle = iAngle * Math.PI / 180;
        bodyDef.userData = {type: WALL};
        fixDef.shape = new b2PolygonShape;

        var points = [];

        var vecStart = new b2Vec2();
        vecStart.Set(oStartPoint.x / WORLD_SCALE, oStartPoint.y / WORLD_SCALE);
        points.push(vecStart);

        var vecEnd = new b2Vec2();
        vecEnd.Set(oEndPoint.x / WORLD_SCALE, oEndPoint.y / WORLD_SCALE);
        points.push(vecEnd);

        fixDef.shape.SetAsBox(200, 0.3);

        fixDef.shape.SetAsArray(points, points.length);

        var lineFixture = _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);

        return lineFixture;

    };

    this.addPolygon = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.isSensor = oObject.sensor;
        fixDef.filter.categoryBits = 0x0003;
        fixDef.filter.maskBits = 0x0001;
        fixDef.filter.groupIndex = 1;

        var bodyDef = new b2BodyDef;
        //create ground

        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(oObject.x / WORLD_SCALE, oObject.y / WORLD_SCALE);
        bodyDef.angle = oObject.angle * Math.PI / 180;
        bodyDef.userData = oObject.info;
        fixDef.shape = new b2PolygonShape;

        var aVertex = oObject.vertex;

        var points = [];
        for (var i = 0; i < aVertex.length; i++) {
            var vecStart = new b2Vec2();
            vecStart.Set(aVertex[i].x / WORLD_SCALE, aVertex[i].y / WORLD_SCALE);
            points.push(vecStart);
        }

        fixDef.shape.SetAsArray(points, points.length);

        var polygonfixture = _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);

        return polygonfixture;

    };

    this.addCollisionPolygon = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        if (oObject.info.type === PLAYER) {
            fixDef.filter.categoryBits = FIELD_CATEGORY_COLLISION;
            fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
            fixDef.filter.groupIndex = 1;
        } else if (oObject.info.type === OPPONENT) {
            fixDef.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
            fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
            fixDef.filter.groupIndex = 1;
        }

        var bodyDef = new b2BodyDef;
        //create ground

        bodyDef.type = b2Body.b2_kinematicBody;
        bodyDef.position.Set(oObject.x / WORLD_SCALE, oObject.y / WORLD_SCALE);
        bodyDef.angle = oObject.angle * Math.PI / 180;
        bodyDef.userData = oObject.info;
        fixDef.shape = new b2PolygonShape;

        var aVertex = oObject.vertex;

        var aPlayerCollision = new Array();

        for (var i = 0; i < aVertex.length; i++) {
            var points = [];
            for (var j = 0; j < aVertex[i].length; j++) {
                var vecStart = new b2Vec2();
                if (oObject.info.type === OPPONENT)
                    vecStart.Set(aVertex[i][j].x / WORLD_SCALE, (aVertex[i][j].y + 11) / WORLD_SCALE);
                else
                    vecStart.Set(aVertex[i][j].x / WORLD_SCALE, aVertex[i][j].y / WORLD_SCALE);
                points.push(vecStart);
            }
            fixDef.shape.SetAsArray(points, points.length);

            aPlayerCollision[i] = _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);
        }

        return aPlayerCollision;
    };

    this.addCollisionShape = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;

        fixDef.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
        fixDef.filter.groupIndex = 1;
        
        var bodyDef = new b2BodyDef;
        //create rectangular body
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(oObject.recWidth / WORLD_SCALE, oObject.recHeight / WORLD_SCALE);
        bodyDef.position.Set((oObject.x + oObject.rec_offset.x) / WORLD_SCALE,
                (oObject.y + oObject.rec_offset.y) / WORLD_SCALE);
        bodyDef.fixedRotation = true;

        var Body1 = _oWorld.CreateBody(bodyDef);
        var boxFixture = Body1.CreateFixture(fixDef);

        var bodyDef = new b2BodyDef;

        var SpherefixDef = new b2FixtureDef;
        SpherefixDef.density = oObject.density;
        SpherefixDef.friction = oObject.friction;
        SpherefixDef.restitution = oObject.restitution;

        SpherefixDef.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        SpherefixDef.filter.maskBits = -1;
        SpherefixDef.filter.groupIndex = 1;

        bodyDef.type = b2Body.b2_dynamicBody;
        SpherefixDef.shape = new b2CircleShape(oObject.radius / WORLD_SCALE);
        bodyDef.position.x = (oObject.x + oObject.sph_offset.x) / WORLD_SCALE;
        bodyDef.position.y = (oObject.y + oObject.sph_offset.y) / WORLD_SCALE;
        bodyDef.fixedRotation = true;
        bodyDef.allowSleep = false;
        bodyDef.bullet = true;
        var Body2 = _oWorld.CreateBody(bodyDef);
        var headFixture = Body2.CreateFixture(SpherefixDef);

        var bodyDef = new b2BodyDef;
        //create rectangular neck
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(oObject.rec_neck.width / WORLD_SCALE, oObject.rec_neck.height / WORLD_SCALE);
        bodyDef.position.Set((oObject.x + oObject.rec_neck.x) / WORLD_SCALE,
                (oObject.y + oObject.rec_neck.y) / WORLD_SCALE);
        bodyDef.angle = oObject.rec_neck.angle * (Math.PI / 180);
        bodyDef.fixedRotation = true;

        var Body3 = _oWorld.CreateBody(bodyDef);
        var neckFixture = Body3.CreateFixture(fixDef);

        var jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(Body1, Body2, Body2.GetWorldCenter());
        var jointBody = _oWorld.CreateJoint(jointDef);

        var jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(Body1, Body3, Body3.GetWorldCenter());
        var jointNeck = _oWorld.CreateJoint(jointDef);

        return {fixture1: boxFixture, fixture2: headFixture, fixture3: neckFixture, jointA: jointBody, jointB: jointNeck};
    };

    this.createAContactListener = function () {
        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.BeginContact = function (contact) {

            var oInfo = contact.GetFixtureA().GetBody().GetUserData();
            var oInfo1 = contact.GetFixtureB().GetBody().GetUserData();

            if (oInfo === null || oInfo1 === null) {
                return;
            }

            if (oInfo.type === GOAL_AREA && oInfo1.type === BALL) {
                s_oGame.playerGoal();
            } else if (oInfo.type === GOAL_AREA_ENEMY && oInfo1.type === BALL) {
                s_oGame.opponentGoal();
            } else if (oInfo.type === HEAD_SHOOT || oInfo.type === HEEL || oInfo.type === LEG && oInfo1.type === BALL) {
                var manifold = new b2WorldManifold();
                contact.GetWorldManifold(manifold);
                var oPoint = {x: manifold.m_points[0].x * WORLD_SCALE, y: manifold.m_points[0].y * WORLD_SCALE};
                s_oGame.addHitEffect(oPoint);
                s_oGame.playKickSound();
            }
        };

        _oWorld.SetContactListener(listener);
    };

    this.addBall = function (iWidth, iX, iY, density, friction, restitution) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;

        fixDef.filter.categoryBits = BALL_CATEGORY_COLLISION;
        fixDef.filter.maskBits = -1;
        fixDef.filter.groupIndex = 1;

        var bodyDef = new b2BodyDef;

        //create some objects
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2CircleShape(iWidth / WORLD_SCALE);         //radius
        bodyDef.allowSleep = false;
        bodyDef.userData = {type: BALL};
        bodyDef.position.x = iX / WORLD_SCALE;
        bodyDef.position.y = iY / WORLD_SCALE;
        bodyDef.linearDamping = BALL_LINEAR_DAMPING;
        bodyDef.bullet = true;
        var crateFixture = _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);
        return crateFixture;
    };

    this.addCircle = function (iWidth, iX, iY, density, friction, restitution) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;

        var bodyDef = new b2BodyDef;

        //create some objects
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2CircleShape(iWidth / WORLD_SCALE);         //radius
        bodyDef.position.x = iX / WORLD_SCALE;
        bodyDef.position.y = iY / WORLD_SCALE;
        var crateFixture = _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);
        return crateFixture;
    };

    this.addHead = function (oPos, oObject) {
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;

        fixDef.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
        fixDef.filter.groupIndex = -1;

        var bodyDef = new b2BodyDef;

        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2CircleShape(oObject.radius / WORLD_SCALE);
        bodyDef.position.x = (oPos.x) / WORLD_SCALE;
        bodyDef.position.y = (oPos.y) / WORLD_SCALE;
        bodyDef.userData = {type: oObject.info.type};
        var Body1 = _oWorld.CreateBody(bodyDef);
        var headFixture = Body1.CreateFixture(fixDef);

        var pivotfixDef = new b2FixtureDef;
        pivotfixDef.density = 3.0;
        pivotfixDef.friction = 1;
        pivotfixDef.restitution = 0.1;
        pivotfixDef.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        pivotfixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
        pivotfixDef.filter.groupIndex = -1;

        var pivotBodyDef = new b2BodyDef;
        //create ground
        pivotBodyDef.type = b2Body.b2_staticBody;
        pivotfixDef.shape = new b2CircleShape(2 / WORLD_SCALE);
        pivotBodyDef.position.Set(oPos.x / WORLD_SCALE, oPos.y / WORLD_SCALE);
        var pivotBody = _oWorld.CreateBody(pivotBodyDef);
        var pivotFixture = pivotBody.CreateFixture(pivotfixDef);

        var jointDef = new b2PrismaticJoint();
        jointDef.Initialize(pivotBody, Body1, pivotBody.GetWorldCenter(), oObject.mov_allowed);
        jointDef.lowerTranslation = 0;
        jointDef.upperTranslation = oObject.distance;
        jointDef.enableLimit = true;
        jointDef.maxMotorForce = oObject.power;
        jointDef.motorSpeed = oObject.speed;
        jointDef.enableMotor = true;
        var jointHead = _oWorld.CreateJoint(jointDef);

        return {fixture1: headFixture, fixture2: pivotFixture, joint: jointHead};
    };

    this.addStaticCircle = function (iWidth, iX, iY, density, friction, restitution) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;

        var bodyDef = new b2BodyDef;

        //create some objects
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2CircleShape(iWidth / WORLD_SCALE);         //radius
        bodyDef.position.x = iX / WORLD_SCALE;
        bodyDef.position.y = iY / WORLD_SCALE;
        var crateFixture = _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);
        return crateFixture;
    };

    this.addLeg = function (oPos, oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
        fixDef.filter.groupIndex = -1;

        var bodyDef = new b2BodyDef;
        //create ground
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(oObject.width / WORLD_SCALE, oObject.height / WORLD_SCALE);
        bodyDef.position.Set(oPos.x / WORLD_SCALE, oPos.y / WORLD_SCALE);
        var Body1 = _oWorld.CreateBody(bodyDef);
        var boxFixture = Body1.CreateFixture(fixDef);

        var pivotfixDef = new b2FixtureDef;
        pivotfixDef.density = 3.0;
        pivotfixDef.friction = 1;
        pivotfixDef.restitution = 0.1;
        pivotfixDef.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        pivotfixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
        pivotfixDef.filter.groupIndex = -1;
        var pivotBodyDef = new b2BodyDef;
        //create ground
        pivotBodyDef.type = b2Body.b2_staticBody;
        pivotfixDef.shape = new b2CircleShape(2 / WORLD_SCALE);
        pivotBodyDef.position.Set((oPos.x + oObject.pivotX) / WORLD_SCALE, (oPos.y + oObject.pivotY) / WORLD_SCALE);
        var pivotBody = _oWorld.CreateBody(pivotBodyDef);
        var pivotFixture = pivotBody.CreateFixture(pivotfixDef);

        //Revolute joint
        var jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(Body1, pivotBody, pivotBody.GetWorldCenter());
        jointDef.lowerAngle = oObject.lowerAngle * (Math.PI / 180);
        jointDef.upperAngle = oObject.upperAngle * (Math.PI / 180);
        jointDef.enableLimit = true;
        jointDef.maxMotorTorque = oObject.power;
        jointDef.motorSpeed = oObject.speed;
        jointDef.enableMotor = true;
        var jointLeg = _oWorld.CreateJoint(jointDef);

        //create circle for simulate a foot shoot

        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
        fixDef.filter.groupIndex = -1;

        var bodyDef = new b2BodyDef;

        //create some objects
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2CircleShape(10 / WORLD_SCALE);
        bodyDef.position.x = (oPos.x + oObject.width * 4) / WORLD_SCALE;
        bodyDef.position.y = (oPos.y + oObject.height) / WORLD_SCALE;
        bodyDef.userData = oObject.info;
        var Body2 = _oWorld.CreateBody(bodyDef);
        var footFixture = Body2.CreateFixture(fixDef);

        //Weld joint for link a leg

        var jointDef = new b2WeldJointDef();
        jointDef.bodyA = Body1;
        jointDef.bodyB = Body2;

        jointDef.localAnchorA = new b2Vec2(oObject.width / WORLD_SCALE, oObject.height / WORLD_SCALE);
        jointDef.localAnchorB = new b2Vec2(0.1 / WORLD_SCALE, 0.1 / WORLD_SCALE);

        var jointFoot = _oWorld.CreateJoint(jointDef);

        return {fixture1: boxFixture, fixture2: pivotFixture, jointLeg: jointLeg, fixture3: footFixture, jointFoot: jointFoot};
    };


    this.addRectangle = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.isSensor = oObject.sensor;
        fixDef.filter.categoryBits = 0x0003;
        fixDef.filter.maskBits = 0x0001;
        fixDef.filter.groupIndex = 1;

        var bodyDef = new b2BodyDef;
        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(oObject.width / WORLD_SCALE, oObject.height / WORLD_SCALE);
        bodyDef.position.Set(oObject.x / WORLD_SCALE, oObject.y / WORLD_SCALE);
        bodyDef.angle = oObject.angle * Math.PI / 180;
        var Body1 = _oWorld.CreateBody(bodyDef);
        var crateFixture = Body1.CreateFixture(fixDef);

        return crateFixture;
    };

    this.setRotation = function (iRot) {
        this.rotation = iRot;
    };

    this._update = function (evt) {

    };

    this.init();

}