// jQuery cookie
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){function n(e){return e}function r(e){return decodeURIComponent(e.replace(t," "))}function i(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return s.json?JSON.parse(e):e}catch(t){}}var t=/\+/g;var s=e.cookie=function(t,o,u){if(o!==undefined){u=e.extend({},s.defaults,u);if(typeof u.expires==="number"){var a=u.expires,f=u.expires=new Date;f.setDate(f.getDate()+a)}o=s.json?JSON.stringify(o):String(o);return document.cookie=[s.raw?t:encodeURIComponent(t),"=",s.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}var l=s.raw?n:r;var c=document.cookie.split("; ");var h=t?undefined:{};for(var p=0,d=c.length;p<d;p++){var v=c[p].split("=");var m=l(v.shift());var g=l(v.join("="));if(t&&t===m){h=i(g);break}if(!t){h[m]=i(g)}}return h};s.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==undefined){e.cookie(t,"",e.extend({},n,{expires:-1}));return true}return false}});

$(document).ready(function () {

  /**
   * ########## SPOTS LEFT ##########
   */
  (function () {

    var Popup = {};
    Popup.node = $('div.LicensesLeft');
    Popup.value_node = Popup.node.find('div.N b');
    Popup.ribbon = {};
    Popup.ribbon.node = Popup.node.find('div.Bar>div.in');
    Popup.ribbon.bg = Popup.ribbon.node.children('i');

    //var Plates = {};
    //Plates.node = $('div.oNumbers');

    var Copies = 20;

    var cookie_spots_left = $.cookie('spots_left');
    if (cookie_spots_left) {
      cookie_spots_left = parseInt(cookie_spots_left);
      if (cookie_spots_left === 3) {
        Copies = 2;
      } else {
        Copies = cookie_spots_left;
      }
    }

    var SetSpotsValue = function () {
      var html = '<span class="strikeout">'+(Copies+1)+'</span> '+Copies;
      Popup.value_node.html(html);
      $('.spots-counter').html(html);

      var SpotsMin = 0,
          SpotsMax = 20,
          RibbonMin = 0,
          RibbonMax = 100,
          Percent = (Copies - SpotsMin) / (SpotsMax - SpotsMin) * (RibbonMax - RibbonMin);

      Percent = Math.round(Percent * 100) / 100;

      Popup.ribbon.node.attr('style', 'width:' + Percent + '%;');

    };


    (function () {
      var State = 0;

      var Move = function () {
        State += 3;
        if (State < 0) State += 40;
        State = State % 40;
        Popup.ribbon.bg.attr('style', 'background-position:-' + State + 'px 0px;');
        setTimeout(Move, 70);
      };

      setTimeout(Move, 70);
    }());


    var Func = function () {
      if (Copies > 3) {
        Copies--;
        SetSpotsValue();
        $.cookie('spots_left', Copies, {expires: 365});

        setTimeout(
            Func,
            30000
            //Math.round(( Math.random() * 20 + 50) * 1000)
        );
      }
    };


    (function () {
      var Popup = $('div.LicensesLeft');
      var spotsDisplayTimeout = typeof window.spotsDisplayTimeout !== 'undefined' ? window.spotsDisplayTimeout : 30000;

      SetSpotsValue();

      setTimeout(function () {
        Popup.attr('style', 'display:block;');
        setTimeout(
            Func,
            30000
            //Math.round(( Math.random() * 20 + 50) * 1000)
        );
      }, spotsDisplayTimeout);


      Popup.find('a').on('click', function (e) {
        e.preventDefault();

        var T = $(this),
            Goal = $(T.attr('href'));

        $('html,body').animate(
            {'scrollTop': Goal.offset().top},
            800
        );

      });
    }());

  }());

});