// begin jquery extension includes
// ======

/*!
* jQuery Cookie Plugin v1.3
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2011, Klaus Hartl
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/
(function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };

})(jQuery, document);

/*
* jQuery UI Autocomplete HTML Extension
*
* Copyright 2010, Scott González (http://scottgonzalez.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* http://github.com/scottgonzalez/jquery-ui-extensions
*/

(function ($) {

    var proto = $.ui.autocomplete.prototype,
	initSource = proto._initSource;

    function filter(array, term) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function (value) {
            return matcher.test($("<div>").html(value.label || value.value || value).text());
        });
    }

    $.extend(proto, {
        _initSource: function () {
            if (this.options.html && $.isArray(this.options.source)) {
                this.source = function (request, response) {
                    response(filter(this.options.source, request.term));
                };
            } else {
                initSource.call(this);
            }
        },

        _renderItem: function (ul, item) {
            return $("<li></li>")
			.data("item.autocomplete", item)
			.append($("<a></a>")[this.options.html ? "html" : "text"](item.label))
			.appendTo(ul);
        }
    });

})(jQuery);

// ======

// gig.js
// ======

var GIG = {};

GIG.UI = {};

GIG.UI.SmoothScroll = function (linkPairs, time) {
    // requires explicit linkPairs.link (selector for what gets clicked)
    // requires explicit linkPairs.target (selector for what gets scrolled to)
    // linkPairs.offset defaults to 0 (added to $(target).position().top)
    // linkPairs.callback defaults to noop (called after animation)
    // time defaults to 1000ms (length of animation)
    var len = linkPairs.length, index, callback;
    for (index = 0; index < len; index++) {
        $(linkPairs[index].link).hover(
            function () {
                $(this).css('cursor', 'pointer');
            },
            function () {
                $(this).css('cursor', 'auto');
            }
        );
        $(linkPairs[index].link).on('click', function (x) {
            if (typeof linkPairs[x].callback === 'undefined') {
                linkPairs[x].callback = function () { };
            }
            return function () {
                var contentTop = $(linkPairs[x].target).offset().top - (linkPairs[x].offset || 0);
                $('html, body').stop().animate({
                    scrollTop: contentTop
                }, time || 1000,
                    linkPairs[x].callback);
                return false;
            };
        } (index));
    }
};

GIG.UI.$CreateAjaxSpinner = function () {
    return $('<div class="ajax-loader"></div>');
};

GIG.Favorites = {};

GIG.Favorites.Add = function (memberID) {
    var selectedPerformerIDs = $.cookie('selectedPerformerIDs'),
            originalRawValue = $.cookie.raw;
    // need cookie.raw so it doesn't encode commas
    $.cookie.raw = true;
    memberID = memberID.toString();
    if (selectedPerformerIDs === null) {
        $.cookie('selectedPerformerIDs', memberID, { path: '/' });
    } else if ($.inArray(memberID, selectedPerformerIDs.split(',')) === -1) { //If the performerID is already in the cookie, don't add it
        $.cookie('selectedPerformerIDs', selectedPerformerIDs + ',' + memberID, { path: '/' });
    }
    $.cookie.raw = originalRawValue;
};

GIG.Favorites.Count = function () {
    if ($.cookie('selectedPerformerIDs') === null) {
        return 0;
    }
    else if ($.cookie('selectedPerformerIDs').indexOf(',') === -1) {
        return 1;
    }
    else {
        var selectedPerformerIDs = $.cookie('selectedPerformerIDs');
        return selectedPerformerIDs.split(',').length;
    }
};

GIG.Media = {};

