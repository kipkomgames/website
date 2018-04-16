// ** I18N
Calendar._DN = new Array
("Sunday",
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday",
 "Sunday");
Calendar._MN = new Array
("January",
 "February",
 "March",
 "April",
 "May",
 "June",
 "July",
 "August",
 "September",
 "October",
 "November",
 "December");

// tooltips
Calendar._TT = {};
Calendar._TT["TOGGLE"] = "Toggle first day of week";
Calendar._TT["PREV_YEAR"] = "Prev. year (hold for menu)";
Calendar._TT["PREV_MONTH"] = "Prev. month (hold for menu)";
Calendar._TT["GO_TODAY"] = "Go Today";
Calendar._TT["NEXT_MONTH"] = "Next month (hold for menu)";
Calendar._TT["NEXT_YEAR"] = "Next year (hold for menu)";
Calendar._TT["SEL_DATE"] = "Select date";
Calendar._TT["DRAG_TO_MOVE"] = "Drag to move";
Calendar._TT["PART_TODAY"] = " (today)";
Calendar._TT["MON_FIRST"] = "Display Monday first";
Calendar._TT["SUN_FIRST"] = "Display Sunday first";
Calendar._TT["CLOSE"] = "Close";
Calendar._TT["TODAY"] = "Today";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "dd.mm.y";
Calendar._TT["TT_DATE_FORMAT"] = "D, M d";

Calendar._TT["WK"] = "wk";

var DateTimeFormat = 'dd.MM.yyyy HH:mm';
$(function () {
    $.format.locale({
        date: {
            format: 'dd.MM.yyyy',
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            daysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            timeFormat: 'hh:mm tt',
            shortDateFormat: 'dd.MM.yyyy',
            longDateFormat: 'dddd, MMMM dd, yyyy'
        },
        number: {
            format: '#,###.00',
            groupingSeparator: ' ',
            decimalSeparator: '.'
        }
    });
});

(function ($) {
    var defaults = {
        num_edge_entries: 1
        , ellipse_text: "..."
        , prev_text: "<<"
        , next_text: ">>"
    };

    var old = $.fn.pagination
    $.fn.pagination = function (maxentries, opts) {
        old.call(this, maxentries, $.extend(defaults, opts));
    };
})(jQuery);

var STR_INCORRECT_FORMAT = "Incorrect format: ";
var STR_DATE_FORMAT = "dd.mm.yyyy";
var STR_DATE_FORMAT_2 = "ddmmyyyy";
var STR_AMOUNT_FORMAT_DESC = "From 1 to 11 digits, decimal point or comma, from 0 to 2 digits. \nExamples: '123,45', '6.15', '0.1'";
var STR_AMOUNT_RESTRICTION = "Amount cannot be negative or zero."
var STR_AMOUNT_RESTRICTION_FROM = "Amount cannot be less than";
var STR_AMOUNT_RESTRICTION_BETWEEN = "The amount should be between {0} and {1}";
var STR_AMOUNT_RESTRICTION_FROM_REQUESTS = "Preliminary application for cash withdrawal is not required for amounts less than {0} ";
var STR_YES = "Yes";
var STR_NO = "No";

var STR_LOADING = "LOADING";

var STR_INVALID_NUM_MVTS = "Invalid number of movements. Must be 1 or 2.";
var STR_AT_LEAST_1_ACC = "Please, select at least 1 account.";
var STR_ONLY_1_ACC = "Please, select only 1 account.";
var STR_ONLY_1_ACC_PAYEE = "Please, select only 1 account.";
var STR_ONLY_1_TEMPL = "Please, select only 1 template.";
var STR_ONLY_1_CNTR = "Please, select only 1 country";
var STR_ONLY_1_TYPE = "Please, select only 1 payment type";
var STR_CHOOSE_BANK_CLIENT = "Please choose bank client.";
var STR_CHOOSE_CATEGORY = "Please choose category.";

var STR_MUST_SEL_BAE = "You must select a BAE.";
var STR_MUST_SEL_OPCENTER = "You must select bank branch";
var STR_MUST_SEL_POSTCODE = "You must select postal code.";
var STR_CHOOSE_CLIENT_LOAN = "Please select loan";
var STR_PLEASE_CHOOSE = "Please choose {0}."

var STR_MUST_SEL_WDAY = "You must select a weekday.";
var STR_MUST_SEL_MDAY = "You must select a monthday.";
var STR_MUST_SEL_MONTH = "You must select a month.";

var STR_SAME_BAES = "RINGS cannot be selected for transfers in the bank.";
var STR_ORDER_100000_WARN = "This order with amount greater than 100 000 must become RINGS.";
var STR_ORDER_100000_ASK = "Payments with amount greater than 100 000 BGN will be processed as RINGS. Are you sure you want to proceed?";

