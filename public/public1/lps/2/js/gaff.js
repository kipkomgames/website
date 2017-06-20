//<editor-fold defaultstate="collapsed" desc="jq cookie v1.4.0">
(function (e) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], e)
  } else {
    e(jQuery)
  }
})(function (e) {
  function n(e) {
    return u.raw ? e : encodeURIComponent(e)
  }

  function r(e) {
    return u.raw ? e : decodeURIComponent(e)
  }

  function i(e) {
    return n(u.json ? JSON.stringify(e) : String(e))
  }

  function s(e) {
    if (e.indexOf('"') === 0) {
      e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
    }
    try {
      e = decodeURIComponent(e.replace(t, " "))
    } catch (n) {
      return
    }
    try {
      return u.json ? JSON.parse(e) : e
    } catch (n) {
    }
  }

  function o(t, n) {
    var r = u.raw ? t : s(t);
    return e.isFunction(n) ? n(r) : r
  }

  var t = /\+/g;
  var u = e.cookie = function (t, s, a) {
    if (s !== undefined && !e.isFunction(s)) {
      a = e.extend({}, u.defaults, a);
      if (typeof a.expires === "number") {
        var f = a.expires, l = a.expires = new Date;
        l.setDate(l.getDate() + f)
      }
      return document.cookie = [
        n(t), "=", i(s), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "",
        a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""
      ].join("")
    }
    var c = t ? undefined : {};
    var h = document.cookie ? document.cookie.split("; ") : [];
    for (var p = 0, d = h.length; p < d; p++) {
      var v = h[p].split("=");
      var m = r(v.shift());
      var g = v.join("=");
      if (t && t === m) {
        c = o(g, s);
        break
      }
      if (!t && (g = o(g)) !== undefined) {
        c[m] = g
      }
    }
    return c
  };
  u.defaults = {};
  e.removeCookie = function (t, n) {
    if (e.cookie(t) !== undefined) {
      e.cookie(t, "", e.extend({}, n, {expires: -1}));
      return true
    }
    return false
  }
});
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="Utils">
var Utils = (function () {
  var queryURL = (function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
      } else if (typeof query_string[pair[0]] === "string") {
        query_string[pair[0]] = [query_string[pair[0]], pair[1]];
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    }
    return query_string;
  }());

  function getSub() {
    var affClickID = $.cookie("affClickID"),
      sub;
    if (typeof queryURL.avcs !== 'undefined' && queryURL.avcs == '1') {
      sub = '__RELPME__';
    } else if (typeof affClickID !== "undefined") {
      sub = affClickID;
    } else if (typeof queryURL.sub !== 'undefined' && queryURL.sub !== '') {
      sub = queryURL.sub;
    } else if (typeof gvars !== 'undefined' && typeof gvars.sub !== 'undefined') {
      sub = gvars.sub;
    } else {
      sub = 222;
    }
    return sub;
  }

  function generateRandomString() {
    var text = "";
    var possibleCharsStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 9; i++) {
      text += possibleCharsStr.charAt(Math.floor(Math.random() * possibleCharsStr.length));
    }
    return text;
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  return {
    getSub: getSub,
    setCookie: setCookie,
    generateRandomString: generateRandomString,
    queryURL: queryURL
  }
}());
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="Set Form Variables">
var vars = {},
  varList = {'gi': 1, 'ci': 1260, 'wl': 1, 'rd': 4, 'ap': 0, 'ae': 0, 'lg': 'en', 'sb': 0, 'so': null, 'ai': null};