GIG.Media.JWSetup = function (options) {
    // setup options common to both audio and video
    var jwOptions = {
        'file': options.mediaUrl.replace('http://' + options.cdnUserDownload + '/', ''),
        'modes': [{
            'type': 'flash',
            'src': 'http://' + options.cdnStatic + '/flash/jw/player.swf'
        }, {
            'type': 'html5',
            'config': {
                'file': options.mediaUrl,
                'provider': options.provider
            }
        }],
        'provider': 'rtmp',
        'streamer': 'rtmp://' + options.cdnUserStreaming + '/cfx/st',
        'width': options.width,
        'height': options.height,
        'autostart': options.autostart,
        'events': {
            onPlay: function () {
                $.ajax({
                    type: "POST",
                    url: "/api/InsertMediaObjectRequest.ashx",
                    data: { 'mediaObjectID': options.mediaID, 'loggedIP': options.userIPAddress },
                    async: true
                });
            }
        }
    };

    // these options aren't defined for both audio and video
    var extraOptions = 'plugins image controlbar screencolor'.split(' ');
    for (var i = 0; i < extraOptions.length; i++) {
        if (!(typeof options[extraOptions[i]] === 'undefined')) {
            jwOptions[extraOptions[i]] = options[extraOptions[i]];
        }
    }

    jwplayer(options.id).setup(jwOptions);

    // this is used to modify any DOM elements that are page-specific
    if (!(typeof options.callback === 'undefined')) {
        options.callback();
    }
};

GIG.Media.PlayAudio = function (options) {
    // audio specific options
    options.provider = 'video';
    options.height = 24;
    options.width = 276;
    options.plugins = undefined;
    options.image = undefined;
    options.controlbar = 'bottom';
    options.screencolor = 'ffffff';

    GIG.Media.JWSetup(options);
};

GIG.Media.PlayVideo = function (options) {
    // video specific options
    options.provider = 'video';
    options.height = options.height,
    options.width = options.width,
    options.plugins = {
        'sharing-3': {
            'link': window.location.href
        }
    };
    options.image = 'http://' + options.cdnStatic + '/images/pk-video-preview.gif';
    options.controlbar = undefined;
    options.screencolor = undefined;

    GIG.Media.JWSetup(options);
};

GIG.Media.Slideshow = function (options) {
    if (!(options &&
          options.$previous &&
          options.$next &&
          options.$playPause)) {
        throw new Error('Required field not specified for Slideshow');
    }

    var currIndex = 0,
        mediaInfos = [],
        pid = undefined,
        goesToNext = true,
        speed = options.speed || 3000,
        drawCallback = options.drawCallback || (function () { }),
        playCallback = options.playCallback || (function () { }),
        pauseCallback = options.pauseCallback || (function () { });

    this.add = function (mediaInfo) {
        mediaInfos.push(mediaInfo);
    };

    var setIndex = this.setIndex = function (i) {
        if (i >= 0 && i < mediaInfos.length) {
            currIndex = i;
        } else {
            throw new RangeError();
        }
    };

    this.setIndexByID = function (mid) {
        var i = 0, len = mediaInfos.length;
        for (; i < len; i++) {
            if (mediaInfos[i].id === mid) {
                setIndex(i);
                return i;
            }
        }
        throw new RangeError('Slideshow object not found with given ID');
    };

    var previous = this.previous = function (event) {
        if (event) { event.stopPropagation(); }
        currIndex = (currIndex === 0 ? (mediaInfos.length - 1) : (currIndex - 1));
        goesToNext = false;
        drawCallback(mediaInfos[currIndex]);
    };

    var next = this.next = function (event) {
        if (event) { event.stopPropagation(); }
        currIndex = (currIndex + 1) % mediaInfos.length;
        goesToNext = true;
        drawCallback(mediaInfos[currIndex]);
    };

    var play = this.play = function () {
        pid = setInterval(function () {
            var func = (goesToNext ? next : previous);
            func();
        }, speed);
        playCallback(options.$playPause);
    };

    var pause = this.pause = function () {
        if (!(typeof pid === 'undefined')) {
            clearInterval(pid);
            pid = undefined;
        }
        pauseCallback(options.$playPause);
    };

    options.$previous.click(previous);
    options.$next.click(next);
    options.$playPause.click(function (event) {
        event.stopPropagation();
        if (typeof pid === 'undefined') {
            play();
        } else {
            pause();
        }
    });
};

