/*
Author: Ortus IT Group
Description: WordPress CMS Visual Builder JavaScript file for Ultimate WP Counter
Version: 2.1.7
Website: http://www.OrtusIT.com
*/

$ = jQuery.noConflict();
var oCounterReInit;
(function($, fx) {
  var step_server_time, wptime_time, wpcount_d, wptime, click_refresh, sv;
  wptime_time = new Date();
  wpcount_d = new Date();
  wptime = new Date();
  step_server_time = new Date();
  var data = {
    action: 'get_time'
  };

  jQuery.post(fx00.ajax_url, data, function(response) {
    step_server_time = response;
  });

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


  var app = {};
  app.s = {};
  app.v = {};
  app.v.counters = oCounter_site_x.counters;
  app.v.fonts = oCounter_site_x.fonts;
  app.v.time = oCounter_site_x.time;
  app.v.started = {};
  app.v.intervals = {};
  app.v.loadedFonts = [];
  oCounterReInit = function() { app.find(true); }
  app.init = function() {

    app.v.time = new Date(app.v.time);

    setInterval(function() {
      app.v.time.setSeconds(app.v.time.getSeconds() + 1);
    }, 1000);

    app.find();
  };
  app.find = function(reinit) {

    $("span[class^=oCounter]").each(function() {
      var key = $(this).attr("class").replace("oCounter", "");
      if (undefined !== app.v.counters[key]) {
        if (app.v.counters[key].stopautostart === false) {
          app.v.counters[key].found = true;
          app.showCounter("span.oCounter" + key, app.v.counters[key]);
        }
      }

      if (undefined !== app.v.counters[key]) {
        if (app.v.counters[key].stopautostart === true && reinit === true) {
          app.v.counters[key].found = true;
          app.showCounter("span.oCounter" + key, app.v.counters[key]);
        }
      }

    });
  };
  app.showCounter = function(block, c, replace) {
    if (c.fontFamily !== "" && app.v.fonts[c.fontFamily] !== "") {
      //  if(c.fontFamily=='Arial' || c.fontFamily=='Verdana')  c.fontFamily = 'Roboto';
      app.addFont(c.fontFamily, c.fontWeight);
    }
    replace = replace || false;
    var base = "",
      m = "",
      counter = {},
      build = [],
      target = "";
    c.wrapperOutside = block + "> #" + c.appendix + " ";
    c.start = fx.random(20, true);
    if (c.type == "text") {
      build = [{
        type: "text",
        label: ""
      }];
    }
    if (c.type == "step") {
      build = [{
        type: "step",
        label: ""
      }];
    }
    if (c.type == "click") {
      build = [{
        type: "click",
        label: ""
      }];
    }
    if (c.type == "time") {
      build = [];
      if (c.years) build.push({
        type: "years",
        label: c.labelForYears
      });
      if (c.months) build.push({
        type: "months",
        label: c.labelForMonths
      });
      if (c.days) build.push({
        type: "days",
        label: c.labelForDays
      });
      if (c.hours) build.push({
        type: "hours",
        label: c.labelForHours
      });
      if (c.minutes) build.push({
        type: "minutes",
        label: c.labelForMinutes
      });
      if (c.seconds) build.push({
        type: "seconds",
        label: c.labelForSeconds
      });
      if (c.pmFormat) build.push({
        type: "pmformat",
        label: ""
      });
    }
    if (c.type == "countdown") {
      build = [];
      if (c.days) build.push({
        type: "days",
        label: c.labelForDays
      });
      if (c.hours) build.push({
        type: "hours",
        label: c.labelForHours
      });
      if (c.minutes) build.push({
        type: "minutes",
        label: c.labelForMinutes
      });
      if (c.seconds) build.push({
        type: "seconds",
        label: c.labelForSeconds
      });
      if (c.pmFormat) build.push({
        type: "pmformat",
        label: ""
      });
    }
    target = c.wrapperOutside + "> div > .addcenter";
    m += "<div class='oWrapperRow'><div class='addtop'></div></div>";
    var cBgPadding = "";
    if (c.BgImgC !== undefined && c.BgImgC.length > 0) {
      var img = new Image();
      img.src = c.BgImgC;

      img.onload = function() {


        var imgH = img.naturalHeight + "px";
        var imgW = img.naturalWidth + "px";
        $("#" + c.appendix).css({
          'height': imgH,
          'width': imgW,
          'max-height': '100%'
        });
      }

      var k = 1;

      function conv(padd, k) {

        var s_patt = /[\D]+/i;
        var p = padd.match(s_patt);
        var d_patt = /[\d]+/i;
        var d = parseInt(padd.match(d_patt) / k);

        return d + p;

      }

      var ptop = conv(c.cTop, k) || 0,
        pright = conv(c.cRight, k) || 0,
        pbottom = conv(c.cBottom, k) || 0,
        pleft = conv(c.cLeft, k) || 0;
      cBgPadding = "margin: " + ptop + " " + pright + " " + pbottom + " " + pleft;
      var c_position = "absolute";
      var cbgimg = "; max-width:100%; background-image: url('" + c.BgImgC + "') ;background-position: center center;background-size: 100% 100%;background-repeat: no-repeat;";

    } else {
      var cbgimg = "";
      var c_position = "relative"; }
    m += "<div class='oWrapperRow cou-chars' style='position:" + c_position + ";" + cBgPadding + "'>";
    m += "<div class='addleft'></div><div class='addcenter'>" + app.build(build, c) + "</div><div class='addright'></div>";
    m += "</div>";
    m += "<div class='oWrapperRow'><div class='addbottom'></div></div>";
    var wrapper = document.createElement("div");
    wrapper.setAttribute("id", c.appendix);

    wrapper.setAttribute("class", "cbody");
    wrapper.setAttribute("style", "margin:0 auto; display: inline-block;" + cbgimg);
    // wrapper.setAttribute("style", "display: inline-block; text-align: center;");
    wrapper.innerHTML = m;
    $(block).empty().html(wrapper);
    if (c.type == "text") {

      app.v.started[c.start] = new oCounter($.extend({
        wrapper: target + " .countertextbody"
      }, c));
      var text, i;
      text = c.text.split("\n");
      var fsize = (c.fontSize) ? c.fontSize : 14;
      var wts = parseInt(fsize / 1.3);
      if (c.spaceBetweenChars === true) $(target + ">.counterBlock .oRol").css("width", wts);
      for (i in text) {
        app.v.started[c.start].show(text[i], c.pause);
      }
    }
    if (c.type == "time") {
      delete c.mask;
      c.start = {};
      c.interval = fx.random(20, true);
      app.createCountersTimeCountDown(target, c);
      var fsize = (c.fontSize) ? c.fontSize : 14;
      var wtc = parseInt(fsize / 2);
      if (c.spaceBetweenChars === true) $(target + ">.counterBlock .oRol").css('width', wtc);
      app.setCounterStyles(target, c);
      app.playTime(c);
      app.v.intervals[c.interval] = setInterval(function() {
        app.playTime(c);
      }, 1000);
    }
    if (c.type == "countdown") {
      delete c.mask;
      c.start = {};
      c.interval = fx.random(20, true);
      app.createCountersTimeCountDown(target, c);
      var fsize = (c.fontSize) ? c.fontSize : 14;
      var wtc = parseInt(fsize / 2);
      if (c.spaceBetweenChars === true) $(target + ">.counterBlock .oRol").css('width', wtc);
      app.setCounterStyles(target, c);
      app.playCountdown(c);
      app.v.intervals[c.interval] = setInterval(function() {
        app.playCountdown(c);
      }, 1000);
    }
    if (c.type == "step") {

      c.wrapper = target + " .counterstepbody";
      app.v.started[c.start] = new oCounter(c);
      var fsize = (c.fontSize) ? c.fontSize : 14;
      var wtc = parseInt(fsize / 2);
      if (c.spaceBetweenChars === true) $(target + ">.counterBlock .oRol").css('width', wtc);
      app.setCounterStyles(target, c);
      app.playStep(c);
      app.v.intervals[c.interval] = setInterval(function() {
        app.playStep(c);
      }, 1000 * parseInt(c.interval));

    }
    if (c.type == "click") {

      c.start = {};
      c.interval = fx.random(20, true);
      c.wrapper = target;
      app.v.started[c.start] = new oCounter(c);
      var fsize = (c.fontSize) ? c.fontSize : 14;
      var wts = parseInt(fsize / 1.3);

      if (c.spaceBetweenChars === true) $(target + ">.oRol").css("width", wts);

      var classButton = c.classButton || "defaultDecr";
      var textActButton = c.ActButText || "ClickMe";
      var button = '<button class="' + classButton + '" id="decr">' + textActButton + '</button>';

////////////  VOTES  //////////////////////////////////////

      var checkUser = function(action){

       var func = 'get_counter_user_data';
        if(action===true) func = 'set_counter_user_data';
        var data = {
          action: func,
          c_name: c.appendix,
          votes_var: c.votes_var
        };

        jQuery.post(fx00.ajax_url, data, function(resp) {
          console.log(resp)
          var v_mess = ( c.votes_message ) ? c.votes_message : 'You`re already voted!';
          if(parseInt(resp)===0) $('<button class="' + classButton + '" id="decr">' + textActButton + '</button>').appendTo(c.wrapperOutside + ' .cou-chars');
          // if( getCookie(c.appendix)==1 && c.votes_var==1 ) $('#decr').replaceWith( "<span class='votes-message'>" + v_mess + "</span>" );
          if(parseInt(resp)===1 ) $("<span class='votes-message'>" + v_mess + "</span>" ).appendTo(c.wrapperOutside + ' .cou-chars');
        });
      }


///---------------------------------------------------------
      if ( c.vote ){
        var v_mess = ( c.votes_message ) ? c.votes_message : 'You`re already voted!';
            if( c.votes_var ===0 ) $(button).appendTo(c.wrapperOutside + ' .cou-chars');
            if( parseInt( c.votes_var ) ===1 && parseInt( getCookie(c.appendix) )==1 ) $( "<span class='votes-message'>" + v_mess + "</span>" ).appendTo(c.wrapperOutside + ' .cou-chars');
            if( parseInt( c.votes_var ) ===1 && parseInt( getCookie(c.appendix) )!==1 ) $(button).appendTo(c.wrapperOutside + ' .cou-chars');

            if ( parseInt( c.votes_var ) ==2 || parseInt( c.votes_var )== 3 ) checkUser();
      } else  $(button).appendTo(c.wrapperOutside + ' .cou-chars');

///////////////  END VOTES ///////////////////////////////////
      app.playclick(c);

      var clickRefresh = function(){
      clearInterval(click_refresh);
      click_refresh = setInterval(function(){

        fx.ajax("sub_ocounter", {
          action: "refresh"
        }, {
          success: function(d) {
             $.each(d.counters, function(i){
            if(d.counters[i].appendix==c.appendix) {
              app.playclick( d.counters[i] );
              sv = d.counters[i].start_value_click;
            }
         });
        }
        })
          },2000);
      }
      clickRefresh();

    $('body').on('click', '#decr',function() {
        // console.log(sv);
        if(c.vote){
          checkUser(true);
           var v_mess = ( c.votes_message ) ? c.votes_message : 'You`re already voted!';
          $('#decr').replaceWith( "<span class='votes-message'>" + v_mess + "</span>" );
        }


        if(sv===undefined || sv==null) sv=c.start_value_click;

          if (c.butActHTML !== "" || c.butActJs !== "" && c.HideClick === true) {

            $(target).empty().attr('style', false).css('min-height', '40px');
            $('#decr').remove();
          }
          if (c.butActHTML !== "") {
            $(target).append(c.butActHTML);
          }
          if (c.butActJs !== "") {
            var found = c.butActJs.match(/\w+/);
            var sear = found[0];
            (window[sear]) ? eval(c.butActJs): alert('Register YourName() function in function.php');
          }

        c.start_value_click = parseFloat(sv) + parseFloat(c.interval_click);
        fx.ajax("sub_ocounter", {
          action: "save",
          "counter": c
        }, {
          success: function(d) { }
        });

        app.playclick(c);
      });
    }
    for (var action in c.events) {
      if (action == "click") {
        $(target).css({
          "cursor": "pointer"
        }).on("click", function() {
          $(this).off("click").css({
            "cursor": "auto"
          });
          if (c.events.click.action == "replace" || (typeof c.events.click.position !== "undefined" && c.events.click.position == "center")) {
            //                      console.log("REMOVED");
            if (typeof c.start === "string") {
              app.v.started[c.start].remove();
            }
            if (typeof c.start === "object") {
              for (var cc in c.start) {
                app.v.started[c.start[cc]].remove();
              }
            }
            if (app.v.intervals[c.interval]) clearInterval(app.v.intervals[c.interval]);
          }
          app.doAction(c.wrapperOutside, c.events.click);
        });
      }
    }
  };
  app.build = function(b, c) {
    var m = "",
      blockStyle = "display: inline-block;",
      labelStyles = "";
    for (var i in b) {
      labelStyles = "";
      if (c.labelsBold && c.labelsBold === true) labelStyles += "font-weight: bold;";
      if (c.labelsItalic && c.labelsItalic === true) labelStyles += "font-style: italic;";
      if (c.labelsFontSize && c.labelsFontSize !== "") {
        labelStyles += "font-size: " + c.labelsFontSize + "px; line-height: " + c.labelsFontSize + "px;";
      }
      if (c.labelsColor && c.labelsColor !== "") labelStyles += "color: " + c.labelsColor + ";";
      if (c.labelsFontFamily && c.labelsFontFamily !== "") {
        labelStyles += "font-family: " + c.labelsFontFamily + ";";
        app.addFont(c.labelsFontFamily);
      }
      m += "<div class='counterBlock' style='" + blockStyle + "'>";
      if (c.labels && c.labels === true) m += "<div class='counter" + b[i].type + "label' style='text-align: center;" + labelStyles + "'>" + b[i].label + "</div>";
      m += "<div class='counter" + b[i].type + "body' style='text-align: center;'></div>";
      m += "</div>";
    }
    return m;
  };
  app.createCountersTimeCountDown = function(target, c) {
    if (c.years) {
      c.start.years = fx.random(20, true);
      app.v.started[c.start.years] = new oCounter($.extend({
        wrapper: target + " .counteryearsbody",
        mask: "    "
      }, c));
    }
    if (c.months) {
      c.start.months = fx.random(20, true);
      app.v.started[c.start.months] = new oCounter($.extend({
        wrapper: target + " .countermonthsbody",
        mask: "00"
      }, c));
    }
    if (c.days) {
      c.start.days = fx.random(20, true);
      if (c.type == "time") {
        app.v.started[c.start.days] = new oCounter($.extend({
          wrapper: target + " .counterdaysbody",
          mask: "00"
        }, c));
      }
      if (c.type == "countdown") {
        app.v.started[c.start.days] = new oCounter($.extend({
          wrapper: target + " .counterdaysbody",
          mask: "000"
        }, c));
      }
    }
    if (c.hours) {
      c.start.hours = fx.random(20, true);
      app.v.started[c.start.hours] = new oCounter($.extend({
        wrapper: target + " .counterhoursbody",
        mask: "00"
      }, c));
    }
    if (c.minutes) {
      c.start.minutes = fx.random(20, true);
      app.v.started[c.start.minutes] = new oCounter($.extend({
        wrapper: target + " .counterminutesbody",
        mask: "00"
      }, c));
    }
    if (c.seconds) {
      c.start.seconds = fx.random(20, true);
      app.v.started[c.start.seconds] = new oCounter($.extend({
        wrapper: target + " .countersecondsbody",
        mask: "00"
      }, c));
    }
    if (c.pmFormat) {
      c.start.pmformat = fx.random(20, true);
      app.v.started[c.start.pmformat] = new oCounter($.extend({
        wrapper: target + " .counterpmformatbody",
        mask: "  "
      }, c));
    }
  };
  app.playTime = function(c) {

    var date, y, mm, d, h, m, s, pm;
    if (c.serverTime) {

        var ajData = {
          action: 'get_time',
          wp_t: true
          };

         jQuery.post(fx00.ajax_url, ajData, function(response) {
          wptime_time = response;
          });

      date = new Date(wptime_time);
    } else {
     date = app.v.time;
    }
    y = date.getFullYear();
    mm = date.getMonth() + 1;
    d = date.getDate();
    m = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    if (c.pmFormat) {
      if (date.getHours() >= 13) {
        h = ((date.getHours() - 12) < 10 ? "0" : "") + date.getHours() - 12;
      } else {
        h = (date.getHours() < 10 ? "0" : "") + date.getHours();
      }
      if (date.getHours() >= 12) {
        pm = "pm";
      } else {
        pm = "am";
      }
    } else {
      h = (date.getHours() < 10 ? "0" : "") + date.getHours();
    }
    if (c.years) {
      app.v.started[c.start.years].show(y, false);
    }
    if (c.months) {
      app.v.started[c.start.months].show(mm, false);
    }
    if (c.days) {
      app.v.started[c.start.days].show(d, false);
    }
    if (c.hours) {
      app.v.started[c.start.hours].show(h, false);
    }
    if (c.minutes) {
      app.v.started[c.start.minutes].show(m, false);
    }
    if (c.seconds) {
      app.v.started[c.start.seconds].show(s, false);
    }
    if (c.pmFormat) {
      app.v.started[c.start.pmformat].show(pm, false);
    }
    if (Object.keys(c.events).length > 0) {
      for (var event in c.events) {
        if (event == "time_interval") {
          var time_in = new Date(c.events[event].interval_start);
          var time_out = new Date(c.events[event].interval_end);
          if (date > time_in && date < time_out && !c.events[event].started) {
            c.events[event].started = true;
            app.doAction(c.wrapperOutside, c.events[event], c.interval);
          }
        }
      }
    }
  };
  app.playCountdown = function(c) {

    var todayDate, endDate, diff, d, h, m, s;
    if (!c.serverTime) {
      todayDate = app.v.time;
    } else {
      if(c.serverTime){
        var ajData = {
          action: 'get_time',
          wp_t: true
          };

         jQuery.post(fx00.ajax_url, ajData, function(response) {
          wpcount_d = response;
          });
         todayDate = new Date(wpcount_d);
      }


    }
    endDate = new Date(c.endDate);
    diff = (endDate - todayDate) / 1000;
    d = Math.floor((diff / (60 * 60 * 24)));
    h = Math.floor((diff / (60 * 60)) % 24);
    m = Math.floor((diff / 60) % 60);
    s = Math.floor(diff % 60);
    if (c.days) {
      app.v.started[c.start.days].show(d, false);
    }
    if (c.hours) {
      app.v.started[c.start.hours].show(h, false);
    }
    if (c.minutes) {
      app.v.started[c.start.minutes].show(m, false);
    }
    if (c.seconds) {
      app.v.started[c.start.seconds].show(s, false);
    }
    if (Object.keys(c.events).length > 0) {
      for (var event in c.events) {
        (function(c, e) {
          if (event == "before_end") {
            if (diff == parseInt(c.events[event].event_before)) {
              app.doAction(c.wrapperOutside, c.events[event]);
            }
          }
          if (event == "end") {
            if (diff <= 0) {
              app.doAction(c.wrapperOutside, c.events[event]);
            }
          }
        })(c, event);
      }
    }
  };
  app.playStep = function(c) {
    var todayDate, startDate, diff, toShow;

    if(c.serverTime){
      var ajData = {
        action: 'get_time',
        wp_t: true
        };

       jQuery.post(fx00.ajax_url, ajData, function(response) {
        wptime = response;
        });
       todayDate = new Date(wptime);
    }
    else { todayDate = app.v.time; }

    startDate = new Date(c.start_date);
    splitted = ("" + c.interval_step).split(".");
    if (typeof(splitted[1]) != "undefined") {
      fraction = splitted[1].length;
    } else {
      fraction = 0;
    }
    if (c.disable_step_date === undefined) c.disable_step_date = false;
    if (c.disable_step_date === false) {

      diff = Math.floor((todayDate - startDate) / parseInt(c.interval) / 1000);
      toShow = (0 + parseFloat(c.start_value) + (diff * parseFloat(c.interval_step))).toFixed(fraction);

    } else {

      var data = {
        action: 'get_time'
      };

      jQuery.post(fx00.ajax_url, data, function(response) {
        step_server_time = response;
      });


      var st = new Date(step_server_time);
      var hid = new Date(c.hid_curr_date);

      diff = Math.floor((st - hid) / parseInt(c.interval) / 1000);
      toShow = (0 + parseFloat(c.start_value) + (diff * parseFloat(c.interval_step))).toFixed(fraction);
      if (c.events['value'] !== undefined) {
        if (parseInt(toShow) >= parseInt(c.events['value'].event_value)) toShow = parseInt(c.events['value'].event_value);
      }

    }
    app.v.started[c.start].show(toShow, false);
    if (Object.keys(c.events).length > 0) {
      for (var event in c.events) {
        (function(c, e) {
          if (event == "value") {

            if (parseInt(c.events[event].event_value) == toShow) {
              app.doAction(c.wrapperOutside, c.events[event], c.interval_step);
            }
          }
          if (event == "less") {
            if (parseInt(c.events[event].event_less) > toShow && !c.events[event].started) {
              c.events[event].started = true;
              app.doAction(c.wrapperOutside, c.events[event]);
            }
          }
          if (event == "more") {
            if (parseInt(c.events[event].event_more) < toShow && !c.events[event].started) {
              c.events[event].started = true;
              app.doAction(c.wrapperOutside, c.events[event]);
            }
          }
          if (event == "time_interval") {
            var time_in = new Date(c.events[event].interval_start);
            var time_out = new Date(c.events[event].interval_end);
            if (todayDate > time_in && todayDate < time_out && !c.events[event].started) {
              c.events[event].started = true;
              app.doAction(c.wrapperOutside, c.events[event]);
            }
          }
        })(c, event);
      }
    }
  };
  app.playclick = function(c) {

    app.v.started[c.start].show(c.start_value_click, false);

    if (Object.keys(c.events).length > 0) {
      for (var event in c.events) {
        (function(c, e) {
          if (event == "end") {
                        if (parseFloat(c.start_value_click) >= parseFloat(c.end_value_click) && c.events[event].action!=="nothing") {
                            $(c.wrapperOutside).find('.addcenter').removeAttr('style').addClass('click-center');
                            $('#decr').remove();
                            app.doAction(c.wrapperOutside, c.events[event]);
                        }

                        if (parseFloat(c.start_value_click) >= parseFloat(c.end_value_click) && c.events[event].action=="nothing") {
              							app.v.started[c.start].show(c.end_value_click, false);
              						   $('#decr').remove();
                            app.doAction(c.wrapperOutside, c.events[event]);
                        }
                    }
       })(c, event);
      }
    }
  };
  app.setCounterStyles = function(target, c) {
    if (c.labelsPadding && c.labelsPadding !== "") {
      $(target + " [class*=label]").css({
        marginBottom: "" + parseInt(c.labelsPadding) + "px"
      });
    }
    var fsize = (c.fontSize) ? c.fontSize : 14;
    var wts = parseInt(fsize / 1.3);
    if (c.spaceBetweenChars === true) $(target + ">.counterBlock .oRol").css("width", wts);


    if (c.spaceBetween !== "") {
      $(target + " .counterBlock").not(":first-of-type").css({
        marginLeft: "" + parseInt(c.spaceBetween) + "px"
      });
    }
  };
  app.setEventTextStyling = function(block, event) {
    //      console.log("setEventTextStyling", event);
    var styles = {};
    for (var style in event) {
      if (style == "background" && event[style] !== "") {
        if (event[style].indexOf("gradient-") > -1) {
          block.addClass('oBackground-' + event[style].substr(9));
        } else {
          styles.background = event[background];
        }
      }
      if (style == "padding" && event[style] !== "") styles.padding = event[style];
      if (style == "margin" && event[style] !== "") styles.margin = event[style];
      if (style == "borderRadius" && event[style] !== "") styles.borderRadius = event[style] + "px";
      if (style == "font_family" && event[style] !== "") {
        styles.fontFamily = event[style];
        app.addFont(event[style]);
      }
      if (style == "font_size" && event[style] !== "") {
        styles.fontSize = event[style] + "px";
        styles.lineHeight = event[style] + "px";
        styles.height = event[style] + "px";
      }
      if (style == "bold" && event[style] === true) styles.fontWeight = "bold";
      if (style == "italic" && event[style] === true) styles.fontStyle = "italic";
      if (style == "color" && event[style] !== "") styles.color = event[style];
    }
    block.css(styles);
  };
  app.doAction = function(outside, event, interval) {

    if (event.action == "nothing") {
      clearInterval(app.v.intervals[interval]);
    }
    if (event.action != "url" && event.action != "replace" && event.position == "none") {
      console.error("Action Position none!");
      return;
    }
    if (event.action == "html") {
      $(outside + ".add" + event.position).html(fx.decodeHtmlEntity(event.html)).css({
        "display": "inline-block"
      });
    }
    if (event.action == "text") {
      $(outside + ".add" + event.position).html(fx.decodeHtmlEntity(event.text)).css({
        "display": "inline-block"
      });
      app.setEventTextStyling($(outside + ".add" + event.position), event);
    }
    if (event.action == "url") {
      if (event.link === "") {
        //              console.log("Empty Link");
        return;
      }
      if (event.blank === true) {
        window.open(event.link);
      } else {
        location = event.link;
      }
    }
    if (event.action == "show") {
      app.showCounter(outside + " > div > .add" + event.position, app.v.counters[event.counter]);
      $(outside + " > div > .add" + event.position).css({
        "display": "inline-block"
      });
      if (event.position_margin) {
        if (event.position == "top") {
          $(outside + " > div > .add" + event.position).css({
            "margin-bottom": event.position_margin + "px"
          });
        }
        if (event.position == "bottom") {
          $(outside + " > div > .add" + event.position).css({
            "margin-top": event.position_margin + "px"
          });
        }
        if (event.position == "left") {
          $(outside + " > div > .add" + event.position).css({
            "margin-right": event.position_margin + "px"
          });
        }
        if (event.position == "right") {
          $(outside + " > div > .add" + event.position).css({
            "margin-left": event.position_margin + "px"
          });
        }
      }
    }
    if (event.action == "replace") {
      app.showCounter(outside, app.v.counters[event.counter], true);
    }
  };
  app.addFont = function(f, fw) {

    if ($.inArray(f, app.v.loadedFonts) > -1) return

    app.v.loadedFonts.push(f);
    var contr = ["Arial", "Verdana"];
    var n = $.inArray(f, contr);
    var s = f.search('sans-serif');

    if (parseInt(n) > -1 || parseInt(s) > -1) return;
    var font = "<link id='oCounter-load-font-" + f + "' href='https://fonts.googleapis.com/css?family=" + f + "' rel='stylesheet' type='text/css'>";
    $("head").append(font);


  };
  $(document).on("ready", function() {
    fx.apps.oCounter_site = app;
    app.init();

  });
})(jQuery, fx99);


///////////////////////////START - DEMO JS FUNCTION/////////////////
function defaultDemo() {

  var newel = '<div id="oit_demo_modal"><p id="modal_message"><b>DemoFunction() has been called!</b><br><br><em>For example:<br>On your website this could be a MailChimp subscribe form OR any other forms to collect the users data.</em></p><button id="oit_button">OK</button></div><div class="oit-overlay"></div>';

  jQuery('body').append(newel);

  jQuery("#oit_button").css({
    'margin': '0 auto',
    'position': 'relative',
    'left': '50%',
  });

  jQuery("#oit_demo_modal").css({
    'width': '60%',
    'border-radius': '5px',
    'border': '3px solid #999',
    'background': 'rgba(170, 221, 68, 0.95)',
    'position': 'fixed',
    'top': '10%',
    'left': '20%',
    'display': 'block',
    'z-index': '99999',
    'padding': '20px 10px',
  }).show();
}

jQuery(document).ready(function() {
  jQuery("body").on('click', '#oit_button', function() {
    jQuery("body #oit_demo_modal").detach();
    // jQuery( "body .oit-overlay" ).hide();
  });
});
///////////////////////////END - DEMO JS FUNCTION/////////////////
