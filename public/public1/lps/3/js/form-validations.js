
//Variables defined before the call of this script to define form type.
// js_restricted_countries
// ajaxURL
// enter_name_txt
if($('.country_prefix').val() == '') {
    $('.country_prefix').val($('.country :selected').attr('id'));
}

$('.country').change(function(){
    $('.tooltip_country_blocked').hide('slow');
    $('.tooltip_country').hide('slow');
    newCountry = $(this).val();
    $('.country').each(function(){
        country = $(this).val();
        if (country != newCountry) {
            $(this).val(newCountry).change();
        }
    });


    $('.country_prefix').val($('.country :selected').attr('id'));

    $('#currency').val($('.country :selected').attr('data-currency'));
});

function is_restricted_country(country){
    if (js_restricted_countries.indexOf(country) > 0)
        return true;
    return false;
}

function add_helper(inputbox,parentID) {
    $(parentID+' .'+inputbox).addClass('error');
    $(parentID+' .'+inputbox+'-helper').remove();
    $(parentID+' .'+inputbox+'-approved').remove();
    //$('.tooltip').not('.tooltip_'+inputbox).hide('slow');
    $(parentID+' .tooltip_'+inputbox).show('slow');
}

function add_approved(inputbox,parentID) {
    $(parentID+' .'+inputbox).removeClass('error');
    $(parentID+' .'+inputbox+'-helper').remove();
    $(parentID+' .'+inputbox+'-approved').remove();
    $(parentID+' .'+inputbox).after('<div class="approved '+inputbox+'-approved">✔</div>');
}

function validatemail(email) {
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[A-z]{2,4})+$/;
    return (emailReg.test(email));
}

function validateprefix(number) {
    var numberReg = /^[0-9]{1,4}$/;
    return (numberReg.test(number));
}
function validatephone(number) {
    var numberReg = /^[0-9]{1,16}$/;
    return (numberReg.test(number));
}

function validatename(name) {
    var nameReg = /^([^0-9]*)$/;
    return (nameReg.test(name));
}

