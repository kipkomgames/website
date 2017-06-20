/**
 * scripts
 */

/** store form field values */

var fields = ['name', 'email', 'user_email', 'first_name', 'last_name', 'country_prefix', 'phone_num', 'country', 'uid', 'uaction'];

function saveField(entry, fieldVal) {
    if (fieldVal != undefined && fieldVal.length > 0) {
        console.log(entry + ' =>> ' + fieldVal);
        localStorage.setItem(entry, fieldVal);
    }
}

function loadField(entry, fieldNewVal, $field) {
    if (fieldNewVal != null && fieldNewVal.length > 0) {
        console.log(entry + ' =>> ' + fieldNewVal);
        $field.val(fieldNewVal);
    }
}

function setCookie(cname, cvalue, exdays) {
    var parts = document.domain.split('.');
    if (parts.length > 2) {
        domain = '.'+ parts.slice(-2).join('.');
    } else {
        domain = '.'+ document.domain;
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires +';domain='+domain+';path=/';
}

function isUserID(userID) {
    if (!isNaN(userID) && userID > 0) {
        return true;
    }
    return false;
}

function doWithFields(fields, action) {
    if (fields.length) {

        fields.forEach(function(entry) {
            var $field = jQuery('[name=' + entry + ']');
            if ($field.length) {
                // save field value in localStorage
                if (entry == 'user_name' || entry == 'user_email') {
                    entry = 'email';
                }
                if (entry == 'pw') {
                    entry = 'password';
                }

                // save field value in localStorage
                if (action == 'save') {
                    var fieldVal = $field.val();
                    var nameComplexLength = fieldVal.indexOf(' ');
                    // split name as first_name and last_name
                    if (entry == 'name' && nameComplexLength >= 0) {
                        // save first_name
                        saveField('first_name', fieldVal.substr(0, nameComplexLength));
                        // save last_name
                        saveField('last_name', fieldVal.substr(nameComplexLength + 1));
                    }
                    // save name as first_name
                    if (entry == 'name' && fieldVal.indexOf(' ') == -1) {
                        saveField('first_name', fieldVal);
                    }
                    // save name as name, common case
                    saveField(entry, fieldVal);
                }
                // load field value from localStorage
                if (action == 'load') {

                    if (entry == 'uid') {
                        var existingUser = true;
                        userID = localStorage.getItem(entry);
                        if (!isNaN(userID) && userID > 0) {
                            //console.log('Existing User: '+userID);
                        } else {
                            //Break current form.
                            existingUser = false;
                            return;
                        }
                    } else if (entry == 'uaction') {
                        if (!existingUser) {
                            //break
                            return;
                        }
                    }
                    loadField(entry, localStorage.getItem(entry), $field);
                }
            }
        });
    }
}


function doWithFieldsperID(formid, fields, action) {
    ID = '#'+formid;
    if (fields.length) {
        fields.forEach(function(entry) {
            var $field = jQuery(ID+' [name=' + entry + ']');
            if ($field.length) {
                if (entry == 'user_name' || entry == 'user_email') {
                    entry = 'email';
                }
                if (entry == 'pw') {
                    entry = 'password';
                }

                if (action == 'save') {
                    var fieldVal = $field.val();
                    if(entry == 'country_prefix'){
                        fieldVal = $('#country_prefix option:selected').val() || $('#country option:selected').attr('id');
                    }
                    var nameComplexLength = fieldVal.indexOf(' ');
                    if (entry == 'name' && nameComplexLength >= 0) {
                        saveField('first_name', fieldVal.substr(0, nameComplexLength));
                        saveField('last_name', fieldVal.substr(nameComplexLength + 1));
                    }
                    if (entry == 'name' && fieldVal.indexOf(' ') == -1) {
                        saveField('first_name', fieldVal);
                    }
                    saveField(entry, fieldVal);
                }
                if (action == 'load') {
                    if (entry == 'uid') {
                        var existingUser = true;
                        userID = localStorage.getItem(entry);
                        if (!isNaN(userID) && userID > 0) {
                            //console.log('Existing User: '+userID);
                        } else {
                            //Break current form.
                            existingUser = false;
                            return;
                        }
                    } else if (entry == 'uaction') {
                        if (!existingUser) {
                            //break
                            return;
                        }
                    }
                    loadField(entry, localStorage.getItem(entry), $field);
                }
            }
        });
    }
}



jQuery(function () {
    var formSaved = false;
    doWithFields(fields, 'load');
    jQuery('.submit, .lead-form-submit, .signup-form-submit, [type=submit]').bind('click', function () {
        //doWithFields(fields, 'save');
        var formParentID = jQuery(this).parents('.formWrapper').attr('id');
        formSaved = true;
        doWithFieldsperID(formParentID, fields, 'save');
    });

    jQuery(window).unload(function () {
            if (!formSaved) {
                doWithFields(fields, 'save');
                //console.log('Unload Save');
            }
        }
    );
    //enforce cookie update
    addEventListener('DOMContentLoaded', function() {
        if ($('[name="lead_form"]') && $('[name="lead_form"]').length) {
            var cookieNewVal = $('[name="lead_form"]').val().split(' ').join('');
            if (cookieNewVal && cookieNewVal.length > 0) {
                document.cookie = document.cookie = 'lpslug=' + cookieNewVal + '; path=/; expires=3600';
            }
        }
    });
});

jQuery(document).ready(function(){
    jQuery('.get_responder_integrated_form').submit(function(e){
        var form_id = jQuery(this).attr('id');
        jQuery('#'+form_id).find('input[type="submit"]').attr('disabled', true);
        e.preventDefault();
        $.ajax({
            type:'POST',
            data: jQuery(this).serialize(),
            url: '/wp-content/themes/1800option/includes/ajax-handler.php',
            success: function(data, textStatus, request){
                jQuery('#'+form_id).find('input[type="submit"]').removeAttr('disabled');
				jQuery('#'+form_id).find('.get_resp_error').remove();
                //window.location.href = request.responseText;
                if(request.responseText.indexOf('get_response_integrated_form') == -1){
                    window.location.href = request.responseText;
                }else{
                    console.log(request.responseText);
                    jQuery('#'+request.responseText+' .error_get_response').append('<div class="get_resp_error"  style=" color:#dd1c1c; display: block;">' + response_message + '</div>');
                    jQuery('#'+request.responseText+' .get_resp_error').show();
                    /*jQuery(document).click(function(){
                     jQuery('#'+request.responseText+' .get_resp_error').remove();
                     })*/
                }
            }
        });
    });

    var showingSRError = false;

    jQuery('.smar_resp_integrated_form').submit(function (e) {
        srForm = $(this);
        e.preventDefault();
        jQuery.ajax({
            type: 'POST',
            data: jQuery(this).serialize(),
            url: '/wp-content/themes/1800option/lps/smart_class/ajax_hendler.php',
            success: function (data, textStatus, request) {
                //window.location.href = request.responseText;
                if (request.responseText.indexOf('smar_resp_integrated') == -1) {
                    window.location.href = request.responseText;
                } else {
                    jQuery('#tooltip_response').remove();
                    if (srForm.hasClass('sv-gen-2') && !showingSRError) {
                        jQuery('#' + request.responseText + ' .response_fieldset2').append('<div class="tooltip' +
                            ' tooltip_response tooltip_response2" id="tooltip_response2" style="display: block;">' + response_message + '</div>');
                        jQuery('#' + request.responseText + ' .response_fieldset2').show();
                        showingSRError = true;
                    } else if (!showingSRError) {
                        jQuery('#' + request.responseText + ' .response_fieldset').append('<div class="tooltip tooltip_response " id="tooltip_response" style="display: block;">' + response_message + '</div>');
                        jQuery('#' + request.responseText + ' .response_fieldset').show();
                        showingSRError = true;
                    }
                    jQuery(document).click(function () {
                        jQuery('#' + request.responseText + ' .response_fieldset').hide();
                        jQuery('#' + request.responseText + ' .response_fieldset2 .tooltip_response2').remove();
                        jQuery('#' + request.responseText + ' .response_fieldset2').hide();
                        showingSRError = false;
                    });
                }
            }
        });
    });

});

window.onload = function () {
    var cookie_expiration_days = 1;
    var cookie_name = 'users_time_zone'; //please do not change it
    var current_date = new Date();
    var cookie_value = current_date.getTimezoneOffset() / 60;
    if (cookie_value != 0) cookie_value = -cookie_value;
    if (cookie_value > 0) cookie_value = "+" + cookie_value;
    setCookie(cookie_name, encodeURIComponent(cookie_value), cookie_expiration_days);
};

(function($){
    $.fn.detachTemp = function() {
        this.data('dt_placeholder',$('<span style="display: none;" />').insertAfter( this ));
        return this.detach();
    }

    $.fn.detachTo = function(el) {
        if ($(el).length) {
            this.data('dt_placeholder',$('<span style="display: none;" />').insertAfter(el));
        } else {
            //detachTemp
            this.data('dt_placeholder',$('<span style="display: none;" />').insertAfter(this));
        }
        return this.detach();
    }

    $.fn.reattach = function() {
        console.log('Reattaching');
        if(this.data('dt_placeholder')){
            //console.log(this.first());
            //console.log(this);
            this.first().insertBefore( this.data('dt_placeholder') );
            this.data('dt_placeholder').remove();
            this.removeData('dt_placeholder');
        }
        else if(window.console && console.error)
            console.error("Unable to reattach this element "
                + "because its placeholder is not available.");
        return this;
    }
    $.fn.showTooltip = function() {
        console.log('showTooltip');
        $(this).addClass('sv-hover');
        tooltipPopup = $(this).find('.tooltip-popup');
        ttipH = tooltipPopup.outerHeight();
        inputH = $(this).parent('.fieldset').find('input').outerHeight();
        ttipOffset = (ttipH/2)-(inputH/2);
        tooltipPopup.css('top','-'+ttipOffset+'px');
    }
    $.fn.hideTooltip = function() {
        console.log('hideTooltip');
        $(this).removeClass('sv-hover');
    }
    $.fn.toggleTooltip = function() {
        console.log('toggleTooltip');
        if ($(this).hasClass('sv-hover')) {
            $(this).hideTooltip();
        } else {
            $(this).showTooltip();
        }
    }
})(jQuery);



$( document ).ready(function() {
    /* Hide Username (antibot) */
    if ($('.formWrapper .sv-skin').length) {
        $('.sv-skin [id="username"]').parent().hide();

        EmailField = $('#formfull.sv-skin [id="user_email"]');
        if (EmailField.length) {
            EmailFieldset = EmailField.parent();
            EmailFieldsetHTML = EmailFieldset.html();
            var $emailMove = $(EmailFieldset).detachTo($("#formfull.sv-skin .clear"));
            $emailMove.reattach();
        }

        /* Remove pw class from pw2 field */
        $('.sv-skin input#pw2').removeClass('pw');
        $('form.sv-skin').addClass('form-'+ActiveLang);

        /* Add Tooltip Popups */
        $('.sv-skin input#user_email,input#awf_field_email').after('<div class="tooltip-popup-wrap"><div class="tooltip-popup-icon"></div><div class="tooltip-popup">'+email_tooltip_popup_helper+'</div></div>')
        $('.sv-skin input#pw').after('<div class="tooltip-popup-wrap"><div class="tooltip-popup-icon"></div><div class="tooltip-popup">'+pw_tooltip_popup_helper+'</div></div>')

        /* Wrap Submit button with Fieldset */
        $('.sv-skin .lead-form-submit').wrap('<div class="fieldset" id="submit-fieldset"></div>');
        /* Wrap Terms with Fieldset */
        $('.sv-skin #terms').wrap('<div class="fieldset" id="terms-fieldset"></div>');

        $('.sv-skin .custom-checkbox').click(function(){
            $(this).toggleClass('checked');
            $('.sv-skin #tooltip_terms').hide('slow');
        });

        /* Tooltip Popup (Helper) positioning */
        var touchDev = false;
        $('.tooltip-popup-icon').on('touchstart', function(){
            //alert('touchstart');
            //console.log('touchstart');
            touchDev = true;
            $('.tooltip-popup-icon').not(this).parent().hideTooltip(); //remove all tooltips first except this (reset)
            $(this).parent().toggleTooltip();
        });

        $('.tooltip-popup-wrap').mouseover(function(){
            if (!touchDev) {
                //alert('mouseover');
                //console.log('mouseover');
                $(this).showTooltip();
                var unixTime = Date.now();
                $(this).attr('id','tooltip-popup-wrap-'+unixTime);
            }
        });

        $('.tooltip-popup-wrap').mouseout(function(){
            //alert('mouseout');
            //console.log('mouseout');
            $(this).hideTooltip();
        });

        //Open Account Terms URL
        if (typeof termsURL !== 'undefined') {
            $('.sv-skin #terms a').attr('href',termsURL);
            $('.sv-skin #terms a').attr('target',"_blank");
        }

        //Login URL
        // if (typeof loginURL !== 'undefined') {
        //     $('.sv-skin a#login-link').attr('href',loginURL);
        // }

        /* update/create user */
        if ($('input#uid').length && $('input#uaction').length) {
            userID = $('input#uid').val();
            if (isUserID(userID)) {
                $('input#uaction').val('apr_update_user');
            }
        }


        /* Floating Form */
        $('body.has-floating-form').on('ffopen',function(){
            //console.log('ffopening');
            ffHeight = $('#formWrapper-ff').height();
            ffHeight = ffHeight + 46;
            $('body.has-floating-form').css('padding-bottom',ffHeight+'px');
        });

        $('body.has-floating-form').on('ffclosed',function(){
            //console.log('ffclosing');
            $('body.has-floating-form').css('padding-bottom','0');
        });


    }

    //Add class for fix ltr opera bug with select element
    $('select#country,  select#currency').parent().addClass('select-parent');

    //Add default currency
    /*var currency = $('select[name="currency"]');
    if ( currency && currency.length > 0) {
        currency.val($('.country :selected').attr('data-currency'));
    }*/

});