$.each(varList, function (key, defaultVal) {
  if (typeof defaultVal === 'string') {
    defaultVal = "'" + defaultVal + "'";
  }
  var variable = (typeof gvars === 'undefined' || typeof gvars[key] === 'undefined') ? defaultVal : gvars[key];
  vars[key] = (typeof Utils.queryURL[key] === 'undefined') ? variable : Utils.queryURL[key];
});
vars['sub'] = Utils.getSub();
var affid = (vars.ai !== null) ? '&aid=' + vars.ai : '';
if (typeof $.cookie("signature") === 'undefined') {
  var sign = Utils.generateRandomString();
  Utils.setCookie('signature', sign, 1);
}
var urls = {
    phoneValidation: 'http://www.valaffiliates.com/api/funnel/phvalidate',
    getForm: 'http://ap.valaffiliates.com/forms/getForm',
    getGroup: 'http://www.valaffiliates.com/api/funnel/caff4?groupid=' + vars.gi + affid + '&cid=' + vars.ci,
    registerImpression: 'http://stats.valaffiliates.com/register/impression',
    registerClick: 'http://stats.valaffiliates.com/register/click'
  },
  formDivs = "#caff, #gaff, #gaff2",
  phoneField = ".bfh-phone",
  countryField = ".bfh-countries",
  brokers = "#brokers",
  caffForm = "#caffForm",
  brokerName = $("#brokerName").val();
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="Stats Tools">
var StatsTools = (function () {
  function sendImpression(cid) {
    var data = {
      q: document.referrer,
      signature: $.cookie("signature"),
      usrip: $.cookie("ip"),
      campaignid: cid
    };
    $.post(urls.registerImpression, data);
  }

  function sendClick(cid) {
    var data = {
      signature: $.cookie("signature"),
      campaignid: cid
    };
    $.post(urls.registerClick, data);
  }

  return {
    sendClick: sendClick,
    sendImpression: sendImpression
  }
}());
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="Form Related">
var Form = (function () {

  function initForm(cid) {
    StatsTools.sendImpression(cid);
    StatsTools.sendClick(cid);
    vars['ci'] = cid;
    $.post(urls.getForm, vars).done(function (res) {
      $(formDivs).html(res);
      $(".brokerHome").html('<img class="width-100 border" src="https://bbrokers.s3.amazonaws.com/homepage/' + brokerName + '.jpg" alt="broker"/>');
      $(".brokerLogo").html('<img src="https://bbrokers.s3.amazonaws.com/logo/' + brokerName + '.png" alt="broker"/>');
      $(".brokerName").html(brokerName);
      $(caffForm).find('.disabled').css({'background-color': '#A6908F', 'border-color': '#A09191'});
      $(brokers).find('img').removeClass('active');
      $(brokers).find('img[cid="' + cid + '"]').addClass('active');
      $.each($(formDivs), setupForms)
    });
  }

  function setupForms() {
    var typingTimer,
      currentForm = this,
      formId = $(this).attr("id");

    var newPhoneFieldId = $(phoneField, this).attr("id") + "_" + formId,
      newCountryFieldId = $(countryField, this).attr("id") + "_" + formId;

    $(countryField, this).attr("id", newCountryFieldId);
    $(phoneField, this).attr("id", newPhoneFieldId).attr("data-country", newCountryFieldId);
    if (typeof Utils.queryURL.a_aid !== 'undefined') {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", "a_aid");
      input.setAttribute("value", decodeURIComponent(Utils.queryURL.a_aid));
      $("#" + formId).find('form').append(input);
    }
    if (typeof Utils.queryURL.email !== 'undefined') {
      $(caffForm, currentForm).find('input[name="email"]').val(decodeURIComponent(Utils.queryURL.email))
    }
    if (typeof Utils.queryURL.affClickID !== 'undefined') {
      $(caffForm, currentForm).find('input[name="sub"]').val(decodeURIComponent(Utils.queryURL.affClickID))
    }
    if (typeof btntxt !== 'undefined') {
      $(caffForm, currentForm).find('.tradeBtn').text(btntxt)
    }

    $(countryField, this).on('change', updateHiddenPhoneInputs.bind(currentForm));
    $(caffForm, this).on('submit', phoneValidator.bind(currentForm));

    $(phoneField, currentForm).on('keyup', function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function () {
        updateHiddenPhoneInputs.call(currentForm);
        phoneValidator.call(currentForm)
      }, 150);
    });
    $(phoneField, currentForm).on('keydown', function () {
      clearTimeout(typingTimer)
    });
  }

  function updateHiddenPhoneInputs() {
    var origphone = $(phoneField, this).val();
    var p = origphone.split(/ /g);
    var pre = p[0];
    var prefix = pre.replace('+', '');
    var fullphone = origphone.replace(/ /g, '').replace('(', '').replace(')', '').replace('-', '').replace('+', '');
    var phone = fullphone.substring(prefix.length);
    $("#prefix", this).val(prefix);
    $("#phone", this).val(phone);
  }

  function phoneValidator(e) {
    if (typeof e !== 'undefined') e.preventDefault();
    var form = this;
    $.ajax({
      url: urls.phoneValidation,
      type: 'POST',
      headers: {"X-FUNN-CORS": "yes"},
      dataType: 'json',
      data: {
        'phone': $(phoneField, form).val(),
        'iso': $(countryField, form).val()
      }
    }).done(function (response) {
      if (response.status == "Success") {
        if (typeof e !== 'undefined' && $(caffForm, form)[0].checkValidity()) {
          $(caffForm, form).unbind("submit").submit();
        }
        $('.tradeBtn', form).prop('disabled', false).removeClass('disabled');
        $(phoneField, form).css({'background-color': ''});
        $('#caffForm :submit', form).css({'background-color': '', 'border-color': ''});
        if (typeof $().popover == 'function') {
          $('[data-toggle="popover"]', form).popover('hide')
        }
      } else {
        $('.tradeBtn', form).prop('disabled', true).addClass('disabled');
        $('#caffForm .disabled', form).css({'background-color': '#A6908F', 'border-color': '#A09191'});
        $(phoneField, form).css({'background-color': '#FDA4A4'});
        if (typeof $().popover == 'function') {
          $('[data-toggle="popover"]', form).popover({
            template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
          }).popover('show');
        }
      }
    })
  }

  function getGroup() {
    $.ajax({
      url: urls.getGroup,
      headers: {"X-FUNN-CORS": "yes"}
    }).done(function (list) {
      if (Object.keys(list).length === 1 && parseInt(vars.sb) === 0) {
        Form.initForm(Object.keys(list)[0]);
      } else {
        $.each(Object.keys(list), function (k, v) {
          StatsTools.sendImpression(v);
        });
        if ($(brokers).length == 0) {
          var key = Math.floor(Math.random() * Object.keys(list).length);
          Form.initForm(Object.keys(list)[key]);
        } else {
          $(brokers).html('');
          $.each(list, function (cid, brokerName) {
            $(brokers)
              .append('<div><img cid="' + cid + '" onclick="Form.initForm(' + cid + ')" src="https://s3-eu-west-1.amazonaws.com/bbrokers/logo/' + brokerName + '.png"/><br /><img class="broker" cid="' + cid + '" onclick="Form.initForm(' + cid + ')" src="https://s3-eu-west-1.amazonaws.com/bbrokers/homepage/' + brokerName + '.jpg"/></div>');
          });
        }
      }
    })
  }

  return {
    initForm: initForm,
    setupForms: setupForms,
    updateHiddenInputs: updateHiddenPhoneInputs,
    phoneValidator: phoneValidator,
    getGroup: getGroup
  }
}());
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="onReady">
$(function () {
  if (parseInt(vars.gi) === 1) {
    Form.initForm(vars.ci);
  } else {
    Form.getGroup();
  }
});
//</editor-fold>
