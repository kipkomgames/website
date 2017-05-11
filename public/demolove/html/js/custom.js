/**
 *   0. Preloader
 *   1. Function & Variables
 *   2. Owl Carousel
 *   3. Sync owl carousel
 *   4. Pgw Slider
 *   5. Menu
 *   6. Back top
 *   7. Nice scroll
 *   8. Bootstrap collapse
 *   9. Custom tab-nav
 *   10. Validate Form
 *-----------------------------------------------------------------
 **/

 
"use strict";

jQuery(document).ready(function(){
    
    var kopa_variable = {
        "contact": {
            "address": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "marker": "/url image"
        },
        "i18n": {
            "VIEW": "View",
            "VIEWS": "Views",
            "validate": {
                "form": {
                    "SUBMIT": "Submit",
                    "SENDING": "Sending..."
                },
                "name": {
                    "REQUIRED": "Please enter your name",
                    "MINLENGTH": "At least {0} characters required"
                },
                "email": {
                    "REQUIRED": "Please enter your email",
                    "EMAIL": "Please enter a valid email"
                },
                "url": {
                    "REQUIRED": "Please enter your url",
                    "URL": "Please enter a valid url"
                },
                "message": {
                    "REQUIRED": "Please enter a message",
                    "MINLENGTH": "At least {0} characters required"
                }
            },
            "tweets": {
                "failed": "Sorry, twitter is currently unavailable for this user.",
                "loading": "Loading tweets..."
            }
        },
        "url": {
            "template_directory_uri":""
        }
    };

    var map;

    jQuery(window).load(function(){
        jQuery('*').removeClass('loading');
    });

 /* =========================================================
1. Function & Variables
============================================================ */

    function setheight(getH,setH){
        var getHeight = jQuery('.video-list-1').find(getH).height(); 
        jQuery('.video-list-1').find(setH).css('height',getHeight);
    }

    function setWidth(setW,numbercol,paddingside){
        var setW = $(setW);
        var setWli = setW.find('li');
        var parentsetW = setW.parent().width();
        var Wli = parentsetW / numbercol;

        setWli.css('width',Wli);

        var setWliW = setWli.width();
        var totalW = setWliW + paddingside ;
        var setWlilength = setWli.length;
        
        setW.css('width',totalW * setWlilength + 'px');
    }

    var wWidth = jQuery(window).width();
    var windows = jQuery(window);

 /* =========================================================
2. Owl Carousel
============================================================ */

if (jQuery('.owl-carousel').length > 0) {
    Modernizr.load([{
        load: ['js/owl.carousel.min.js'],
        complete: function () {

            jQuery(".carousel-product-list").owlCarousel({

              navigation : true, 
              slideSpeed : 300,
              singleItem:true,
              pagination:false,
              navigationText:false,
              autoPlay:true
         
            });

            jQuery(".oc1").owlCarousel({
         
              navigation : true, 
              slideSpeed : 300,
              singleItem:true,
              navigationText:false,
              autoPlay:true
         
            });
        }

    }]);
}


/* =========================================================
3. Sync owl carousel
============================================================ */
 

if (jQuery('.owl-carousel').length > 0) {
    Modernizr.load([{
        load: kopa_variable.url.template_directory_uri + 'js/owl.carousel.min.js',
        complete: function() {
            var sync1 = jQuery(".kopa-sync-carousel-widget .sync1");
            var sync2 = jQuery(".kopa-sync-carousel-widget .sync2");

            sync1.owlCarousel({
                singleItem: true,
                slideSpeed: 1000,
                navigation: true,
                pagination: false,
                navigationText:false,
                afterAction: syncPosition,
                responsiveRefreshRate: 200
            });

            sync2.owlCarousel({
                items: 5,
                itemsDesktop: [1199, 5],
                itemsDesktopSmall: [979, 3],
                itemsTablet: [768, 2],
                itemsMobile: [479, 2],
                navigation: false,
                pagination: false,
                navigationText:false,
                responsiveRefreshRate: 100,
                afterInit: function(el) {
                    el.find(".owl-item").eq(0).addClass("synced");
                }
            });

            function syncPosition(el) {
                var current = this.currentItem;
                jQuery(".sync2").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
                if (jQuery(".sync2").data("owlCarousel") !== undefined) {
                    center(current)
                }
            }
            jQuery(".sync2").on("click", ".owl-item", function(e) {
                e.preventDefault();
                var number = jQuery(this).data("owlItem");
                sync1.trigger("owl.goTo", number);
            });

            function center(number){
                var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
                var num = number;
                var found = false;
                for(var i in sync2visible){
                  if(num === sync2visible[i]){
                    var found = true;
                  }
                }
             
                if(found===false){
                  if(num>sync2visible[sync2visible.length-1]){
                    sync2.trigger("owl.goTo", num - sync2visible.length+2)
                  }else{
                    if(num - 1 === -1){
                      num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                  }
                } else if(num === sync2visible[sync2visible.length-1]){
                  sync2.trigger("owl.goTo", sync2visible[1])
                } else if(num === sync2visible[0]){
                  sync2.trigger("owl.goTo", num-1)
                }
                
            }

           

            function negative(element){
                 var height = 0;
                jQuery(element).find('.entry-item header').each(function(){
                    if(jQuery(this).height() > height ){
                        height = ((jQuery(this).height() + 20)*-1) + 'px';
                    }
                });

                jQuery(element).css('margin-top',height);
            }

            function newvertical(elementa){
                var owlbutton = jQuery('.sync1').find(elementa);
                var owlgetHeight = jQuery('.sync1').find('.entry-thumb img').height();
                var newtop = (owlgetHeight / 2 ) - 30 + 'px';
                var $this = jQuery(this);

                owlbutton.css('top',newtop);
            }

            windows.ready(function(){
                setTimeout(function(){
                    negative('.sync2');   
                    newvertical('.owl-buttons div');
                },400);    
            });

            windows.on('resize',function(){
                setTimeout(function(){
                    negative('.sync2');   
                    newvertical('.owl-buttons div');
                },200);
            });
        }
    }]);

    
}


 /* =========================================================
4. Pgw Slider
============================================================ */

if (jQuery('.pgw-slider').length > 0) {
    Modernizr.load([{
        load: ['js/pgwslider.min.js'],
        complete: function () {

            jQuery(".ps1").pgwSlider({
              autoSlide:true
            });
                        
            
            jQuery('.ps-list').wrap('<div class="wrap-ps-list clearfix"></div>');
            

            function pgwCustom(){
                if(wWidth >=700){
                        setheight('.ps-current','.ps-list');
                    }else if (wWidth >=500 && wWidth <700){   
                        setWidth('.ps-list',3,10);
                    }else{   
                        setWidth('.ps-list',2,10);
                    }
            }

            jQuery('.ps-current').find('img').load(function(){
                setTimeout(function(){

                    pgwCustom();

                    jQuery('.ps-list').find('li').hover(function(){
                        jQuery(this).css('opacity','1');
                    },function(){
                        jQuery(this).css('opacity','0.6');
                    });
                },200);
            });
            

            jQuery(window).resize(function(){
                setTimeout(function(){
                    wWidth = jQuery(window).width();
                    pgwCustom();
                },200);
            });
        }
    }]);
}

 /* =========================================================
5. Menu
============================================================ */  

          var overlay = jQuery('.overlay');
        var wraphumberger = jQuery('.wrap-humberger-menu');
         var mainMenu = jQuery('.main-menu,.main-humberger-menu');

    Modernizr.load([{
        load: ['js/superfish.js'],
        complete: function () {

            jQuery('ul.sf-menu').superfish(); 
            jQuery('.main-humberger-menu').superfish({
                animation: {height:'show'}, 
                delay: 1200 
            });

        }
    }]);

    Modernizr.load([{
        load: ['js/jquery.navgoco.min.js'],
        complete: function () {

            jQuery('ul.navgoco,.main-humberger-menu').navgoco({accordion: true});

        }
    }]);

      jQuery(window).resize(function(){
        wWidth = jQuery(window).width();
        if(wWidth > 992){
            jQuery('.main-menu.navgoco').removeAttr('style');
        }
      });

    jQuery('.main-menu > li').hover(function() {
        jQuery(this).find('.megamenu-main').stop().fadeIn();
    }, function() {
        jQuery(this).find('.megamenu-main').stop().fadeOut();
    });


    jQuery('.toggle-humberger-menu').click(function(){
        wraphumberger.addClass('translate-in');
        overlay.fadeIn(500);
    });
    jQuery('.close-humberger-menu,.overlay').click(function(){
        overlay.fadeOut(500);
        wraphumberger.removeClass('translate-in');
    });
    
    jQuery('.toggle-main-menu').click(function(){
        mainMenu.stop().slideToggle();
        jQuery(this).find('a').toggleClass('toggle-main-menu-style');
    });



 /* =========================================================
6. Back top
============================================================ */  
    
    var backtop = jQuery('#back-top');

    jQuery(window).scroll(function(){

        var scrollBottom = jQuery(document).height() - jQuery(window).height() - jQuery(window).scrollTop();

        if(jQuery(this).scrollTop() >300){
            backtop.fadeIn();
            if(scrollBottom <= 60){
                backtop.css('bottom','60px');
            }else{
                backtop.css('bottom','0');
            }
        }else{
            backtop.fadeOut();
        }
    });

    backtop.click(function(){
        jQuery('body,html').animate({scrollTop:0},800);
    });

 /* =========================================================
7. Nice scroll
============================================================ */

    Modernizr.load([{
        load: ['js/jquery.nicescroll.js'],
        complete: function () {

            $(".ps-list").niceScroll({
                cursorcolor:"#252427",
                cursorwidth: '12px',
                background:'#3c3a3f',
                cursorborder: 'none',
                autohidemode: false, 
                cursorborderradius:'0px',
            });

        }
    }]);

/* =========================================================
8. Bootstrap collapse
============================================================ */

var panel_titles = jQuery('.panel-title a');
    panel_titles.addClass("collapsed");
    jQuery('.panel-heading.active').find(panel_titles).removeClass("collapsed");
    if (panel_titles.length > 0) {
        panel_titles.click(function() {
            parent = jQuery(this).attr('data-parent');
            //ACCORDION
            if (undefined !== parent) {
                var obj_actived = jQuery(parent).find('.panel-heading.active');
                obj_actived.removeClass('active');
                obj_actived.find('span.b-collapse').html('+');
                if (jQuery(this).hasClass('collapsed')) {
                    jQuery(this).parents('.panel-heading').addClass('active');
                    jQuery(this).find('span.b-collapse').html('-');
                } else {
                    jQuery(this).parents('.panel-heading').removeClass('active');
                    jQuery(this).find('span.b-collapse').html('+');
                }
            } else {
            //TOGGLE
                parent = jQuery(this).parents('.panel-heading');
                if (parent.hasClass('active')) {
                    parent.removeClass('active');
                    jQuery(this).find('span.b-collapse').html('+');
                } else {
                    parent.addClass('active');
                    jQuery(this).find('span.b-collapse').html('-');
                }
            }
        });
    }

 /* =========================================================
Toggle
============================================================ */
 
 jQuery('#toggle .collapse').collapse({
  toggle: false
});  


/* =========================================================
9. Custom tab-nav
============================================================ */

    var btnTab = jQuery('.tabs-2').find('.widget-title');

    jQuery(btnTab).click(function(){
        $(this).parent('.tabs-2').find('.nav-tabs').toggleClass('toggleTab');
    });

/* =========================================================
10. Validate Form
============================================================ */


    /*--- contact form ---*/

    if (jQuery('.contact-form').length >0) {
        Modernizr.load([
          {
            load:['js/jquery.form.js','js/jquery.validate.js'],
            complete: function () {
                jQuery('.contact-form').validate({
                    // Add requirements to each of the fields
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        phone: {
                            required: true,
                            phone: true
                        },
                        message: {
                            required: true,
                            minlength: 10
                        }
                    },
                    // Specify what error messages to display
                    // when the user does something horrid
                    messages: {
                        name: {
                            required: "Please enter your name.",
                            minlength: jQuery.format("At least {0} characters required.")
                        },
                        email: {
                            required: "Please enter your email.",
                            email: "Please enter a valid email."
                        },
                        phone: {
                            required: "Please enter your phone.",
                            url: "Please enter a valid phone."
                        },
                        message: {
                            required: "Please enter a message.",
                            minlength: jQuery.format("At least {0} characters required.")
                        }
                    },
                    // Use Ajax to send everything to processForm.php
                    submitHandler: function(form) {
                        jQuery("#input-submit").attr("value", "Sending...");
                        jQuery(form).ajaxSubmit({
                            success: function(responseText, statusText, xhr, jQueryform) {
                                jQuery("#response").html(responseText).hide().slideDown("fast");
                                jQuery("#input-submit").attr("value", "Submit");
                            }
                        });
                        return false;
                    }
                });
            }
          }
        ]);
    };

    /*--- comment form ---*/

    if (jQuery('#comments-form').length >0) {
        Modernizr.load([
          {
            load:['js/jquery.form.js','js/jquery.validate.js'],
            complete: function () {
                jQuery('#comments-form').validate({
                    // Add requirements to each of the fields
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        phone: {
                            required: true,
                            phone: true
                        },
                        message: {
                            required: true,
                            minlength: 10
                        }
                    },
                    // Specify what error messages to display
                    // when the user does something horrid
                    messages: {
                        name: {
                            required: "Please enter your name.",
                            minlength: jQuery.format("At least {0} characters required.")
                        },
                        email: {
                            required: "Please enter your email.",
                            email: "Please enter a valid email."
                        },
                        phone: {
                            required: "Please enter your phone.",
                            url: "Please enter a valid phone."
                        },
                        message: {
                            required: "Please enter a message.",
                            minlength: jQuery.format("At least {0} characters required.")
                        }
                    },
                    // Use Ajax to send everything to processForm.php
                    submitHandler: function(form) {
                        jQuery("#input-submit").attr("value", "Sending...");
                        jQuery(form).ajaxSubmit({
                            success: function(responseText, statusText, xhr, jQueryform) {
                                jQuery("#response").html(responseText).hide().slideDown("fast");
                                jQuery("#input-submit").attr("value", "Submit");
                            }
                        });
                        return false;
                    }
                });
            }
          }
        ]);
    }; 

});








