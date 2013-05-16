(function(){

	// the minimum version of jQuery we want
	var v = "1.3.2";

	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}
	
	function initMyBookmarklet() {
		(window.myBookmarklet = function() {
			// your JavaScript code goes here!
			function trim(s) {s = s.replace(/(^\s*)|(\s*$)/gi,'');s = s.replace(/[ ]{2,}/gi,' ');return s;};
			var content = document.getElementsByTagName ('dd');
			var clientName = trim(content[0].innerHTML);
			var clientEmail = trim(content[2].innerHTML);
			// alert("The Client is " + clientName);
			window.open('https://www.davidfarr.com/home/add_client.html','addClientWindow','status=no,directories=no,location=no,resizable=no,menubar=no,width=400,height=210,toolbar=no');
			addClientWindow.focus();
				var script = document.createElement("script");
				script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
				document.getElementsByTagName("head")[0].appendChild(script);
			$("input[name|='Name']").val(clientName);
		})();
	}

})();