function validatepass(name) {
    var nameReg = /^[!@#%&*a-z0-9]+$/i;
    return (nameReg.test(name));
}

function svalidatePass(pw){
    if (validatepass(pw) && pw.length >= 6)
        return true;
    return false;
}

function is_key_digit(key) {
    var isDigit = false;
    //console.log(key);
    //digits consists of letters because of the numpad. The numbpad's keycode is actually letters.
    digits = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','`'];
    $(digits).each(function(){
        if (this == key) {
            //console.log(this);
            isDigit = true;
        }
    });
    return isDigit;
}

// function is_key_nondigit(key) {
//     if (!is_key_digit(key)) {
//         console.log(key);
//         return true;
//     }
//     return false;
// }

function not_bot() {
    $('.ubot').each(function(){
        $(this).val(0);
    });
}
setTimeout(function(){not_bot()}, 2000);

function validateFields(clicked,fieldid) {
    ID = '#'+fieldid;
    $(ID+' .helper').remove();
    $(ID+' .required').removeClass('error');
    var error = false;
    var shortForm = false;
    if ($(ID+' .af-form-wrapper').length) {
        shortForm = true;
        // Short Form Validations only.
        if ($(ID+' .user_name').length) {
            if($(ID+' .user_name').val() == '') {
                if(clicked) {
                    error = true;
                    $(ID+' .user_name').val('');
                    $(ID+' .user_name').attr('placeholder',enter_name_txt);
                    //$('.user_name').focus();
                    $(ID+' .user_name').addClass('error empty-inp');
                }
            } else {
                $(ID+' .user_name').removeClass('empty-inp');
                if ($(ID+' .user_name').val().length < 2 || !validatename($(ID+' .user_name').val())) {
                    error = true;
                    add_helper('user_name',ID);
                    console.log(4);
                } else {
                    add_approved('user_name',ID);
                }
            }
        }

        if ($(ID+' input#firstnameHidden').length && $(ID+' input#lastnameHidden').length) {
            //split name to firstname and lastname
            var userFullName = $(ID+' input.user_name').val().split(' ');
            $(ID+' input#firstnameHidden').val(userFullName[0]); //userFullName[0] Holds First Name
            $(ID+' input#lastnameHidden').val(userFullName[userFullName.length - 1]); //userFullName.length - 1 Holds Last name
        }

    } else {

        //Long Form Validations

        if($(ID+' .first_name').val() == ''){
            if(clicked) {
                error = true;
                $(ID+' .first_name').attr('placeholder',enter_fname_txt);
                $(ID+' .first_name').addClass('error empty-inp');
            }
        } else {
            $(ID+' .first_name').removeClass('empty-inp');
            if ($(ID+' .first_name').val().length < 2 || !validatename($(ID+' .first_name').val())) {
                error = true;
                add_helper('first_name',ID);
                console.log(4);
            } else {
                add_approved('first_name',ID);
            }
        }

        if($(ID+' .last_name').val() == '') {
            if(clicked) {
                error = true;
                $(ID+' .last_name').attr('placeholder',enter_lname_txt);
                $(ID+' .last_name').addClass('error empty-inp');
            }
        } else {
            $(ID+' .last_name').removeClass('empty-inp');
            if ($(ID+' .last_name').val().length < 2 || !validatename($(ID+' .last_name').val())) {
                error = true;
                add_helper('last_name',ID);
            } else {
                add_approved('last_name',ID);
            }
        }

        if ($(ID+' .pw').length) {
            //only if PW field exists.
            if($(ID+' .pw').val() == '') {
                if(clicked) {
                    error = true;
                    $(ID+' .pw').attr('placeholder',enter_pw_txt);
                    $(ID+' .pw').addClass('error empty-inp');
                }
            } else {
                $(ID+' .pw').removeClass('empty-inp');
                if (!svalidatePass($(ID+' .pw').val())) {
                    error = true;
                    add_helper('pw',ID);
                    //disable pw2 field
                    console.log('pw not validated');
                    $(ID+' .pw2').attr('disabled','disabled');
                    $(ID+' .pw2').attr('readonly','readonly');
                } else {
                    add_approved('pw',ID);
                }
            }
        }

        if ($(ID+' .pw2').length && $(ID+' .pw').length) {
            if($(ID+' .pw2').val() == '') {
                if(clicked) {
                    error = true;
                    $(ID+' .pw2').attr('placeholder', enter_pw2_txt);
                    $(ID+' .pw2').addClass('error empty-inp');
                }
            } else {
                $(ID+' .pw2').removeClass('empty-inp');
                if ($(ID+' .pw').val() != $(ID+' .pw2').val()) {
                    error = true;
                    add_helper('pw2',ID);
                } else {
                    add_approved('pw2',ID);
                }
            }
        }

        //Country dropdown
        if ($(ID+' #country').length) {
            if(clicked) {
                if($(ID+' #country').val() == ''){
                    error = true;
                    $(ID+' #country').addClass('error empty-inp');
                }
            }
        }

        //Currency
        if ($(ID+' #currency').length) {
            if(clicked) {
                if($(ID+' #currency').val() == ''){
                    error = true;
                    $(ID+' #currency').addClass('error empty-inp');
                }
            }
        }

        //Terms
        if ($(ID+' #terms-checkbox').length) {
            if(clicked) {
                if (!$(ID+' #terms-checkbox').hasClass('checked')) {
                    $(ID+' #terms-checkbox').addClass('error');
                    //alert('Please accept Terms and Conditions');
                    add_helper('terms',ID);
                    error = true;
                }
            }
        }


        if($(ID+' .country_prefix').val() == '') {
            if(clicked) {
                error = true;
                $(ID+' .country_prefix').attr('placeholder',required_txt);
                $(ID+' .country_prefix').addClass('error empty-inp');
            }
        } else {
            $(ID+' .country_prefix').removeClass('empty-inp');
            if (!validateprefix($(ID+' .country_prefix').val())) {
                error = true;
                add_helper('country_prefix',ID);
            } else {
                add_approved('country_prefix',ID);
            }
        }

        if($(ID+' .phone_num').val() == '') {
            if(clicked) {
                error = true;
                $(ID+' .phone_num').attr('placeholder',enter_phone_txt);
                $(ID+' .phone_num').addClass('error empty-inp');
            }
        } else {
            $(ID+' .phone_num').removeClass('empty-inp');
            if(!validatephone($(ID+' .phone_num').val()) &&  $(ID+' .phone_num').val().length >= 7){
                error = true;
                add_helper('phone_num_digits',ID);
            }
            else if (!validatephone($(ID+' .phone_num').val()) ||  $(ID+' .phone_num').val().length < 7) {
                error = true;
                add_helper('phone_num',ID);
            } else {
                add_approved('phone_num',ID);
            }
        }

    } //End Long Form Validations condition


    if($(ID+' .user_email').val() == '') {
        if(clicked) {
            error = true;
            $(ID+' .user_email').attr('placeholder',enter_email_txt);
            $(ID+' .user_email').addClass('error empty-inp');
        }
    } else {
        $(ID+' .user_email').removeClass('empty-inp');
        if (!validatemail($(ID+' .user_email').val())) {
            error = true;
            add_helper('user_email',ID);
            /*} else if (clicked && !error && $(ID+' .ubot').val() == '1') {
             //User submitted the form correctly but way too fast. Goodbye.
             error = true;
             window.location.href = "http://www.forbes.com/";*/
        } else {
            if (clicked && !error && !shortForm){
                $("#loader").show();

                /* R.L - new additions form with p/w */
                userFname = $(ID+' #first_name').val();
                userLname = $(ID+' #last_name').val();
                userEmail = $(ID+' #user_email').val();
                userPhone = $(ID+' #phone_num').val();
                userCPrefix = $(ID+' #country_prefix').val();
                userCountry = $(ID+' #country').val();
                userPass = $(ID+' #pw').val();

                if ($(ID+' #currency').length) {
                    userCurrency = $(ID+' #currency').val();
                } else {
                    userCurrency = 'EUR';
                }


                if ($(ID+' #uaction').length) {

                    error = true; //Disable default action.
                    uAction = $(ID+' #uaction').val();
                    uID = $(ID+' #uid').val();
                    jQuery.ajax({
                        type: 'POST',
                        url: ajaxURL,
                        data: {action: uAction, uid: uID, fname: userFname,lname: userLname,user_email: userEmail, phone_num: userPhone, country_prefix: userCPrefix, country: userCountry, pw: userPass, currency: userCurrency},
                        success: function(result) {
                            console.log('Result: '+ result);

                            if (result == 'Success' || !isNaN(result)) {
                                $('#binarylogin #e').val(userEmail);
                                $('#binarylogin #p').val(userPass);
                                $('#binarylogin').trigger('submit');
                            } else {
                                alert('There is a problem with your registration.');
                                //$('#processing').hide();
                            }
                        },
                        async: true
                    });
                } else {
                    jQuery.ajax({
                        type: 'POST',
                        url: ajaxURL,
                        data: {action:'checkmail',user_email: $(ID+' .user_email').val(), country: $('#country').val() },
                        success: function(result) {
                            $(ID+' .tooltip_country_blocked').hide('slow');
                            if (result == 'OK') {
                                add_approved('user_email',ID);
                                warning = false;
                                $(ID+' .lead-form').submit();
                            } else if (result == 'blocked') {
                                error = true;
                                $(ID+' .tooltip_country').show('slow');
                                $('#loader').hide();
                            } else {
                                error = true;
                                //add_helper('user_email',ID);
                                //alert('A user already exists with this email address. Please select a different email address or login!');
                                $(ID+' .tooltip_existing').show('slow');
                                $('#loader').hide();
                            }
                        },
                        async:   false
                    });
                }

            }

            if (error) {
                return false;
            } else {
                //form is okay. submit.
                return true;
            }

        }
    }
    return false;
}
$('form .lead-form-submit').click(function() {

    console.log('test::');

    formParent = $(this).parents('.formWrapper');
    formParentID = formParent.attr('id');
    selCountry = $('#'+formParentID+' .country :selected').text();

    // special check for lp-zulander-hack-clean-m step 1 mobile form
    var selCountry2 = ($('.country :selected')[0].dataset).countryname;

    if (is_restricted_country(selCountry) || is_restricted_country(selCountry2)) {
        $('#'+formParentID+ ' #tooltip_country').show('slow');
        console.log('country IS NOT allowed');
        return false;
    } else {
        console.log('country is allowed');
        return(validateFields(true,formParentID));
    }
});

$('.required').blur(function() {
    formParent = $(this).parents('.formWrapper');
    formParentID = formParent.attr('id');
    EleID = formParentID;
    return(validateFields(false,EleID));
});

$('.required').change(function() {
    formParent = $(this).parents('.formWrapper');
    $(this).removeClass('empty-inp');
    formParentID = formParent.attr('id');
    EleID = formParentID;
    return(validateFields(false,EleID));
});

$('.required').keydown(function(e) {
    formParent = $(this).parents('.formWrapper');
    formParentID = formParent.attr('id');

    var neutralKey = false;
    var keyRaw = e.which || e.keyCode;
    var keyPressed = String.fromCharCode(e.keyCode);
    var keyTarget = e.target;
    var keyTargetID = $(keyTarget).attr('id');
    var isShiftKey = false;
    isShiftKey = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey;
    //console.log(isShiftKey);
    //console.log(keyTargetID);
    var neutralKeyCodes = ['8','9','46','37','39','35','36'];
    $(neutralKeyCodes).each(function(){
        if (keyRaw == this) {
            neutralKey = true;
        }
    });

    /*var digitOnlyInputs = ['country_prefix','phone_num'];
     $(digitOnlyInputs).each(function(){
     if (keyTargetID == this) {
     if ((!is_key_digit(keyPressed) && !neutralKey) || isShiftKey) {
     e.preventDefault();
     return false;
     }
     }
     });*/

    var noDigitInputs = ['first_name','last_name','user_name','awf_field_name'];
    $(noDigitInputs).each(function(){
        if (keyTargetID == this) {
            if (is_key_digit(keyPressed) && !neutralKey) {
                e.preventDefault();
                return false;
            }
        }
    });


    //special case for PW2 field
    if ($('#'+formParentID+' input#pw').length &&  $('#'+formParentID+' input#pw2').length) {
        userPW = $('#'+formParentID+' input#pw').val();
        if (svalidatePass(userPW)) {
            //console.log('Validated Password: '+userPW);
            $('#'+formParentID+' .pw2').removeAttr('disabled','disabled');
            $('#'+formParentID+' .pw2').removeAttr('readonly','readonly');
        }
    }

    flag=false;
    if ($(this).hasClass('pw2')) {
        //this is pw2 field.
        if (userPW=="") {
            $('#'+formParentID+' .pw').attr('placeholder',enter_pw_txt);
            $('#'+formParentID+' .pw').addClass('error');
            add_helper('pw2','#'+formParentID);
            flag = true;
        }
    }

    if (!flag) {
        $('#'+formParentID+' .tooltip_'+$(this).attr('id')).hide('slow');
        $('#'+formParentID+' .tooltip_existing').hide('slow');
    }
});

$('.required').keyup(function(e) {
    formParent = $(this).parents('.formWrapper');
    formParentID = formParent.attr('id');
    $(this).removeClass('empty-inp');

    if ($('#'+formParentID+' input#pw').length &&  $('#'+formParentID+' input#pw2').length) {
        //special case for PW2 field
        userPW = $('#'+formParentID+' input#pw').val();
        userPW2 = $('#'+formParentID+' input#pw2').val();
        if (svalidatePass(userPW)) {
            //console.log('Validated Password: '+userPW);
            $('#'+formParentID+' .pw2').removeAttr('disabled','disabled');
            $('#'+formParentID+' .pw2').removeAttr('readonly','readonly');
        }

        if (userPW2 == "") {
            $('#'+formParentID+' .tooltip_pw2').hide('slow');
        }
    }
});

$('.required').click(function() {
    formParent = $(this).parents('.formWrapper');
    formParentID = formParent.attr('id');
    $('#'+formParentID+' .tooltip_'+$(this).attr('id')).hide('slow');
    $('#'+formParentID+' .tooltip_existing').hide('slow');
});

$('.required').focus(function() {
    console.log('focus');
    formParent = $(this).parents('.formWrapper');
    formParentID = formParent.attr('id');
    console.log('#'+formParentID+' .tooltip_'+$(this).attr('id'));
    $('#'+formParentID+' .tooltip_'+$(this).attr('id')).hide('slow');

    $('#'+formParentID+' .tooltip_existing').hide('slow');
});

$('.phone_num').focus(function() {
    $('#'+formParentID+' .tooltip_phone_num_digits').hide('slow');
});

//prevent symbols from mobile keyboard, prevent copy/past
$(document).ready(function () {

    var isMobile = window.matchMedia("only screen and (max-width: 1024px)");
    var phone_inputs = document.querySelectorAll('#country_prefix, #phone_num');
    var name_inputs = document.querySelectorAll('#first_name, #last_name');


    var rege = /[|&;$%#!*?'"~\\\/<>()^№:@._=\[\]{}+,0-9]/;

    if (isMobile.matches) {

        if (name_inputs[0] != null) {
            for (var i = 0; i < name_inputs.length; i++) {
                name_inputs[i].addEventListener('keyup', function(e){
                    var value = this.value;
                    var space_count = ( this.value.match(/\s/g) || []).length;
                    if (rege.test(value.charAt(value.length-1)) || (space_count >= 2) ) {
                        this.value = value.substring(0, value.length-1);
                    }
                });
            }
        }
        for (var i = 0; i < phone_inputs.length; i++) {
            phone_inputs[i].addEventListener('keyup', function(e){
                var value = this.value;
                if (e.keyIdentifier == 'U+0008') {
                    return;
                }
                else {
                    if (!/\d/.test(value.charAt(value.length-1))) {
                        if (this.value == 0) {
                            this.value = "";
                        }
                        else {
                            this.value = this.value.substring(0, this.value.length-1);
                        }
                    }
                }
            });
        }
    }
    else {
        if (name_inputs[0] != null) {
            for (var i = 0; i < phone_inputs.length; i++) {
                name_inputs[i].addEventListener('keydown', function(e){
                    var space_count = ( this.value.match(/\s/g) || []).length;
                    if (rege.test(e.key) || (space_count >= 1 && /\s/g.test(e.key))) {
                        e.preventDefault();
                    }
                });
            }
            /*for (var i = 0; i < phone_inputs.length; i++) {
             phone_inputs[i].addEventListener('keydown', function(e){
             if ((e.key == 'Tab') || (e.key == 'a' && e.ctrlKey) || (e.key == 'v' && e.ctrlKey) || e.key == "Delete" || e.key == "Insert" || e.key == "Shift" || e.key == "Alt" || e.key == "Backspace" || e.key == "Control" || /[0-9]/.test(e.key)) {
             return true;
             }
             else {
             e.preventDefault();
             }
             });
             }*/
        }
    }
});


//Some aweber stuff
/*
(function() {
    var IE = /!*@cc_on!@*!/false;
    if (!IE) { return; }
    if (document.compatMode && document.compatMode == "BackCompat") {
        if (document.getElementById("af-form-1058203852")) {
            document.getElementById("af-form-1058203852").className = "af-form af-quirksMode";
        }
        if (document.getElementById("af-body-1058203852")) {
            document.getElementById("af-body-1058203852").className = "af-body inline af-quirksMode";
        }
        if (document.getElementById("af-header-1058203852")) {
            document.getElementById("af-header-1058203852").className = "af-header af-quirksMode";
        }
        if (document.getElementById("af-footer-1058203852")) {
            document.getElementById("af-footer-1058203852").className = "af-footer af-quirksMode";
        }
    }
})();
*/

