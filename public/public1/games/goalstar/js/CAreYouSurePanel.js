function CAreYouSurePanel(oParentContainer) {
    var _oMsgStroke;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(oBg);

        _oMsgStroke = new createjs.Text(TEXT_ARE_SURE, "50px " + FONT_GAME, "#000");
        _oMsgStroke.x = CANVAS_WIDTH / 2;
        _oMsgStroke.y = 300;
        _oMsgStroke.textAlign = "center";
        _oMsgStroke.textBaseline = "middle";
        _oMsgStroke.outline = 5;
        _oContainer.addChild(_oMsgStroke);

        _oMsg = new createjs.Text(_oMsgStroke.text, "50px " + FONT_GAME, TEXT_COLOR);
        _oMsg.x = _oMsgStroke.x;
        _oMsg.y = _oMsgStroke.y;
        _oMsg.textAlign = "center";
        _oMsg.textBaseline = "middle";
        _oContainer.addChild(_oMsg);

        _oButYes = new CGfxButton(CANVAS_WIDTH / 2 + 170, 500, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(CANVAS_WIDTH / 2 - 170, 500, s_oSpriteLibrary.getSprite('but_exit'), _oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };

    this.show = function () {
        s_oGame.unpause(false);
        _oContainer.visible = true;
    };

    this._onButYes = function () {
        s_oGame.unpause(true);
        s_oGame.onExit();
    };

    this._onButNo = function () {
        s_oGame.unpause(true);
        _oContainer.visible = false;
    };

    _oParentContainer = oParentContainer;

    this._init();
}