GIG.Classes = {};

GIG.Classes.ProfileMediaInfo = function ($el) {
    var $a = $el.find('a'),
        $img = $el.find('img');

    var enumTheaterType = {
        photoSingle: {
            type: 'photo-single',
            func: undefined
        },
        photoSlideshow: {
            type: 'photo-slideshow',
            func: undefined
        },
        video: {
            type: 'video',
            func: GIG.Media.PlayVideo
        },
        audio: {
            type: 'audio',
            func: GIG.Media.PlayAudio
        }
    };

    // enumGivenClass[activeTab][thisClass] = enumTheaterType
    var enumGivenClass = {
        'profile-media-all': {
            'profile-media-photo': enumTheaterType.photoSingle,
            'profile-media-video': enumTheaterType.video,
            'profile-media-audio': enumTheaterType.audio
        },
        'profile-media-photos': {
            'profile-media-photo': enumTheaterType.photoSlideshow
        },
        'profile-media-videos': {
            'profile-media-video': enumTheaterType.video
        },
        'profile-media-audios': {
            'profile-media-audio': enumTheaterType.audio
        }
    };

    // TODO: cleanup
    var ettt = 'profile-media-photo profile-media-video profile-media-audio'.split(' '), thisClass = '', i = 0;
    for (; i < ettt.length; i++) { if ($el.hasClass(ettt[i])) { thisClass = ettt[i]; } }

    var activeTab = $el.closest('.ui-tabs-panel').attr('id'),
                    theaterType = undefined;
    if (enumGivenClass[activeTab] && enumGivenClass[activeTab][thisClass]) {
        theaterType = enumGivenClass[activeTab][thisClass];
        this.theaterClass = theaterType.type;
        this.theaterFunction = theaterType.func;
    } else {
        throw new Error('Invalid activeTab/thisClass combination for MediaInfo');
    }

    // TODO: add sequence number
    this.$el = $el;
    this.description = $a.attr('title') || '';
    this.height = $a.data('height') || '';
    this.width = $a.data('width') || '';
    this.id = $a.attr('name') || '';
    this.resourceUrl = $a.attr('href') || '';
    this.seoText = $img.attr('alt') || '';
    this.thumbnailUrl = $img.attr('src') || '';
};

GIG.Ajax = {};