var STR_INV_NOTIF_NAME = "Invalid name.";
var STR_INV_SUBSCR_NAME = "Invalid name.";

var STR_INV_NOTIF_FROM_AMT = "Invalid from amount";
var STR_INV_NOTIF_TO_AMT = "Invalid to amount";

var strLang="en-US";
var STR_RINGS="Are you sure for RINGS payment?";
var STR_BISERA_CHECK = "Incorrect Bisera system symbol, replaced by '?'. Please, check the entered data.";

var STR_NO_CAPICOM = "Your browser dosnt support digital signatures!";
var STR_CONFIRM = "Are you sure?";
var STR_FOREIGN_CORRBANK = "Enter name, city and country of the correspondent bank or BIC code";
var STR_FOREIGN_PAYEEBANK = "Enter name, city and country of the beneficiary's bank or BIC code";

var STR_INTERNAL_FOREIGN = "Both accounts have to be with same currencies";
var STR_EXPENSES = "All expenses are for the payer";
var STR_DIRTYMONEY = "Please, fill in origin of money";
var STR_NO_DAYS_CHOSEN  = "You have not chosen any days.";
var STR_NO_MONTHS_CHOSEN = "You have not chosen any months.";
var STR_NO_NUMBER_CHOSEN = "You must enter a valid number.";
var STR_NO_ACC_CHOSEN = "No accounts chosen.";
var STR_ONLY_ONE_ACCEPTED = "Only One movement accepted for SMS.";

var STR_NOTBGN_ACCOUNT = "Payee account must be in BGN.";
var STR_NOTBUDGET_ACCOUNT = "Account number has to start with 5 or 3.";
var STR_NOTBGN_ACCOUNT_PR = "Payer account must be in BGN.";
var STR_WRONG_ACCOUNTS = "You have choosen invalid accounts.";
var STR_WRONG_INPUT = "Incorrect input.";
var STR_WRONG_LIMIT = "Invalid limit entered.";

var STR_CHECK_CONFIRM = "Please confirm";
var STR_LESS_OR_EQUAL = " have to be less or equal to ";

var STR_MUST_SEL_BIC = "Please, choos BIC code.";
var STR_DATE_WRONG_PERIOD="Wrong Period";
var STR_STAT_FORM_COUNTRY = "For foreign party country can not be Bulgaria!";
var STR_LIABILITY_PERSON = "Obliged person name is empty! Payer name will be used.";
var STR_DATE_DAY="Invalid day";
var STR_DATE_MONTH="Invalid month";
var STR_DATE_YEAR="Please enter a valid 4 digit year between";
var STR_DATE_AND=" and ";
var STR_EMPTY_LOGIN="Please enter user name and password.";
var STR_EMPTY_FILE="No file selected.";
var STR_FILE_MAX_128="The name of the file, must not exceed 128 symbols.";

var STR_10K_FX="Orders for foreign currency exchange by negotiated rate are accepted for amounts over 10,000 EUR or equivalance.";

var STR_BulbankPayee_SAMEDAY_DocFCCY="Internal foreign currency payments must be with beneficiary value date - SAMEDAY.";
var STR_TEXT_MIN_SYMBOLS = " required symbols between ";
var STR_CST_FRM_HOUR_LIST_EMPTY = "The certain hours list is empty.";
var STR_CST_FRM_CHOOSE_ACC = "Please choose an account.";

var STR_CCY_RESTRICTION = "Please, select currency.";
var STR_UEP_REQUEST_FOREIGN_EGN = " Value meets requirements for EGN, please use EGN field - option Bulgarian.";

var STR_STANDING_CANCEL_SURE = "Are you sure you want to cancel this recurrent payment?";
var STR_STANDING_CANCEL_EDIT_SURE = "Are you sure you want to cancel the edit on this recurrent payment?";
var STR_STANDING_DELETE_SURE = "Are you sure you want to delete this recurrent payment?";

var STR_BULGARIA = "Bulgaria";

var STR_ALERT_LOGOUT = "We recommend you to click on 'Logout' button before closing your browser. Otherwise your user session will remain active.\nAre you sure you want to close your browser and leave your current session active?";

var STR_INVALID_IBAN_STRUCTURE = "IBAN is invalid for the selected country";
var STR_INVALID_IBAN_CONTROL_NUMBER = "Invalid IBAN control number";
var STR_INVALID_SWIFT_CODE = "SWIFT code is invalid for the selected country";

var STR_ACCOUNT_RESTRICTION = "Please, select account.";
var STR_CARD_TYPE_RESTRICTION = "Please, select a card type";

