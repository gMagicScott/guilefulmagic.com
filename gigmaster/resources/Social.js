/*
 * Initiate Facebook API connection
 */
var fbStatus;
window.fbAsyncInit = function() {
	FB.init({
		appId   : '168482986801',
		status  : true,
		cookie  : true,
		xfbml   : true,
		oauth   : true
	});
};
(function(d){
	var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	d.getElementsByTagName('head')[0].appendChild(js);
}(document));

/*
 * Publish to Facebook
 */
function publishToFacebook(methodType, pictureUrl, linkUrl, linkText, descriptionText, actionsObject) {
	FB.login(function(response) {
		if (response.authResponse) {
			var obj = {
				method: methodType,
				picture: pictureUrl,
				link: linkUrl,
				name: linkText,
				description: descriptionText,
				actions: actionsObject
			};
			FB.ui(obj);
		}
	}, {scope: 'publish_stream'});
}

/*
 * Shortens a performer's profile URL using the bitly API, then updates the link before it is called
 */
function shortenURL(dir1, dir2, anchor, twitter) {
	oldLink = 'http://' + window.location.hostname + '/' + dir1 + '/' + dir2 + '/';
	$.ajax({ // shorten link using bit.ly
		url: "https://api-ssl.bitly.com/v3/shorten",
		data: "login=gigmasters&apiKey=R_5263cc0a2c55b1991e2d60e8030449fc&longUrl=" + encodeURIComponent(oldLink),
		dataType: "jsonp",
		success: function(result) {
			if (twitter) {
				updateLink(result.data.url, anchor, true);
			}
			else {
				updateLink(result.data.url, null, false);
			}
		}
	})
}
function updateLink(bitlyLink, anchor, twitter) {
	newLink = bitlyLink;
	if (twitter) {
		popupBrowser(anchor.href + newLink, 600, 400);
	}
}