GIG.Ajax.RequestForm = function (options) {
    var _this = this;

    this.initialize = function (options) {
        if (options === null || typeof options !== 'object' ||
                    typeof options.selector === 'undefined') {
            throw new Error("RequestForm.initialize: required field not specified");
        }

        _this.$form = $(options.selector);

        _this.$form.on('submit', function (evt) {
            var displayError = function (fieldName) {
                $('html, body').stop().animate({ 'scrollTop': 0 }, 500);
                var errorMessage = "Oops! There were one or more errors with your submission. Please fill out the sections highlighted below to proceed.<br>X is a required field.";
                $('#error-list').html(errorMessage.replace('X', fieldName)).show();
            };

            // Quick Quotes: require vendor type
            var $serviceType = $('input#ServiceType');
            if ($serviceType.length && $serviceType.val().replace(' ', '') === '') {
                $serviceType.addClass('error');
                displayError('Vendor Type');
                return false;
            }
            $serviceType.removeClass('error');

            // Don't default times to midnight
            var $eventTime = $('select#EventTime'),
            $pickUpTime = $('select#PickUpTime');
            if ($eventTime.length && $eventTime.find(':selected').text() === '') {
                $eventTime.addClass('error');
                displayError('Vendor Start Time');
                return false;
            } else if ($pickUpTime.length && $pickUpTime.find(':selected').text() === '') {
                $pickUpTime.addClass('error');
                displayError('Pick Up Time');
                return false;
            }
            $eventTime.removeClass('error');
            $pickUpTime.removeClass('error');

            // Need to reset fields every time in case of errors
            _this.fields = {};
            $.each(_this.$form.serializeArray(), function (index, field) {
                _this.addFieldWithValue(field.name, field.value);
            });

            _this.addDeselectedPerformerIDs();

            _this.submit({
                'complete': options.complete,
                'serverError': options.serverError,
                'success': options.success,
                'validationError': options.validationError
            });
            return false;
        });
    };

    this.addDeselectedPerformerIDs = function () {
        $('#SelectedPerformerIDs').each(function (index, el) {
            var $checkbox = $(this);
            if ($checkbox.attr('checked') !== 'checked') {
                _this.addFieldWithValue('DeselectedPerformerIDs', $checkbox.val());
            }
        });
    };

    this.addFieldWithValue = function (name, value) {
        if (typeof _this.fields[name] === 'undefined') {
            _this.fields[name] = value;
        } else {
            _this.fields[name] += ',' + value
        }
    };

    this.getPostData = function () {
        return {
            'RequestFormJSON': JSON.stringify(_this.fields)
        }
    };

    this.submit = function (options) {
        if (options === null || typeof options !== 'object') {
            throw new Error("RequestForm.submitForm: no options specified");
        }
        $.ajax({
            'complete': options.complete,
            'contentType': 'application/x-www-form-urlencoded',
            'data': _this.getPostData(),
            'dataType': 'json', // not 'application/json' (http://bugs.jquery.com/ticket/8216)
            'error': options.serverError,
            'processData': true,
            'success': function (data, status, jqXHR) {
                if (data.status === 'success') {
                    options.success(data, status, jqXHR);
                } else {
                    //clear out all previous error classes and error list
                    $('input.error').removeClass('error');
                    $('#error-list').replaceWith('<div id="error-list" class="error"></div>');
                    options.validationError(data, status, jqXHR);
                }
            },
            'type': 'POST',
            'url': _this.$form.attr('action')
        });
    }

    this.initialize(options);
};

GIG.Authentication = {};

GIG.Authentication.QuickLogin = {};

GIG.Authentication.QuickLogin.Submit = function (username, password, callback) {
    var response = {};
    $.getJSON('/api/Login.ashx?u=' + username + '&p=' + password, function (login) {
        if (login.status === "1" || login.status === "0") {
            response.success = true;
            response.userinfo = login;
        }
        else {
            response.success = false;
        }
        callback(response);
    });
};

GIG.Authentication.QuickLogin.ShowLoginBox = function () {
    $('div.login-box').dialog({
        bgiframe: true,
        autoOpen: false,
        height: "auto",
        width: 300,
        modal: true,
        dialogClass: 'ui-alert',
        title: "Sign In",
        close: function () {
            $('div.login-box').hide();
            $("div.forgot-box").slideToggle();
        }
    });
    $('p.rtnMsg a').click(function (e) {
        e.preventDefault();
        $('div.login-box').dialog('open');
    });
};

GIG.Authentication.QuickLogin.ShowForgotPasswordField = function () {
    $("div.forgot-box").slideToggle();
};

GIG.Authentication.QuickLogin.SubmitForgotPassword = function (email, callback) {
    var em = encodeURI(email);
    $.getJSON('/api/Login.ashx?em=' + encodeURIComponent(em), function (login) {
        var response = {};
        if (login.status === "0") {
            response.success = true;
        }
        else if (login.status === "-1") {
            response.success = true;
        }
        else if (login.status === "-2") {
            response.success = false;
        }
        callback(response);
    });
};

GIG.FormFields = {};

GIG.FormFields.Autocomplete = {};

GIG.FormFields.Autocomplete.Initialize = function () {
    var cacheLocation = {}, lastXhrLocation;

    $('.CityState').autocomplete({
        source: function (request, response) {
            searchComplete = false;
            var term = request.term;
            if (term in cacheLocation) {
                response(cacheLocation[term]);
                searchComplete = true;
                return;
            }
            lastXhrLocation = $.getJSON('/handlers/autocomplete-location.ashx?query=' + request.term, null, function (data, status, xhr) {
                cacheLocation[term] = data;
                searchComplete = true;
                if (xhr === lastXhrLocation) {
                    response(data);
                }
            });
        },
        minLength: 2,
        datatype: 'json',
        html: true,
        select: function (event, ui) {
            $(this).val(GIG.Global.RemoveHTMLTags(ui.item.label));
            return false;
        }
    });
};