var STR_GLOBUL_NO_AMOUNT = "You do not have any due amount to repay.";
var STR_GLOBUL_HAVE_AMOUNT = "You are not allowed to pay in advance - you have a due amount to repay.";

var STR_GLOBUL_LESS_AMOUNT = "You can not pay - not enough money.";
var STR_GLOBUL_MUCH_AMOUNT = "You can not pay - too much money.";
var STR_GLOBUL_MUST_CHECK = "Please check your debt.";
var STR_MUST_SEL_SEX = "Please, select your sex.";
var STR_MUST_SEL_CITIZENSHIP = "Please, select your citizenship.";
var STR_MUST_SEL_ACC_REGIME = "Please indicate the regime to account Bulbank Online.";
var STR_MUST_SEL_SALARY_REGIME = "Please specify the mode of salary.";
var STR_LOANS_MAX_MONTHS = "Maximum term of 10 years (120 months).";
var STR_LOANS_ON_ROW = "line";
var STR_LOANS_MAX_DAY = "Please select the day of the month from 1-29";

var STR_AJAX_ERROR = "There was an error";
var STR_ERROR = "Error";
var STR_BGNAME = "Bulgaria";

//payments
var ID_STR_ORDER_DELETE_QUESTION = "Are you sure, you want to cancel payment?";
var ID_STR_ORDER_NOT_SIGNED = "Order could not be signed";
var ID_STR_ORDER_NOT_SENT = "Order could not be sent";
var ID_STR_UPLOAD_ERROR = "Грешка при обработването на файла";
var STR_SIGNATURE_NOT_NEEDED = "Your signature is not required. The payment may be sent";
var ID_STR_PLAESE_FILL_SOCIAL_SECURITY_DECLARATION = "Please, fill in the Declaration under Art. 7, para. 9 of the Social Security Code";
var STR_ERR_STAND_PERIODICITY_MISS = "Recurrent payment cannot be saved. Missing periodicity!";
var STR_ERR_STAND_PRIORITY_MISS = "Recurrent payment cannot be saved. Missing priority!";
var STR_ERR_STAND_DATE_MISS = "Recurrent payment cannot be saved. Missing Execute Date!";
var STR_ERR_STAND_NAME_MISS = "Recurrent payment cannot be saved. Missing Short Name!";
var STR_ERR_IBAN_BAE = "Incorrect IBAN - invalid Bank identifier";
var STR_REQUIRED_FIELD = "Field is required.";
var STR_NO_CERT_IN_BBO = 'You do not have a certificate that is registered for using in Bulbank Online.  For more information visit the "Certificates" page.';
var STR_NO_CERT_IN_BBO_BUT_CAN_SEND = 'The payment does not need to be signed.  In order to send it, please click on the "Send now" link.';
var STR_NO_CERT_IN_BROWSER = 'The certificate you registered for using in Bulbank Online could not be found in your browser.';
var STR_INCORRECT_INPUTS_DEFAULT_MSG = 'The data you have entered in the marked fields is incorrect. Please check them again.';

var ID_STR_STANDING_EXECUTE_DATE_ERROR = 'Execution date cannot be before ';
var STR_LOANS_MAX_DAY = "Please select the day of the month from 1-29";

var STR_EDIT_PACKET_PAYMENT_AT_LEAST_ONE_PACKET = "At least one payment from the packet must be sent to the Bank. ";
var STR_CANCEL_PACKET_PAYMENT_AT_LEAST_ONE_PAYMNET = "Please choose at least one payment for cancelation.";

var STR_BIC_RESTRICTION = "Payer's accounts must be from the same bank.";
var STR_MUST_SEL_CHANNEL = "Please select a channel.";

var STR_CHARGES_ACCOUNT_PAYER_ACCOUNT = "Account for bank charges should be different from the payer's account.";
var STR_FILE_CANNOT_BE_READ_IE = "File cannot be read. Please check your browser settings, according to Instruction for certificates usage in Internet Explorer.";
var STR_FILE_INCORRECT_ENCODING = "Bad file format! Fail must begin with symbol - '{'. Check if you have chosen correct format.";

var STR_EXPIRE_PMTDATE_CAN_NOT_BE_SENT = "Payment cannot be sent. ";
var STR_CERT_INSTALL_SUCCESSFULLY = "Certificate installation completed successfully.";
var STR_CERT_ALREADY_INSTALLED = "An error occurred during the installation of your certificate.";

var ID_STR_CAPICOM_JS_DoSign_confirm = "Do you want to sign with your client certificate";
var STR_ERROR_WHILE_UPLODAING_FILE = "An error occurred while loading the file. Please check your browser settings.";

