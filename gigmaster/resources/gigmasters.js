﻿function RTrim(a) { return (a.replace(/^\s*/, "")) } function LTrim(a) { return (a.replace(/\s*$/, "")) } function Trim(a) { return (RTrim(LTrim(a))) } function isValidObject(a) { if (a == null || a == undefined) { return false } return true } function checkall() { for (counter = 0; counter < document.YourLeads.gigids.length; counter++) { document.YourLeads.gigids[counter].checked = true } } function uncheckall() { for (counter = 0; counter < document.YourLeads.gigids.length; counter++) { document.YourLeads.gigids[counter].checked = false } } function popupBrowser(c, b, a) { popBox = window.open(c, "page", "toolbar=no,location=no,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,width=" + b + ",height=" + a); popBox.focus() } $(function () { $("a[rel=external]").attr("target", "_blank") }); function formatCurrency(a) { a = a.toString().replace(/\$|\,/g, ""); if (isNaN(a)) { a = "0" } sign = (a == (a = Math.abs(a))); a = Math.floor(a * 100 + 0.50000000001); cents = a % 100; a = Math.floor(a / 100).toString(); if (cents < 10) { cents = "0" + cents } return (((sign) ? "" : "-") + a + "." + cents) } window.onload = prepareLinks; function prepareLinks() { if (!document.getElementById || !document.getElementsByTagName) { return } if (!document.getElementById("trigger")) { return } var c = document.getElementById("trigger"); var a = c.getElementsByTagName("a"); for (var b = 0; b < a.length; b++) { a[b].onclick = function () { getContent(this.href); return false } } } function getHTTPObject() { var b = false; if (window.XMLHttpRequest) { b = new XMLHttpRequest() } else { if (window.ActiveXObject) { try { b = new ActiveXObject("Msxml2.XMLHTTP") } catch (a) { try { b = new ActiveXObject("Microsoft.XMLHTTP") } catch (a) { b = false } } } } return b } function getContent(b) { var a = getHTTPObject(); if (a) { a.onreadystatechange = function () { parseResponse(a) }; a.open("GET", b, true); a.send(null) } } function parseResponse(b) { if (b.readyState == 4) { if (b.status == 200 || b.status == 304) { var a = document.getElementById("ajaxContent"); a.innerHTML = b.responseText } } } (function (a) { a.fn.hoverIntent = function (k, j) { var l = { sensitivity: 7, interval: 100, timeout: 0 }; l = a.extend(l, j ? { over: k, out: j} : k); var n, m, h, d; var e = function (f) { n = f.pageX; m = f.pageY }; var c = function (g, f) { f.hoverIntent_t = clearTimeout(f.hoverIntent_t); if ((Math.abs(h - n) + Math.abs(d - m)) < l.sensitivity) { a(f).unbind("mousemove", e); f.hoverIntent_s = 1; return l.over.apply(f, [g]) } else { h = n; d = m; f.hoverIntent_t = setTimeout(function () { c(g, f) }, l.interval) } }; var i = function (g, f) { f.hoverIntent_t = clearTimeout(f.hoverIntent_t); f.hoverIntent_s = 0; return l.out.apply(f, [g]) }; var b = function (q) { var o = (q.type == "mouseover" ? q.fromElement : q.toElement) || q.relatedTarget; while (o && o != this) { try { o = o.parentNode } catch (q) { o = this } } if (o == this) { return false } var g = jQuery.extend({}, q); var f = this; if (f.hoverIntent_t) { f.hoverIntent_t = clearTimeout(f.hoverIntent_t) } if (q.type == "mouseover") { h = g.pageX; d = g.pageY; a(f).bind("mousemove", e); if (f.hoverIntent_s != 1) { f.hoverIntent_t = setTimeout(function () { c(g, f) }, l.interval) } } else { a(f).unbind("mousemove", e); if (f.hoverIntent_s == 1) { f.hoverIntent_t = setTimeout(function () { i(g, f) }, l.timeout) } } }; return this.mouseover(b).mouseout(b) } })(jQuery); (function (a) { a.fn.bgIframe = a.fn.bgiframe = function (c) { if (a.browser.msie && (a.browser.version.substring(0, 1) == 6)) { c = a.extend({ top: "auto", left: "auto", width: "auto", height: "auto", opacity: true, src: "javascript:false;" }, c || {}); var d = function (e) { return e && e.constructor == Number ? e + "px" : e }, b = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + c.src + '"style="display:block;position:absolute;z-index:-1;' + (c.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (c.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : d(c.top)) + ";left:" + (c.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : d(c.left)) + ";width:" + (c.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : d(c.width)) + ";height:" + (c.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : d(c.height)) + ';"/>'; return this.each(function () { if (a("> iframe.bgiframe", this).length == 0) { this.insertBefore(document.createElement(b), this.firstChild) } }) } return this } })(jQuery); (function (f) { f.cluetip = { version: "1.0.4" }; var j, i, h, e, g, b, k, d; f.fn.cluetip = function (m, l) { if (typeof m == "object") { l = m; m = null } if (m == "destroy") { return this.unbind(".cluetip") } return this.each(function (K) { var t = this, w = f(this); var H = f.extend(true, {}, f.fn.cluetip.defaults, l || {}, f.metadata ? w.metadata() : f.meta ? w.data() : {}); var p = false; var A = +H.cluezIndex; w.data("thisInfo", { title: t.title, zIndex: A }); var S = false, R = 0; if (!f("#cluetip").length) { f(['<div id="cluetip">', '<div id="cluetip-outer">', '<h3 id="cluetip-title"></h3>', '<div id="cluetip-inner"></div>', "</div>", '<div id="cluetip-extra"></div>', '<div id="cluetip-arrows" class="cluetip-arrows"></div>', "</div>"].join(""))[c](a).hide(); j = f("#cluetip").css({ position: "absolute" }); h = f("#cluetip-outer").css({ position: "relative", zIndex: A }); i = f("#cluetip-inner"); e = f("#cluetip-title"); g = f("#cluetip-arrows"); b = f('<div id="cluetip-waitimage"></div>').css({ position: "absolute" }).insertBefore(j).hide() } var J = (H.dropShadow) ? +H.dropShadowSteps : 0; if (!k) { k = f([]); for (var V = 0; V < J; V++) { k = k.add(f("<div></div>").css({ zIndex: A - 1, opacity: 0.1, top: 1 + V, left: 1 + V })) } k.css({ position: "absolute", backgroundColor: "#000" }).prependTo(j) } var F = w.attr(H.attribute), s = H.cluetipClass; if (!F && !H.splitTitle && !m) { return true } if (H.local && H.localPrefix) { F = H.localPrefix + F } if (H.local && H.hideLocal) { f(F + ":first").hide() } var G = parseInt(H.topOffset, 10), C = parseInt(H.leftOffset, 10); var B, T, y = isNaN(parseInt(H.height, 10)) ? "auto" : (/\D/g).test(H.height) ? H.height : H.height + "px"; var n, u, L, Z, N, U; var z = parseInt(H.width, 10) || 275, W = z + (parseInt(j.css("paddingLeft"), 10) || 0) + (parseInt(j.css("paddingRight"), 10) || 0) + J, D = this.offsetWidth, v, M, aa, O, o; var Q; var I = (H.attribute != "title") ? w.attr(H.titleAttribute) : ""; if (H.splitTitle) { if (I == undefined) { I = "" } Q = I.split(H.splitTitle); I = Q.shift() } if (H.escapeTitle) { I = I.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;") } var r; function Y() { return false } var x = function (ab) { if (!H.onActivate(w)) { return false } S = true; j.removeClass().css({ width: z }); if (F == w.attr("href")) { w.css("cursor", H.cursor) } if (H.hoverClass) { w.addClass(H.hoverClass) } u = L = w.offset().top; v = w.offset().left; O = ab.pageX; N = ab.pageY; if (t.tagName.toLowerCase() != "area") { n = f(document).scrollTop(); o = f(window).width() } if (H.positionBy == "fixed") { M = D + v + C; j.css({ left: M }) } else { M = (D > v && v > W) || v + D + W + C > o ? v - W - C : D + v + C; if (t.tagName.toLowerCase() == "area" || H.positionBy == "mouse" || D + W > o) { if (O + 20 + W > o) { j.addClass(" cluetip-" + s); M = (O - W - C) >= 0 ? O - W - C - parseInt(j.css("marginLeft"), 10) + parseInt(i.css("marginRight"), 10) : O - (W / 2) } else { M = O + C } } var ac = M < 0 ? ab.pageY + G : ab.pageY; j.css({ left: (M > 0 && H.positionBy != "bottomTop") ? M : (O + (W / 2) > o) ? o / 2 - W / 2 : Math.max(O - (W / 2), 0), zIndex: w.data("thisInfo").zIndex }); g.css({ zIndex: w.data("thisInfo").zIndex + 1 }) } T = f(window).height(); if (m) { if (typeof m == "function") { m = m(t) } i.html(m); P(ac) } else { if (Q) { var ae = Q.length; i.html(Q[0]); if (ae > 1) { for (var ad = 1; ad < ae; ad++) { i.append('<div class="split-body">' + Q[ad] + "</div>") } } P(ac) } else { if (!H.local && F.indexOf("#") != 0) { if (/\.(jpe?g|tiff?|gif|png)$/i.test(F)) { i.html('<img src="' + F + '" alt="' + I + '" />'); P(ac) } else { if (p && H.ajaxCache) { i.html(p); P(ac) } else { var ai = H.ajaxSettings.beforeSend, af = H.ajaxSettings.error, ag = H.ajaxSettings.success, al = H.ajaxSettings.complete; var ak = { cache: false, url: F, beforeSend: function (am) { if (ai) { ai.call(t, am, j, i) } h.children().empty(); if (H.waitImage) { b.css({ top: N + 20, left: O + 20, zIndex: w.data("thisInfo").zIndex - 1 }).show() } }, error: function (am, an) { if (S) { if (af) { af.call(t, am, an, j, i) } else { i.html("<i>sorry, the contents could not be loaded</i>") } } }, success: function (am, an) { p = H.ajaxProcess.call(t, am); if (S) { if (ag) { ag.call(t, am, an, j, i) } i.html(p) } }, complete: function (am, an) { if (al) { al.call(t, am, an, j, i) } d = f("#cluetip-inner img").length; if (d && !f.browser.opera) { f("#cluetip-inner img").bind("load error", function () { d--; if (d < 1) { b.hide(); if (S) { P(ac) } } }) } else { b.hide(); if (S) { P(ac) } } } }; var ah = f.extend(true, {}, H.ajaxSettings, ak); f.ajax(ah) } } } else { if (H.local) { var aj = f(F + (/#\S+$/.test(F) ? "" : ":eq(" + K + ")")).clone(true).show(); i.html(aj); P(ac) } } } } }; var P = function (ad) { j.addClass("cluetip-" + s); if (H.truncate) { var ae = i.text().slice(0, H.truncate) + "..."; i.html(ae) } function ab() { } I ? e.show().html(I) : (H.showTitle) ? e.show().html("&nbsp;") : e.hide(); if (H.sticky) { var ac = f('<div id="cluetip-close"><a href="#">' + H.closeText + "</a></div>"); (H.closePosition == "bottom") ? ac.appendTo(i) : (H.closePosition == "title") ? ac.prependTo(e) : ac.prependTo(i); ac.bind("click.cluetip", function () { E(); return false }); if (H.mouseOutClose) { j.bind("mouseleave.cluetip", function () { E() }) } else { j.unbind("mouseleave.cluetip") } } var af = ""; h.css({ zIndex: w.data("thisInfo").zIndex, overflow: y == "auto" ? "visible" : "auto", height: y }); B = y == "auto" ? Math.max(j.outerHeight(), j.height()) : parseInt(y, 10); Z = L; U = n + T; if (H.positionBy == "fixed") { Z = L - H.dropShadowSteps + G } else { if ((M < O && Math.max(M, 0) + W > O) || H.positionBy == "bottomTop") { if (L + B + G > U && N - n > B + G) { Z = N - B - G; af = "top" } else { Z = N + G; af = "bottom" } } else { if (L + B + G > U) { Z = (B >= T) ? n : U - B - G } else { if (w.css("display") == "block" || t.tagName.toLowerCase() == "area" || H.positionBy == "mouse") { Z = ad - G } else { Z = L - H.dropShadowSteps } } } } if (af == "") { M < v ? af = "left" : af = "right" } j.css({ top: Z + "px" }).removeClass().addClass("clue-" + af + "-" + s).addClass(" cluetip-" + s); if (H.arrows) { var ag = (L - Z - H.dropShadowSteps); g.css({ top: (/(left|right)/.test(af) && M >= 0 && ag > 0) ? ag + "px" : /(left|right)/.test(af) ? 0 : "" }).show() } else { g.hide() } k.hide(); j.hide()[H.fx.open](H.fx.open != "show" && H.fx.openSpeed); if (H.dropShadow) { k.css({ height: B, width: z, zIndex: w.data("thisInfo").zIndex - 1 }).show() } if (f.fn.bgiframe) { j.bgiframe() } if (H.delayedClose > 0) { R = setTimeout(E, H.delayedClose) } H.onShow.call(t, j, i) }; var X = function (ab) { S = false; b.hide(); if (!H.sticky || (/click|toggle/).test(H.activation)) { E(); clearTimeout(R) } if (H.hoverClass) { w.removeClass(H.hoverClass) } }; var E = function () { h.parent().hide().removeClass(); H.onHide.call(t, j, i); w.removeClass("cluetip-clicked"); if (I) { w.attr(H.titleAttribute, I) } w.css("cursor", ""); if (H.arrows) { g.css({ top: "" }) } }; f(document).bind("hideCluetip", function (ab) { E() }); if ((/click|toggle/).test(H.activation)) { w.bind("click.cluetip", function (ab) { if (j.is(":hidden") || !w.is(".cluetip-clicked")) { x(ab); f(".cluetip-clicked").removeClass("cluetip-clicked"); w.addClass("cluetip-clicked") } else { X(ab) } this.blur(); return false }) } else { if (H.activation == "focus") { w.bind("focus.cluetip", function (ab) { x(ab) }); w.bind("blur.cluetip", function (ab) { X(ab) }) } else { w[H.clickThrough ? "unbind" : "bind"]("click", Y); var q = function (ab) { if (H.tracking == true) { var ad = M - ab.pageX; var ac = Z ? Z - ab.pageY : L - ab.pageY; w.bind("mousemove.cluetip", function (ae) { j.css({ left: ae.pageX + ad, top: ae.pageY + ac }) }) } }; if (f.fn.hoverIntent && H.hoverIntent) { w.hoverIntent({ sensitivity: H.hoverIntent.sensitivity, interval: H.hoverIntent.interval, over: function (ab) { x(ab); q(ab) }, timeout: H.hoverIntent.timeout, out: function (ab) { X(ab); w.unbind("mousemove.cluetip") } }) } else { w.bind("mouseenter.cluetip", function (ab) { x(ab); q(ab) }).bind("mouseleave.cluetip", function (ab) { X(ab); w.unbind("mousemove.cluetip") }) } w.bind("mouseenter.cluetip", function (ab) { w.attr("title", "") }).bind("mouseleave.cluetip", function (ab) { w.attr("title", w.data("thisInfo").title) }) } } }) }; f.fn.cluetip.defaults = { width: 275, height: "auto", cluezIndex: 97, positionBy: "auto", topOffset: 15, leftOffset: 15, local: false, localPrefix: null, hideLocal: true, attribute: "rel", titleAttribute: "title", splitTitle: "", escapeTitle: false, showTitle: true, cluetipClass: "default", hoverClass: "", waitImage: true, cursor: "help", arrows: false, dropShadow: true, dropShadowSteps: 6, sticky: false, mouseOutClose: false, activation: "hover", clickThrough: false, tracking: false, delayedClose: 0, closePosition: "top", closeText: "Close", truncate: 0, fx: { open: "show", openSpeed: "" }, hoverIntent: { sensitivity: 3, interval: 50, timeout: 0 }, onActivate: function (l) { return true }, onShow: function (m, l) { }, onHide: function (m, l) { }, ajaxCache: true, ajaxProcess: function (l) { l = l.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, "").replace(/<(link|meta)[^>]+>/g, ""); return l }, ajaxSettings: { dataType: "html" }, debug: false }; var c = "appendTo", a = "body"; f.cluetip.setup = function (l) { if (l && l.insertionType && (l.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) { c = l.insertionType } if (l && l.insertionElement) { a = l.insertionElement } } })(jQuery); jQuery.cookie = function (b, j, m) { if (typeof j != "undefined") { m = m || {}; if (j === null) { j = ""; m.expires = -1 } var e = ""; if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) { var f; if (typeof m.expires == "number") { f = new Date(); f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000)) } else { f = m.expires } e = "; expires=" + f.toUTCString() } var l = m.path ? "; path=" + (m.path) : ""; var g = m.domain ? "; domain=" + (m.domain) : ""; var a = m.secure ? "; secure" : ""; document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("") } else { var d = null; if (document.cookie && document.cookie != "") { var k = document.cookie.split(";"); for (var h = 0; h < k.length; h++) { var c = jQuery.trim(k[h]); if (c.substring(0, b.length + 1) == (b + "=")) { d = decodeURIComponent(c.substring(b.length + 1)); break } } } return d } }; jQuery(document).ready(function () { jQuery("a.title").cluetip({ splitTitle: "|", clickThrough: true, arrows: true, showTitle: false }); jQuery("span.tooltip").cluetip({ splitTitle: "|", clickThrough: true, arrows: true, showTitle: false }); jQuery("a.jt").cluetip({ cluezIndex: 3000, cluetipClass: "jtip", arrows: true, dropShadow: true, sticky: false, mouseOutClose: true, showTitle: false, hoverIntent: { sensitivity: 1, interval: 500, timeout: 0} }); $("a.popup").cluetip({ cluetipClass: "popup", sticky: true, waitImage: false, dropShadow: false, showTitle: false, activation: "click", width: 730 }); jQuery("#cluetip").bgiframe() }); (function ($) { var reEscape = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].join("|\\") + ")", "g"); function fnFormatResult(value, data, currentValue) { var pattern = "(" + currentValue.replace(reEscape, "\\$1") + ")"; return value.replace(new RegExp(pattern, "gi"), "<strong>$1</strong>") } function Autocomplete(el, options) { this.el = $(el); this.el.attr("autocomplete", "off"); this.suggestions = []; this.data = []; this.badQueries = []; this.selectedIndex = -1; this.currentValue = this.el.val(); this.intervalId = 0; this.cachedResponse = []; this.onChangeInterval = null; this.ignoreValueChange = false; this.serviceUrl = options.serviceUrl; this.isLocal = false; this.options = { autoSubmit: false, minChars: 1, maxHeight: 300, deferRequestBy: 0, width: 0, highlight: true, params: {}, fnFormatResult: fnFormatResult, delimiter: null, zIndex: 9999 }; this.initialize(); this.setOptions(options) } $.fn.autocomplete = function (options) { return new Autocomplete(this.get(0), options) }; Autocomplete.prototype = { killerFn: null, initialize: function () { var me, uid, autocompleteElId; me = this; uid = new Date().getTime(); autocompleteElId = "Autocomplete_" + uid; this.killerFn = function (e) { if ($(e.target).parents(".autocomplete").size() === 0) { me.killSuggestions(); me.disableKillerFn() } }; if (!this.options.width) { this.options.width = this.el.width() } this.mainContainerId = "AutocompleteContainter_" + uid; $('<div id="' + this.mainContainerId + '" style="position:absolute;z-index:9999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + autocompleteElId + '" style="display:none; width:300px;"></div></div></div>').appendTo("body"); this.container = $("#" + autocompleteElId); this.fixPosition(); if (window.opera) { this.el.keypress(function (e) { me.onKeyPress(e) }) } else { this.el.keydown(function (e) { me.onKeyPress(e) }) } this.el.keyup(function (e) { me.onKeyUp(e) }); this.el.blur(function () { me.enableKillerFn() }); this.el.focus(function () { me.fixPosition() }) }, setOptions: function (options) { var o = this.options; $.extend(o, options); if (o.lookup) { this.isLocal = true; if ($.isArray(o.lookup)) { o.lookup = { suggestions: o.lookup, data: []} } } $("#" + this.mainContainerId).css({ zIndex: o.zIndex }); this.container.css({ maxHeight: o.maxHeight + "px", width: o.width }) }, clearCache: function () { this.cachedResponse = []; this.badQueries = [] }, disable: function () { this.disabled = true }, enable: function () { this.disabled = false }, fixPosition: function () { var offset = this.el.offset(); $("#" + this.mainContainerId).css({ top: (offset.top + this.el.innerHeight()) + "px", left: offset.left + "px" }) }, enableKillerFn: function () { var me = this; $(document).bind("click", me.killerFn) }, disableKillerFn: function () { var me = this; $(document).unbind("click", me.killerFn) }, killSuggestions: function () { var me = this; this.stopKillSuggestions(); this.intervalId = window.setInterval(function () { me.hide(); me.stopKillSuggestions() }, 300) }, stopKillSuggestions: function () { window.clearInterval(this.intervalId) }, onKeyPress: function (e) { if (this.disabled || !this.enabled) { return } switch (e.keyCode) { case 27: this.el.val(this.currentValue); this.hide(); break; case 9: case 13: if (this.selectedIndex === -1) { this.hide(); return } this.select(this.selectedIndex); if (e.keyCode === 9) { return } break; case 38: this.moveUp(); break; case 40: this.moveDown(); break; default: return } e.stopImmediatePropagation(); e.preventDefault() }, onKeyUp: function (e) { if (this.disabled) { return } switch (e.keyCode) { case 38: case 40: return } clearInterval(this.onChangeInterval); if (this.currentValue !== this.el.val()) { if (this.options.deferRequestBy > 0) { var me = this; this.onChangeInterval = setInterval(function () { me.onValueChange() }, this.options.deferRequestBy) } else { this.onValueChange() } } }, onValueChange: function () { clearInterval(this.onChangeInterval); this.currentValue = this.el.val(); var q = this.getQuery(this.currentValue); this.selectedIndex = -1; if (this.ignoreValueChange) { this.ignoreValueChange = false; return } if (q === "" || q.length < this.options.minChars) { this.hide() } else { this.getSuggestions(q) } }, getQuery: function (val) { var d, arr; d = this.options.delimiter; if (!d) { return $.trim(val) } arr = val.split(d); return $.trim(arr[arr.length - 1]) }, getSuggestionsLocal: function (q) { var ret, arr, len, val, i; arr = this.options.lookup; len = arr.suggestions.length; ret = { suggestions: [], data: [] }; q = q.toLowerCase(); for (i = 0; i < len; i++) { val = arr.suggestions[i]; if (val.toLowerCase().indexOf(q) === 0) { ret.suggestions.push(val); ret.data.push(arr.data[i]) } } return ret }, getSuggestions: function (q) { var cr, me; cr = this.isLocal ? this.getSuggestionsLocal(q) : this.cachedResponse[q]; if (cr && $.isArray(cr.suggestions)) { this.suggestions = cr.suggestions; this.data = cr.data; this.suggest() } else { if (!this.isBadQuery(q)) { me = this; me.options.params.query = q; $.get(this.serviceUrl, me.options.params, function (txt) { me.processResponse(txt) }, "text") } } }, isBadQuery: function (q) { var i = this.badQueries.length; while (i--) { if (q.indexOf(this.badQueries[i]) === 0) { return true } } return false }, hide: function () { this.enabled = false; this.selectedIndex = -1; this.container.hide() }, suggest: function () { if (this.suggestions.length === 0) { this.hide(); return } var me, len, div, f, v, i, s, mOver, mClick; me = this; len = this.suggestions.length; f = this.options.fnFormatResult; v = this.getQuery(this.currentValue); mOver = function (xi) { return function () { me.activate(xi) } }; mClick = function (xi) { return function () { me.select(xi) } }; this.container.hide().empty(); for (i = 0; i < len; i++) { s = this.suggestions[i]; div = $((me.selectedIndex === i ? '<div class="selected"' : "<div") + ' title="' + s + '">' + f(s, this.data[i], v) + "</div>"); div.mouseover(mOver(i)); div.click(mClick(i)); this.container.append(div) } this.enabled = true; this.container.show() }, processResponse: function (text) { var response; try { response = eval("(" + text + ")") } catch (err) { return } if (!$.isArray(response.data)) { response.data = [] } this.cachedResponse[response.query] = response; if (response.suggestions.length === 0) { this.badQueries.push(response.query) } if (response.query === this.getQuery(this.currentValue)) { this.suggestions = response.suggestions; this.data = response.data; this.suggest() } }, activate: function (index) { var divs, activeItem; divs = this.container.children(); if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) { $(divs.get(this.selectedIndex)).attr("class", "") } this.selectedIndex = index; if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) { activeItem = divs.get(this.selectedIndex); $(activeItem).attr("class", "selected") } return activeItem }, deactivate: function (div, index) { div.className = ""; if (this.selectedIndex === index) { this.selectedIndex = -1 } }, select: function (i) { var selectedValue, f; selectedValue = this.suggestions[i]; if (selectedValue) { this.el.val(selectedValue); if (this.options.autoSubmit) { f = this.el.parents("form"); if (f.length > 0) { f.get(0).submit() } } this.ignoreValueChange = true; this.hide(); this.onSelect(i) } }, moveUp: function () { if (this.selectedIndex === -1) { return } if (this.selectedIndex === 0) { this.container.children().get(0).className = ""; this.selectedIndex = -1; this.el.val(this.currentValue); return } this.adjustScroll(this.selectedIndex - 1) }, moveDown: function () { if (this.selectedIndex === (this.suggestions.length - 1)) { return } this.adjustScroll(this.selectedIndex + 1) }, adjustScroll: function (i) { var activeItem, offsetTop, upperBound, lowerBound; activeItem = this.activate(i); offsetTop = activeItem.offsetTop; upperBound = this.container.scrollTop(); lowerBound = upperBound + this.options.maxHeight - 25; if (offsetTop < upperBound) { this.container.scrollTop(offsetTop) } else { if (offsetTop > lowerBound) { this.container.scrollTop(offsetTop - this.options.maxHeight + 25) } } }, onSelect: function (i) { var me, onSelect, getValue, s, d; me = this; onSelect = me.options.onSelect; getValue = function (value) { var del, currVal, arr; del = me.options.delimiter; if (!del) { return value } currVal = me.currentValue; arr = currVal.split(del); if (arr.length === 1) { return value } return currVal.substr(0, currVal.length - arr[arr.length - 1].length) + value }; s = me.suggestions[i]; d = me.data[i]; me.el.val(getValue(s)); if ($.isFunction(onSelect)) { onSelect(s, d) } } } } (jQuery)); $(document).ready(function () { $("body.about table.rs-tbl").css("display", "none"); $("ul.rs-ul a.title").click(function () { $(this).toggleClass("open"); $(this).next("table").toggle() }); $("#prLst").css("display", "block"); $("#pr10").css("display", "none"); $("#pr09").css("display", "none"); $("#prLst a").click(function () { var b = "#pr" + $(this).attr("id").substring(1); $("ul.prLnks").hide(); $(b).show(); $("#prLst li").removeClass("act"); $(this).parent().addClass("act") }); $("div.titleDiv").click(function () { $(this).toggleClass("panelOpen"); $(this).next("div.contentDiv").toggle("medium") }); $("#signinLnk p a").click(function () { $("p.rtnMsg").fadeOut("slow"); $("a.closeX").fadeIn("slow"); $("div.login-box").slideToggle(); return false }); $("a.closeX").click(function () { $("#signinLnk p.error").css("display", "none"); $("a.closeX").fadeOut("slow"); $("p.rtnMsg").fadeIn("slow"); $("div.login-box").slideToggle(); return false }); $("#forgotLnk").click(function () { $("div.forgot-box").slideToggle(); return false }); $("#loginBtn").click(function () { var b = $("#uname").val(); var c = $("#pword").val(); $.getJSON("/api/Login.ashx?u=" + b + "&p=" + c, function (d) { if (d.status === "1" || d.status === "0") { hideAll(); $("#logSuccMsg").slideToggle(); $("div.alert").slideToggle(); $("#uname").val(""); $("#pword").val(""); var e = d.firstname; if (e.length > 0) { if (e.length < 10) { var f = '<span class="greeting">Welcome back, ' + e + "!</span>&nbsp;" } else { var f = '<span class="greeting">Welcome back!</span>&nbsp;' } $("#login a:first").attr("href", "/login.aspx?SignOut=1"); $("#login a:first").html("Sign Out"); $(".greeting").remove(); $("#login").prepend(f) } $("#txtFirstName").val(d.firstname); $("#txtLastName").val(d.lastname); $("#txtEmail").val(d.email); $("#txtEmailAlt").val(d.email_alt); $("#txtPhone").val(d.phone); $("#ddlWhoAmI").val(d.whoami); $("#txtCompany").val(d.company) } else { if (d.status === "-1") { hideAll(); $("#invalidClientMsg").css("display", "block"); $("#uname").val(""); $("#pword").val(""); $("#uname").focus() } } }); return false }); $("#forgotBtn").click(function () { if ($("#forgotTB").val() === "") { hideAll(); $("#pwError1").css("display", "block") } else { var b = $("#forgotTB").val(); $.getJSON("/api/Login.ashx?em=" + encodeURI(b), function (c) { if (c.status === "0") { $("strong.em").html(c.email); hideAll(); $("#pwordSuccMsg").css("display", "block"); $("#forgotTB").val(""); $("div.forgot-box").slideToggle() } else { if (c.status === "-1") { $("strong.em").html(c.email); hideAll(); $("#pwError2").css("display", "block"); $("#forgotTB").val(""); $("#forgotTB").focus() } else { if (c.status === "-2") { hideAll(); $("#pwordErrMsg").css("display", "block"); $("#forgotTB").val(""); $("#forgotTB").focus() } } } }) } return false }); $("a.subNav").click(function () { $(this).next("ul").slideToggle("slow"); return false }); $("#helpNav ul").css("display", "none"); $(".topicContent dd").css("display", "none"); $(".topicContent dt").click(function () { $(this).toggleClass("open"); $(this).next("dd").slideToggle() }); var a = document.location.href; if (a.indexOf("topics.aspx") > 0) { $("a.subNav strong").parent().next("ul").css("display", "block") } }); function twitterCallback2(c) { var a = []; for (var d = 0; d < c.length; d++) { var e = c[d].user.screen_name; var b = c[d].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (f) { return '<a href="' + f + '">' + f + "</a>" }).replace(/\B@([_a-z0-9]+)/ig, function (f) { return f.charAt(0) + '<a href="http://twitter.com/' + f.substring(1) + '">' + f.substring(1) + "</a>" }); a.push("<li>" + b + "<span>" + relative_time(c[d].created_at) + "</span></li>") } document.getElementById("twitter_update_list").innerHTML = a.join("") } function relative_time(c) { var b = c.split(" "); c = b[1] + " " + b[2] + ", " + b[5] + " " + b[3]; var a = Date.parse(c); var d = (arguments.length > 1) ? arguments[1] : new Date(); var e = parseInt((d.getTime() - a) / 1000); e = e + (d.getTimezoneOffset() * 60); if (e < 60) { return "less than a minute ago" } else { if (e < 120) { return "about a minute ago" } else { if (e < (60 * 60)) { return (parseInt(e / 60)).toString() + " minutes ago" } else { if (e < (120 * 60)) { return "about an hour ago" } else { if (e < (24 * 60 * 60)) { return "about " + (parseInt(e / 3600)).toString() + " hours ago" } else { if (e < (48 * 60 * 60)) { return "1 day ago" } else { return (parseInt(e / 86400)).toString() + " days ago" } } } } } } } function chkPWLength() { var a = document.getElementById("pw").value; if (a.length < 5) { alert("Your password must contain at least 5 characters."); return false } else { return true } } function hideAll() { $("#logSuccMsg,#pwordSuccMsg,#pwordErrMsg,#invalidClientMsg,#pwError1,#pwError2").css("display", "none") } function ShowGigrequestSubmissionSpinner() { var a = 0, b = ["Submitting request...", "Doo wa diddy diddy dum diddy doo...we're submitting your request now. Thanks for singing along.", "Finalizing request..."]; $("#allContent").fadeOut(300); $("#ajaxLoaderGraphic").show(); $("#spnSpinnerMessageText").text(b[a]); setInterval(function () { if (a < b.length - 1) { a += 1 } $("#spnSpinnerMessageText").text(b[a]) }, 5000) };