GIG.Global = {};

GIG.Global.RemoveHTMLTags = function (inputString) {
    inputString = inputString.replace(/&(lt|gt);/g, function (strMatch, p1) {
        return (p1 == "lt") ? "<" : ">";
    });
    var strTagStrippedText = inputString.replace(/<\/?[^>]+(>|$)/g, "");
    return strTagStrippedText;
};

GIG.Global.FormatCurrency = function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;

    return (((sign) ? '' : '-') + num + '.' + cents);
};

GIG.Global.SaveBidResponse = function (bidID) {
    $('#save-bid-response').click(function () {
        $.ajax({
            type: 'POST',
            url: '/cp/CreateSavedBidFromBid/',
            data: {
                'bidID': bidID,
                'name': $('#saved-bid-name').val()
            },
            success: function (data) {
                // data.result should be 'success' or 'error', which should match CSS classes
                $('#saved-bid-message').prop('class', data.result).text(data.message).show(100);
            }
        });
    });
};

GIG.Global.BidSaveNotes = function ($leadID) {
    $('#save-notes input').click(function (e) {
        e.preventDefault();
        var button = $(this).val(),
                    note = ((button == 'Save Note') ? $('#internal-notes').val() : '');
        $.ajax({
            type: 'POST',
            url: '/cp/AddInternalNote/',
            data: { leadID: $leadID, notes: note },
            success: function (data) {
                $('#save-notes-success').text(data.result).show(100);
                $('#internal-notes').val(note);
            }
        });
    });

    $('#my-notes').dialog({
        bgiframe: true,
        autoOpen: false,
        height: 200,
        width: 300,
        modal: true,
        dialogClass: 'ui-alert',
        title: "My Notes",
        close: function () {
            $('#save-notes-success').hide();
            $('#notes-text').html($('#internal-notes').text());
        }
    });
    $('.notes-dialog').click(function (e) {
        e.preventDefault();
        $('#my-notes').dialog('open');
    });
};

GIG.ViewModels = {};

