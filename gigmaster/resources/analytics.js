// analytics.js
// ======

/*!
* jQuery getUrlVars
* http://www.backbonetechnology.com/blog/jquery/jquery-get-url-variables
*
* Copyright 2011, Backbone Technology
* public blog post, no license listed
*/
jQuery.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return jQuery.getUrlVars()[name];
    }
});



var ANALYTICS = {};

ANALYTICS.GoogleAnalyticsCampaignToCookie = function () {
    // Requires jQuery, jQuery-cookie, jQuery-getUrlVars.

    // Parse the page URL query string variables for Google Analytics' Custom Campaign information,
    var campaign_name = $.getUrlVar("utm_campaign");
    var campaign_source = $.getUrlVar("utm_source");
    var campaign_medium = $.getUrlVar("utm_medium");
    var campaign_content = $.getUrlVar("utm_content");
    // and set these values in the user's cookie.
    $.cookie("campaign_name", campaign_name, { expires: 30, path: '/' });
    $.cookie("campaign_source", campaign_source, { expires: 30, path: '/' });
    $.cookie("campaign_medium", campaign_medium, { expires: 30, path: '/' });
    $.cookie("campaign_content", campaign_content, { expires: 30, path: '/' });
};
