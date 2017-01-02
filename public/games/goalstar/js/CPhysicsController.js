function CPhysicsController() {
    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = Box2D.Dynamics.b2World;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2MassData = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2BeginContact = Box2D.Collision;

    var _oGravity;
    var _oWorld;
    var _oPhysicController = this;

    var _bGameStarted = false;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    this.init = function () {
        _oGravity = new b2Vec2(0, 9.81);
        _oWorld = new b2World(_oGravity, true);

        _oWorld.Step(TIME_STEP_BOX2D, ITINERATION_BOX2D, POSITION_ITINERATION_BOX2D);

        //setup debug draw
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(context);
        debugDraw.SetDrawScale(30.0);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        _oWorld.SetDebugDraw(debugDraw);

     //   window.setInterval(this.upadteDrawDebug, 1000 / 30);

    };

    this.startComputing = function (oElement) {
        oElement.GetBody().SetActive(true);
    };

    this.applyImpulse = function (oElement, oDir) {
        oElement.GetBody().ApplyImpulse(oDir, oElement.GetBody().GetWorldCenter());
    };

    this.applyForce = function (oElement, oDir) {
        oElement.GetBody().ApplyForce(oDir, oElement.GetBody().GetWorldCenter());
    };

    this.decreaseSpeedRotation = function (oElement) {
        var iNewAngularVelocity = oElement.GetBody().GetAngularVelocity() * 0.99;
        oElement.GetBody().SetAngularVelocity(iNewAngularVelocity);
    };

    this.destroyAllBody = function () {
        var b2Bodies = _oWorld.GetBodyList();
        while (b2Bodies.GetNext()) {
            var b2Body = b2Bodies.GetNext();
            _oWorld.DestroyBody(b2Body);
        }
    };

    this.destroyAllJoint = function () {
        var b2Joints = _oWorld.GetJointList();
        while (b2Joints.GetNext()) {
            var b2Joint = b2Joints.GetNext();
            _oWorld.DestroyJoint(b2Joint);
        }
    };

    this.destroyWorld = function () {
        _oWorld = null;
    };

    this.getSpeedRotation = function (oElement) {
        return oElement.GetBody().GetAngularVelocity();
    };

    this.moveObject = function (oElement, iNewX, iY) {
        var oPos = {x: iNewX / WORLD_SCALE, y: iY / WORLD_SCALE};
        oElement.GetBody().SetPosition(oPos);
    };

    this.destroyBody = function (oElement) {
        _oWorld.DestroyBody(oElement.GetBody());
    };

    this.destroyJoint = function (oElement) {
        _oWorld.DestroyJoint(oElement);
    };

    this.getJointAngle = function (oElement) {
        return oElement.GetJointAngle() * (180 / Math.PI);
    };

    this.getInstance = function () {
        if (_oPhysicController === null) {
            _oPhysicController = new CPhysicsController();
        }
        return _oPhysicController;
    };

    this.getJointTranslation = function (oElement) {
        return oElement.GetJointTranslation();
    };

    this.update = function () {
        // Update the box2d world
        _oWorld.Step(1 / 20, 3, 3);
        _oWorld.ClearForces();
    };

    this.upadteDrawDebug = function () {
        _oWorld.DrawDebugData();
    };

    this.getWorld = function () {
        return _oWorld;
    };

    this.setElementLinearDamping = function (oElement, oVel) {
        oElement.GetBody().SetLinearDamping(oVel);
    };

    this.setElementAngularVelocity = function (oElement, iVal) {
        oElement.GetBody().SetAngularVelocity(iVal);
    };

    this.setElementPosition = function (oElement, oPosLocal) {
        var oPosWorld = {x: oPosLocal.x / WORLD_SCALE, y: oPosLocal.y / WORLD_SCALE};
        oElement.GetBody().SetPosition(oPosWorld);
    };

    this.getElementPosition = function (oElement) {
        var oPos = oElement.GetBody().GetPosition();
        return {x: oPos.x * WORLD_SCALE, y: oPos.y * WORLD_SCALE, angle: oElement.GetBody().GetAngle() * 180 / Math.PI};
    };

    this.setElementAngle = function (oElement, iAngle) {
        oElement.GetBody().SetAngle(iAngle * Math.PI / 180);
    };

    this.getElementAngle = function (oElement) {
        return oElement.GetBody().GetAngle() * 180 / Math.PI;
    };

    this.getElementVelocity = function (oElement) {
        return oElement.GetBody().GetLinearVelocity();
    };

    this.setElementLinearVelocity = function (oElement, fValue) {
        return oElement.GetBody().SetLinearVelocity(fValue);
    };


    this.init();

}