var Utils = (function () {
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) != -1)
                return c.substring(name.length, c.length);
        }
        return "";
    }

    function send_impression(campaignid, referer) {
        var data = {
            q: referer,
            signature: getCookie('signature'),
            usrip: getCookie('ip'),
            campaignid: campaignid //afbatuba3+4 , else empty array
        };
        $.post('http://stats.valaffiliates.com/register/impression', data);
    }

    function send_click(campaignid) {
        var data = {
            signature: getCookie('signature'),
            campaignid: campaignid //afbatuba3+4 , else empty array
        };
        $.post('http://stats.valaffiliates.com/register/click', data);
    }

    return {
        getCookie: getCookie,
        send_impression: send_impression,
        send_click: send_click
    }
}());
