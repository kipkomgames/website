var ClickSpreeConfig = {
    bta: 'blackrock',
    videoDisplayMode: 'embed'
};

function ClickSpreeBootStrapReady() {
    var count = 50;
		var id = setInterval(function () {
			if (!count--) {
				clearInterval(id);
			}
			bootstrapClickSpree();
		}, 100);
}
var timingEngineTimeOut=1;//no need for timing engine so timeout after 1 millisec
var ckspCreateSeparateVideoPerOs = true;//create a difference video id for diiferent oeprating systems: android,ios and other (windows/blackberry etc)
//var ckspHeartBeatEventInterval = 5;//interval for sending heartbeat events.
var ckspHeartBeatRandMin = 35;//interval for sending heartbeat events.
var ckspHeartBeatRandMax = 55;//interval for sending heartbeat events.

var onVideoOutViewPause = false;
var enableVideoRailing = true;
if(screen.width<=650){
	var ckspRailedVideoBottom=10;
 }else{
	 var ckspRailedVideoTop=5;
 }
var ckspRailedVideoRight = 5;
 var railingOnlyOnPlay = false;//if false allow to rail on pause
var railingBeforePlay = false;//if false do not rail before play

var ckspSetVideoSizeAfterRail = true;

var isInfoToSend = false;
var isWarningsToSend = false;



(function() {
    var f = document.getElementsByTagName('script')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'clickspree/custom-style');
    s.innerText = ".cksp-ad-area{opacity:0;filter:alpha(opacity=0);box-shadow:none}body.cksp-pre-enter .cksp-ad-area{height:0}";
    f.parentNode.insertBefore(s, f);
})();
(function() {
    var f = document.getElementsByTagName('script')[0];
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//cplivestatic-hypiqqkyd.netdna-ssl.com/scripts/bootstrapper2_8eebfee2a1.js';
    f.parentNode.insertBefore(s, f);
})();