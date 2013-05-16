String.prototype.toTitleCase = function() {
		return this.replace(/([\w&`'‘’"“.@:\/\{\(\[<>_]+-? *)/g, function(match, p1, index, title) {
			if (index > 0 && title.charAt(index - 2) !== ":" &&
				match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1)
				return match.toLowerCase();
			if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1)
				return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
			if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || 
				title.substring(index - 1, index + 1).search(/[\])}]/) > -1)
				return match;
			return match.charAt(0).toUpperCase() + match.substr(1);
		});
	};
	
function MM_CheckFlashVersion(reqVerStr,msg){
  with(navigator){
    var isIE  = (appVersion.indexOf("MSIE") != -1 && userAgent.indexOf("Opera") == -1);
    var isWin = (appVersion.toLowerCase().indexOf("win") != -1);
    if (!isIE || !isWin){  
      var flashVer = -1;
      if (plugins && plugins.length > 0){
        var desc = plugins["Shockwave Flash"] ? plugins["Shockwave Flash"].description : "";
        desc = plugins["Shockwave Flash 2.0"] ? plugins["Shockwave Flash 2.0"].description : desc;
        if (desc == "") flashVer = -1;
        else{
          var descArr = desc.split(" ");
          var tempArrMajor = descArr[2].split(".");
          var verMajor = tempArrMajor[0];
          var tempArrMinor = (descArr[3] != "") ? descArr[3].split("r") : descArr[4].split("r");
          var verMinor = (tempArrMinor[1] > 0) ? tempArrMinor[1] : 0;
          flashVer =  parseFloat(verMajor + "." + verMinor);
        }
      }
      // WebTV has Flash Player 4 or lower -- too low for video
      else if (userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 4.0;

      var verArr = reqVerStr.split(",");
      var reqVer = parseFloat(verArr[0] + "." + verArr[2]);
  
      if (flashVer < reqVer){
        if (confirm(msg))
          window.location = "http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash";
      }
    }
  } 
}

function ToProperCase(s)
{
	
	return s.toTitleCase();

}
	
function CheckPlural(s)
{
  s=s.toLowerCase();
  if(s.indexOf(' and ') > 0 || s.indexOf('&') > 0 || s.indexOf(',')>0)
	{ 	
		return 1;
	}
	else 
	{
		return 0;
	}
}

function ValidateName(f)
{
  s = f.field9.value;
  r = /[0-9]|[\(\)]|-/;
  i = s.search(r);
  if(i > 0)
  {
      selectedItem = f.AR[f.AR.selectedIndex];
      selectedItem.value = "467394";
  }

  return true;

}

function boyorgirl(){
  var bg = document.getElementById('AR').selectedIndex;
  if(bg==0){
    document.getElementById('field8').value="boy";
  }
  if(bg==1){
    document.getElementById('field8').value="girl";
  }
  if(bg==2){
    document.getElementById('field8').value="multi";
  }
 }