var STR_ERROR_ADV_SPL_CHOOSE_CLIENT = "Please choose client";
var ID_STR_ERR_SEBRA_CREATE = "You do not have rights to create SEBRA payment!";

var STR_RESULTS_PER_PAGE = "Results per page:";
var STR_ALL = "All";
var STR_ARE_YOU_SURE = "Are you sure you want to continue?";
var STR_ARE_YOU_SURE_MOVE_WHITE_TO_BLACK_LIST = "Are you sure that you want all your accounts from the White list to be moved to the Black list?";
var STR_MUST_SEL_OPTION = "You must select one of the options";

var ID_STR_CLOSE = "Close";

var ID_STR_VALID_EMAIL = "Please enter a valid e-mail";
var ID_STR_NUMBER_POSITIVE = "Please enter a positive integer";
var ID_STR_PLEASE_ENTER = "Please enter the";
var ID_STR_PLEASE_CHOOSE = "Please select";
var ID_STR_SIGN_CANCEL = "Signing canceled."
var ID_STR_PLEASE_CHOOSE_CARD = "Please choose a card.";
var ID_STR_OS_VERSION_NEWER = " or later";
var ID_STR_SESSION_EXPIRED = "Session expired!";

var STR_DUPLICATE_IBAN = "Duplicate IBAN ";
var STR_CHOOSE_COLLATERALAACOUNT_IBAN = "Моля, отбележете отметката 'Парични средства налични по сметка на обезпечителя'";
var STR_CHOOSE_IBAN_CHECKBOX = "Моля, отбележете чекбокса за IBAN";
var STR_PRINT_BUTTON = "Print";
var STR_MAX_DAYS_PERIOD = "Please enter a period less than or equal to {0} days.";
var STR_NUMBER_OF_FILES_ERR = "Total number of attachments exceeds: ";
var ID_STR_CERT_INVALID = "You have chosen an invalid certificate";

jQuery.extend(jQuery.validator.messages, {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

var ID_STR_MOBILE_SERVICES_ACTIVATION_CONFIRM = "Are you sure you want to activate the service {0}, for device {1}?";
var ID_STR_MOBILE_SERVICES_DEACTIVATION_CONFIRM = "Are you sure you want to deactivate the service {0}, for device {1}?";
var ID_STR_MOBILE_SERVICES_REDISTRIBUTE_CONFIRM = "Are you sure you want to redistribute the service {0}, for device {1}?";
var ID_STR_MOBILE_SERVICES_SUSPEND_CONFIRM = "Are you sure you want to suspend the service {0}, for device {1}?";
var ID_STR_MOBILE_SERVICES_UNSUSPEND_CONFIRM = "Are you sure you want to unsuspend the service {0}, for device {1}?";
var ID_STR_MOBILE_SERVICES_DELETE_DEVICE_CONFIRM = "Are you sure you want to delete device {1}?";
var ID_STR_AUTHORIZATION_MEANS_ACTIVATION = "Current signing method is: {0}";
var ID_STR_AUTHORIZATION_MEANS_CHANGED = "Signing method has been changed to: {0}";
var ID_STR_FCCY_PAYMENT_TYPE_MESSAGE = "URGENT means priority processing, with additional charge."
var ID_STR_PAYEE_CITY_COUNTRY_VALIDATION = "Общата дължина на град и държава на бенефициент трябва да е под 35 символа.";
var ID_STR_CHECK_ALL_CHECKBOXES_TRADER = "Please check all checkboxes";
var ID_STR_SWIFT_SYMBOLS_ERROR_MSG = "Invalid Swift characters : ";
var ID_STR_INVALID_SYMBOLS_ERROR_MSG = "Invalid characters : ";

var ID_STR_TRADER_IN_LEVA_CONFIRMATION_MSG = "The amount of your order exceeds BGN {0}.Press OK to proceed with your order.Press Cancel to modify your order";
var ID_STR_CARD_SUSPENDTEXT = "Not active";
var ID_STR_CARD_UNSUSPENDTEXT = "Active";
var ID_STR_CARD_BLOCKCARDCONFIRMATION = "Do you want to lock this card?";
var ID_STR_CARD_UNBLOCKCARDCONFIRMATION = "Do you want to unlock this card?";
var ID_STR_CONFIRM = "Confirm";
var ID_STR_CANCEL = "Cancel";
var ID_STR_CARDLOCKTITLE = "Card change status";
var ID_STR_CARD_SUSPEND_TOOLTIP = "Block";
var ID_STR_CARD_UNSUSPEND_TOOLTIP = "Activate";
var ID_STR_YES = "Yes";
var ID_STR_NO = "No";