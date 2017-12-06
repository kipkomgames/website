/*
Author: Ortus IT Group
Description: WordPress CMS Visual Builder JavaScript file for Ultimate WP Counter
Version: 2.1.7
Website: http://www.OrtusIT.com
*/

var fx99 = {};
(function(fx) {
  "use strict";
  fx.apps = {};
  fx.defaults = {};
  fx.debug = ((typeof fx99debug === "boolean") ? true : false);
  if (typeof fx00 === "object") {
    for (var fx00s in fx00) {
      fx[fx00s] = fx00[fx00s];
    }
  }
  fx.is = function(thing) {
    return (typeof thing !== 'undefined') ? true : false;
  };
  if (typeof(JSON) === 'object') {
    fx.json = {
      p: function(string) {
        return (fx.is(string)) ? JSON.parse(string) : undefined;
      },
      s: function(obj) {
        return (fx.is(obj)) ? JSON.stringify(obj) : undefined;
      }
    };
  }
  if (typeof(jQuery) === "function") {
    fx.jQuery = true;
  } else {
    fx.jQuery = false;
  }
  fx.getRequest = function() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
    if (!xmlhttp && typeof XMLHttpRequest !== "undefined") {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  };
  if (fx.json && fx.ajax_url && fx.jQuery) {
    fx.ajax = function(action, data, config, file) {
      jQuery.ajax({
        //beforeSend: function(){jQuery('#ajax-fone').show();},
        url: fx.ajax_url,
        data: {
          "action": action,
          "json": fx.json.s(data),
          "cache": false
        },
        success: function(c) {
          //jQuery('#ajax-fone').hide();
          if (fx.debug) console.log(c);
          config.success(fx.json.p(c));
        }
      });
    };
  }
  fx.random = function(length, letters) {
    length = length || 3;
    letters = letters || false;
    var i = 0,
      s = "",
      r = "0123456789";
    if (letters) r = "abcdefghijklmnopqrstuwxyz012345678";
    for (i; i < length; i++) {
      s += r.charAt(Math.random() * r.length);
    }
    return s;
  };
  fx.emailvalid = function(email) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email)) return false;
    else return true;
  };
  fx.entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  fx.decodeHtmlEntity = function(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  };
  fx.encodeHtmlEntity = function(str) {
    var buf = [];
    for (var i = str.length - 1; i >= 0; i--) {
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
  };
  if (typeof fx00 === "undefined") console.error(':::: FX LOCALIZE ERROR');
  if (!fx.jQuery) console.error(':::: jQuery ERROR');
  if (!fx.json) console.error(':::: FX JSON ERROR');
  if (!fx.ajax) console.error(':::: FX AJAX ERROR');
  if (fx.debug || fx.defaults.debug) {
    setTimeout(function() {
      //				console.log( fx.apps );
    }, 2500);
  }
})(fx99);
var serialize = function(obj, prefix) {
  var str = [];
  for (var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p,
      v = obj[p];
    str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }
  return str.join("&");
};
