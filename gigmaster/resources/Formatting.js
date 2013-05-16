/* This file contains a collection of JavaScript text formatting
* and string manipulation functions:
*       --Function List--
*   addCommas(nStr)
*   formatCurrency(num)
*   stripCharsInBag(s, bag)
*   Date.prototype.format(format, locale)
*/



/* Original by Keith Jenci
* Acquired from mredkj.com @ http://www.mredkj.com
* Last Updated Saturday, October 15, 2005
*
* The function adds commas to a number string.
*/
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
} // End addCommas() function.



/* This function formats the number sent to it as a $USD currency.
*/
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
			num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
} // End of formatAsCurrency() function.



/* Originally acquired from http://www.smartwebby.com
* This function removes all characters in string 'bag' from the string 's'.
*/
function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
} // End of stripCharsInBag() function.



/* Originally acquired from http://blog.mastykarz.nl/javascript-date-formatting-net-style/
* This provides functionality for date.format($format, $locale).
*/
var Imtech = Imtech || {};

Imtech.Utils = {
    date: {
        "1033": {
            monthsLong: ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            daysLong: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            patterns: {
                "d": "M/d/yyyy",
                "D": "dddd, MMMM dd, yyyy",
                "f": "dddd, MMMM dd, yyyy H:mm tt",
                "F": "dddd, MMMM dd, yyyy H:mm:ss tt",
                "g": "M/d/yyyy H:mm tt",
                "G": "M/d/yyyy H:mm:ss tt",
                "m": "MMMM dd",
                "o": "yyyy-MM-ddTHH:mm:ss.fff",
                "s": "yyyy-MM-ddTHH:mm:ss",
                "t": "H:mm tt",
                "T": "H:mm:ss tt",
                "U": "dddd, MMMM dd, yyyy HH:mm:ss tt",
                "y": "MMMM, yyyy"
            },
            tt: {
                "AM": "AM",
                "PM": "PM"
            },
            clockType: 12
        },
        "1043": {
            monthsLong: ["januari", "febrauri", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
            daysLong: ["maandag", "dinsdag", "woensdag", "donderdag", "vridag", "zaterdag", "zondag"],
            daysShort: ["ma", "di", "wo", "do", "vr", "za", "zo"],
            patterns: {
                "d": "d-M-yyyy",
                "D": "dddd d MMMM yyyy",
                "f": "dddd d MMMM yyyy H:mm",
                "F": "dddd d MMMM yyyy H:mm:ss",
                "g": "d-M-yyyy H:mm",
                "G": "d-M-yyyy H:mm:ss",
                "m": "dd MMMM",
                "o": "yyyy-MM-ddTHH:mm:ss.fff",
                "s": "yyyy-MM-ddTHH:mm:ss",
                "t": "H:mm",
                "T": "H:mm:ss",
                "U": "dddd d MMMM yyyy HH:mm:ss",
                "y": "MMMM, yyyy"
            },
            tt: {
                "AM": "",
                "PM": ""
            },
            clockType: 24
        }
    }
}

Date.prototype.format = function (format, locale) {
    var fd = this.toString();
    var dateFormat = Imtech.Utils.date[locale];
    if (typeof (dateFormat) !== "undefined") {
        var pattern = typeof (dateFormat.patterns[format]) !== "undefined" ? dateFormat.patterns[format] : format;

        fd = pattern.replace(/yyyy/g, this.getFullYear());
        fd = fd.replace(/yy/g, (this.getFullYear() + "").substring(2));

        var month = this.getMonth();
        fd = fd.replace(/MMMM/g, dateFormat.monthsLong[month].escapeDateTimeTokens());
        fd = fd.replace(/MMM/g, dateFormat.monthsShort[month].escapeDateTimeTokens());
        fd = fd.replace(/MM/g, month + 1 < 10 ? "0" + (month + 1) : month + 1);
        fd = fd.replace(/(\\)?M/g, function ($0, $1) { return $1 ? $0 : month + 1; });

        var dayOfWeek = this.getDay();
        fd = fd.replace(/dddd/g, dateFormat.daysLong[dayOfWeek].escapeDateTimeTokens());
        fd = fd.replace(/ddd/g, dateFormat.daysShort[dayOfWeek].escapeDateTimeTokens());

        var day = this.getDate();
        fd = fd.replace(/dd/g, day < 10 ? "0" + day : day);
        fd = fd.replace(/(\\)?d/g, function ($0, $1) { return $1 ? $0 : day; });

        var hour = this.getHours();
        if (dateFormat.clockType == 12) {
            if (hour > 12) {
                hour -= 12;
            }
        }

        fd = fd.replace(/HH/g, hour < 10 ? "0" + hour : hour);
        fd = fd.replace(/(\\)?H/g, function ($0, $1) { return $1 ? $0 : hour; });

        var minutes = this.getMinutes();
        fd = fd.replace(/mm/g, minutes < 10 ? "0" + minutes : minutes);
        fd = fd.replace(/(\\)?m/g, function ($0, $1) { return $1 ? $0 : minutes; });

        var seconds = this.getSeconds();
        fd = fd.replace(/ss/g, seconds < 10 ? "0" + seconds : seconds);
        fd = fd.replace(/(\\)?s/g, function ($0, $1) { return $1 ? $0 : seconds; });

        fd = fd.replace(/fff/g, this.getMilliseconds());

        fd = fd.replace(/tt/g, this.getHours() > 12 || this.getHours() == 0 ? dateFormat.tt["PM"] : dateFormat.tt["AM"]);
    }

    return fd.replace(/\\/g, "");
}

String.prototype.escapeDateTimeTokens = function () {
    return this.replace(/([dMyHmsft])/g, "\\$1");
} // End of JavaScript date formatting as in .NET