GIG.ViewModels.Bid = function (maxBalanceAmount, maxDepositAmount, eventDurationInHours) {
    var that = this;

    // Plain old properties

    this.MaxBalanceAmount = Number(maxBalanceAmount);
    this.MaxDepositAmount = Number(maxDepositAmount);
    this.EventDurationInHours = Number(eventDurationInHours);

    // Observables

    this.ResponseType = ko.observable(null);
    this.Rate = ko.observable().extend({ undefinableNumeric: 2 });
    this.RateTimePeriodID = ko.observable();
    this.HasOptionalTravelCharges = ko.observable();
    this.BidTravelCharges = ko.observable();
    this.TravelCharge = ko.observable().extend({ undefinableNumeric: 2 });
    this.GasCharge = ko.observable().extend({ undefinableNumeric: 2 });
    this.TravelRequirementsNotYetKnown = ko.observable();
    this.ClientPaysFuelCosts = ko.observable();
    this.ClientPaysHotelRoom = ko.observable();
    this.ClientPaysFlight = ko.observable();
    this.ClientPaysTrainFerryBusFare = ko.observable();
    this.FuelRequirementsNotYetKnown = ko.observable();
    this.ClientPaysTollFees = ko.observable();
    this.ClientPaysAdditionalTravelFares = ko.observable();
    this.HasDeposit = ko.observable(false);
    this.DepositAmount = ko.observable().extend({ undefinableNumeric: 2 });
    this.DepositHasDueDate = ko.observable(false);
    this.DepositDueDate = ko.observable();
    this.DepositIsRefundable = ko.observable().extend({ booleanString: undefined });
    this.AllowOnlinePayment = ko.observable();
    this.AcceptsAllOnlinePayments = ko.observable().extend({ booleanString: undefined });
    this.DepositRefundableUntilDate = ko.observable();
    this.BalanceDueDate = ko.observable();
    this.BalanceIsRefundable = ko.observable(false);
    this.BalanceRefundableUntilDate = ko.observable();
    this.NumberPerformers = ko.observable().extend({ undefinableNumeric: 0 });
    this.NumberVehicles = ko.observable().extend({ undefinableNumeric: 0 });
    this.HasBreaks = ko.observable();
    this.Breaks = ko.observable().extend({ undefinableNumeric: 0 });
    this.BreakLength = ko.observable();
    this.ExpirationDate = ko.observable();
    this.Notes = ko.observable();
    this.HasExpirationDate = ko.observable();
    this.MemberWillPayBookingFee = ko.observable().extend({ booleanString: undefined });
    this.MemberAlwaysPaysBookingFees = ko.observable().extend({ booleanString: undefined });
    this.MemberEmail = ko.observable();
    this.MemberPhone = ko.observable();
    this.MemberWebsite = ko.observable();
    this.NoResponseID = ko.observable();
    this.NoNotes = ko.observable();
    // //
    this.ResponseID = ko.observable();
    this.InternalNote = ko.observable();
    this.SendBidEmailToClient = ko.observable();
    this.CopyMemberOnBidEmail = ko.observable();
    // Saved Bid properties
    this.UseSavedYesBid = ko.observable();
    this.SavedYesBidID = ko.observable();
    this.UseSavedNoBid = ko.observable();
    this.SavedNoBidID = ko.observable();
    this.SaveBid = ko.observable(false);
    this.SavedBidName = ko.observable();
    // Payment Information
    this.PayByCreditCard = ko.observable(false);
    this.PayByPayPal = ko.observable(false);
    this.PayByCheck = ko.observable(false);

    // Computed

    this.RateTimePeriodDescription = ko.computed(function () {
        // better solution here http://stackoverflow.com/a/11170582/285498
        var selector = "#RateTimePeriodID option[value='" + this.RateTimePeriodID() + "']";
        return $(selector).text();
    }, this);

    this.AmountExplanation = ko.computed(function () {
        // Returns one of the following:
        // # performer(s)
        // # breaks(s) (# set(s))
        // # hour(s)
        var count = 0,
                    type = '',
                    plural = '',
                    setCount = 0,
                    setPlural = '',
                    setExplanation = '';
        switch (this.RateTimePeriodDescription()) {
            case 'per set':
                count = this.Breaks();
                type = 'break';
                setCount = count + 1;
                setPlural = (setCount === 1 ? '' : 's');
                setExplanation = ' (' + setCount + ' set' + setPlural + ')';
                break;
            case 'per performer':
                count = this.NumberPerformers();
                type = 'performer';
                break;
            case 'per vehicle':
                count = this.NumberVehicles();
                type = 'vehicle';
                break;
            case 'per hour':
                count = this.EventDurationInHours;
                type = 'hour';
                break;
        }
        plural = (count === 1 ? '' : 's');
        return ('' + count + ' ' + type + plural + setExplanation);
    }, this);

    this.MinBalanceRefundableDate = ko.computed(function () {
        // Balance is refundable until at least the deposit refundable date or balance due date, whichever is later
        if (this.HasDeposit() === false || this.DepositRefundableUntilDate() === null || typeof this.DepositRefundableUntilDate() === 'undefined') {
            return this.BalanceDueDate();
        } else {
            return (this.DepositRefundableUntilDate() < this.BalanceDueDate() ? this.BalanceDueDate() : this.DepositRefundableUntilDate());
        }
    }, this);

    this.ComputedRate = ko.computed(function () {
        var desc = this.RateTimePeriodDescription();
        if (desc === '') { return 0; } // needed for initial page load
        else if (desc.match(/^for .*$|^per (show|night)$/)) { return this.Rate(); }
        else if (desc.match(/^per vehicle$/)) { return this.Rate() * this.NumberVehicles(); }
        else if (desc.match(/^per (performer|dancer)$/)) { return this.Rate() * this.NumberPerformers(); }
        else if (desc.match(/^per set$/)) { return this.Rate() * (1 + this.Breaks()); }
        else if (desc.match(/^per (hour|the hour)$/)) { return this.Rate() * this.EventDurationInHours; }
        else { throw new Error('computedRate: no strategy'); }
    }, this);

    this.ComputedTravelCharges = ko.computed(function () {
        var charges = 0;
        if (this.HasOptionalTravelCharges()) {
            switch (this.BidTravelCharges()) {
                case 'ExactTravelCharge':
                    charges += this.TravelCharge();
                    break;
                case 'ExactGasCharge':
                    charges += this.GasCharge();
                    break;
            }
        }
        return charges;
    }, this);

    this.ComputedDeposit = ko.computed(function () {
        return (this.HasDeposit() ? this.DepositAmount() : 0);
    }, this);

    this.Balance = ko.computed(function () {
        return (this.ComputedRate() + this.ComputedTravelCharges() - this.ComputedDeposit());
    }, this);

    // Subscriptions

    this.RateTimePeriodID.subscribe(function (newValue) {
        // If the user chooses "per set", force breaks
        if (that.RateTimePeriodDescription() === 'per set' && that.HasBreaks() !== true) {
            that.HasBreaks(true);
        }
    });

    this.SavedYesBidID.subscribe(function (newValue) {
        if (typeof SAVED_YES_BIDS === 'undefined' || typeof SAVED_YES_BIDS[newValue] === 'undefined') { return; }
        var savedYesBid = SAVED_YES_BIDS[newValue];
        // var mapped = ko.mapping.fromJS(savedYesBid);
        for (var prop in savedYesBid) {
            if (savedYesBid.hasOwnProperty(prop)) {
                that[prop](savedYesBid[prop]);
            }
        }
    });

    this.SavedNoBidID.subscribe(function (newValue) {
        if (typeof SAVED_NO_BIDS === 'undefined' || typeof SAVED_NO_BIDS[newValue] === 'undefined') { return; }
        var savedNoBid = SAVED_NO_BIDS[newValue];
        that.NoResponseID(savedNoBid.ResponseID);
        that.NoNotes(savedNoBid.Notes);
    });

    this.DepositDueDate.subscribe(function (newValue) {
        // Deposit Due Date restricts:
        // * Deposit Refundable Until Date (Min Date)
        // * Balance Due Date (Min Date)
        if (newValue instanceof Date) { // Only trigger if the new value isn't null/undefined/some other nonsense
            $('#DepositRefundableUntilDate').datepicker("option", "minDate", newValue);
            $('#BalanceDueDate').datepicker("option", "minDate", newValue);
        }
    });

    this.BalanceDueDate.subscribe(function (newValue) {
        // Balance Due Date restricts:
        // * Balance Refundable Until Date (Min Date) UNLESS Deposit Refundable Until Date IS LATER
        $('#BalanceRefundableUntilDate').datepicker("option", "maxDate", that.MinBalanceRefundableDate());
    });

    this.DepositRefundableUntilDate.subscribe(function (newValue) {
        // Deposit Refundable Until Date restricts:
        // * Balance Refundable Until Date (Min Date) UNLESS Balance Due Date IS LATER
        $('#BalanceRefundableUntilDate').datepicker("option", "maxDate", that.MinBalanceRefundableDate());
    });

    this.BalanceRefundableUntilDate.subscribe(function (newValue) {
        // Balance Refundable Until Date restricts:
        // * Deposit Refundable Until Date (Max Date)
        $('#DepositRefundableUntilDate').datepicker("option", "maxDate", newValue);
    });

    this.HasOptionalTravelCharges.subscribe(function (newValue) {
        if (newValue === false) {
            that.RemoveAllTravelCharges();
        }
    });

    this.BidTravelCharges.subscribe(function (newValue) {
        that.RemoveAllTravelChargesExcept(newValue);
    });

    // Computed copy

    this.BalanceText1 = ko.computed(function () {
        if (this.HasDeposit()) {
            return 'Balance';
        } else {
            return 'Payment in full'
        }
    }, this);

    this.BalanceText2 = ko.computed(function () {
        if (this.HasDeposit()) {
            return 'balance';
        } else {
            return 'payment';
        }
    }, this);

    this.BalanceFormatted = ko.computed(function () {
        if (this.HasDeposit() && (typeof this.DepositAmount() === 'undefined')) {
            return '-.--';
        } else {
            return GIG.Global.FormatCurrency(this.Balance());
        }
    }, this);

    // Show/Hide logic

    this.ShowAmountExplanation = ko.computed(function () {
        return (this.RateTimePeriodDescription() === 'per set' ||
                this.RateTimePeriodDescription() === 'per performer' ||
                this.RateTimePeriodDescription() === 'per hour');
    }, this);

    this.ShowBalanceWarning = ko.computed(function () {
        return (this.ComputedRate() > this.MaxBalanceAmount || this.Balance() > this.MaxBalanceAmount);
    }, this);

    this.ShowDepositWarning1 = ko.computed(function () {
        return (this.ComputedRate() < this.ComputedDeposit());
    }, this);

    this.ShowDepositWarning2 = ko.computed(function () {
        return (this.ComputedDeposit() > this.MaxDepositAmount);
    }, this);

    this.ShowBalanceRefundableWarning = ko.computed(function () {
        return (this.HasDeposit() && this.DepositIsRefundable.asBoolean() && this.Balance() !== 0);
    }, this);

    this.ShowCreditCardInformation = ko.computed(function () {
        if (this.PayByCreditCard() === "CreditCard") {
            return true;
        } else {
            return false;
        }
    }, this);

    this.ShowCheckHint = ko.computed(function () {
        if (this.PayByCreditCard() === "Check") {
            return true;
        } else {
            return false;
        }
    }, this);

    this.ShowYesForm = ko.computed(function () {
        return (this.ResponseType() === 'Yes');
    }, this);

    this.ShowNoForm = ko.computed(function () {
        return (this.ResponseType() === 'No');
    }, this);

    this.ShowPerSetRateExplanation = ko.computed(function () {
        return (this.RateTimePeriodDescription() === 'per set' && this.HasBreaks() === true);
    }, this);

    this.ShowNumberPerformersWarning = ko.computed(function () {
        var desc = this.RateTimePeriodDescription();
        return (desc === 'per vehicle' || desc === 'per performer');
    }, this);

    // Plain old functions

    this.ShowTravelCharge = function (travelChargeEnumName) {
        return (that.BidTravelCharges() === travelChargeEnumName);
    };

    this.RemoveAllTravelCharges = function () {
        that.BidTravelCharges(null);
        that.RemoveAllTravelChargesExcept(null); // Reset all charges
    };

    this.RemoveAllTravelChargesExcept = function (selectedTravelCharge) {
        var selectedChargeIsnt = function (enumName) {
            return !(enumName === selectedTravelCharge);
        };

        if (selectedChargeIsnt('ExactTravelCharge')) {
            that.TravelCharge(null);
        }
        if (selectedChargeIsnt('UnknownTravelCharge')) {
            // nothing to do
        }
        if (selectedChargeIsnt('SpecificTravelCharges')) {
            that.ClientPaysFuelCosts(null);
            that.ClientPaysHotelRoom(null);
            that.ClientPaysFlight(null);
            that.ClientPaysTrainFerryBusFare(null);
        }
        if (selectedChargeIsnt('ExactGasCharge')) {
            that.GasCharge(null);
        }
        if (selectedChargeIsnt('UnknownGasCharge')) {
            // nothing to do
        }
        if (selectedChargeIsnt('SpecificGasCharges')) {
            that.ClientPaysFuelCosts(null);
            that.ClientPaysTollFees(null);
            that.ClientPaysAdditionalTravelFares(null);
        }
    };
};

