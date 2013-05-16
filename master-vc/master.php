<?php
/**
 * Master PHP file
 *
 * The settings you need to modify start at line #18
 *
 */


// ** Is your server's PHP good enough? ** //
 if (version_compare(PHP_VERSION, '4.3') < 0) {
    echo 'You need at least PHP version 4.3 on your server to use this file. You have: ' . PHP_VERSION . "\n";
	echo 'Contact your web hosting company to see about upgrading your PHP.';
	die();	// If not, we stop here
}
/* Your server's PHP is good, lets continue on... */

/**
 * Let's work on some of the settings that will make this work for you
 */

$domain = array(
			1	=>	'http://example.com/',	// put your primary website domain here between the ' marks. Keep the / at the end
			2	=>	'http://www.guilefulmagic.com/',	// your secondary website, same rules as primary, delete this line if you don't need it
			3	=>	'', // you can keep going as long as you need, the next would be 4 => '',
		);
$mergecode = array(
	//		'this-is in the url'	=>	'this is the merge code in the html';
			'name'		=>	'%name%',			// name should be clients full name. This PHP will create %firstname% and %lastname% for you.
			'email'		=>	'%email%',
			'company'	=>	'%company%',
			'homephone'	=>	'%homephone%',
			'workphone'	=>	'%workphone%',
			'address1'	=>	'%address1%',
			'address2'	=>	'%address2%',
			'city'		=>	'%city%',
			'state'		=>	'%state%',
			'zip'		=>	'%zip%',
			'country'	=>	'%country%',
			'fax'		=>	'%fax%',
			'field01'	=>	'%field01%',
			'field02'	=>	'%field02%',
			'field03'	=>	'%field03%',
			'field04'	=>	'%field04%',
			'field05'	=>	'%field05%',
			'field06'	=>	'%field06%',
			'field07'	=>	'%field07%',
			'field08'	=>	'%field08%',
			'field09'	=>	'%field09%',
			'field10'	=>	'%field10%',
		);
/* if you don't want us to set up %firstname%
 * and %lastname% fields, change this to 'false'
 */
define('SPLIT_NAME', true);

/* if you don't want us to set up %today%
 * and %today+x% fields, change this to 'false'
 */
define('SET_TODAY', true);

// ** That's all the settings we need. ** //

/**
 * Required $_GET elements
 *
 *	l - a number that defines what domain the template is on
 *	f -	the path and filename of the template
 *	
 * Optional (not field related) $_GET elements
 *	fm - the form name, defaults to form1, works with -auto- element
 *	auto - if you are moving to an auto-submitting background form, default='no'
 */
 
if (isset($_GET[l]) and is_numeric($_GET[l])) {
	$l = $_GET[l];
	unset($_GET[l]);
} else {
	echo 'l is not a number';
	die();
};

if (isset($domain[$l])) {
	$l = $domain[$l];
} else {
	echo 'Domain ' . $l . ' is not set.';
	die();
};

if (isset($_GET[f])) {
	$l = $l . $_GET[f];
	unset($_GET[f]);
} else {
	echo 'You did not select a file';
	die();
};

/* Check if cURL is available, use to check if html template exists. Else, hope for the best. */
if (function_exists('curl_init')) {
	function http_response($url, $status = null, $wait = 3) 
	{ 
			$time = microtime(true); 
			$expire = $time + $wait; 
			$ch = curl_init(); 
			curl_setopt($ch, CURLOPT_URL, $url); 
			curl_setopt($ch, CURLOPT_HEADER, TRUE); 
			curl_setopt($ch, CURLOPT_NOBODY, TRUE); // remove body 
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
			$head = curl_exec($ch); 
			$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); 
			curl_close($ch); 
			
			if(!$head) 
			{ 
				return FALSE; 
			} 
			
			if($status === null) 
			{ 
				if($httpCode < 400) 
				{ 
					return TRUE; 
				} 
				else 
				{ 
					return FALSE; 
				} 
			} 
			elseif($status == $httpCode) 
			{ 
				return TRUE; 
			} 
			
			return FALSE; 
		}  
		 
};
if (function_exists('http_response')) {
	if (http_response($l, '200')) {
		$showpage=file_get_contents($l);
	} else {
		echo 'Template file not available: ' . $l;
		die();
	};
} else {
	$showpage=file_get_contents($l); // We don't know if the template is there, but we'll hope for the best.
};


function merge_in_today($contents) {
	$today = date("m/d/Y");
	$contents = str_replace('%today%', $today, $contents);
	preg_match_all('/%today\+([0-9]+)%/', $contents, $matches, PREG_SET_ORDER);
	foreach ($matches as $val) {
		$nextdate  = date("m/d/Y", mktime(0, 0, 0, date("m")  , date("d")+ $val[1], date("Y")));
		$contents=str_replace($val[0], $nextdate, $contents);
	};
	return $contents;
}

if ( SET_TODAY === true ) { // will substitute %today% and %today+x% into template. These are dynamic dates.
	$showpage = merge_in_today($showpage);
};

if ( SPLIT_NAME === true ) {
	if ( isset ( $_GET['name'] ) ) {
		$splitname = explode(" ", $_GET['name'], 2);
		$showpage=str_replace('%firstname%',$splitname[0],$showpage);
		$showpage=str_replace('%lastname%',$splitname[1],$showpage);
	};
};

if ( isset($_GET['auto']) && ( $_GET['auto'] === 'yes' ) ) {
	if ( isset($_GET['fm']) ) {
		$form_name = $_GET['fm'];
	} else {
		$form_name = 'form1';
	};
	$autojs = '<script type="text/javascript">document.getElementById("' . $form_name . '").submit();</script>';
	$bodyReplace = $autojs . '</body>';
	$showpage=str_replace('</body>',$bodyReplace,$showpage);
};

foreach ( $mergecode as $k => $v ) {
	if ( isset($_GET[$k]) ) {
		$showpage=str_replace($v,htmlspecialchars($_GET[$k]),$showpage);
	};
};


echo $showpage;
exit();









//set the URL location of the page you want to call
$loc = isset($_GET['l']) ? $_GET['l'] : false;
if($loc == '1') {
	$loc = "http://YOURFIRSTSITE.com/";
} else if($loc == '2') {
	$loc = "http://YOURSECONDSITE.com/";
} else if($loc == '3') {
	$loc = "http://YOURTHIRDSITE.com/";
}
//this sets the file and form names 
$file = isset($_GET['f']) ? $_GET['f'] : false;

$formName = isset($_GET['fm']) ? $_GET['fm'] : false;

// substitute name field, email field, auto setting, which form
$subclient_referrer="";
$subafid="";
$subafusername="";
$subafpassword="";
$subuserlogin="";
$auto="no";
$autocode="";
$form="large";

// string variable $showpage will be the web page served
$showpage="";

function getAutoResp($location, $html_file, $form_name) {

// Check the input, if any of these are empty, you might want to exit with an error message
// empty is the else condition, would look like
/*
		if(isset($_GET['auto'])){
		  $auto=$_GET['auto'];
		} else {
		  exit('some error message here');
		}
*/

if(isset($_GET)){
foreach($_GET as &$v){
$v=str_replace("\\","",$v);
}
}

if(isset($_GET)){
if(isset($_GET['auto'])){
$auto=$_GET['auto'];

}
if(isset($_GET['name'])){
$subname=$_GET['name'];

}
if(isset($_GET['firstname'])){
$subfirstname=$_GET['firstname'];

}
if(isset($_GET['lastname'])){
$sublastname=$_GET['lastname'];

}
if(isset($_GET['email'])){
$subemail=$_GET['email'];

}
if(isset($_GET['company'])){
$subcompany=$_GET['company'];

}
if(isset($_GET['workphone'])){
$subworkphone=$_GET['workphone'];

}
if(isset($_GET['homephone'])){
$subhomephone=$_GET['homephone'];

}
if(isset($_GET['address1'])){
$subaddress1=$_GET['address1'];

}
if(isset($_GET['address2'])){
$subaddress2=$_GET['address2'];

}
if(isset($_GET['city'])){
$subcity=$_GET['city'];

}
if(isset($_GET['state'])){
$substate=$_GET['state'];

}
if(isset($_GET['zip'])){
$subzip=$_GET['zip'];

}
if(isset($_GET['country'])){
$subcountry=$_GET['country'];

}
if(isset($_GET['fax'])){
$subfax=$_GET['fax'];

}

if(isset($_GET['today'])){
$subtoday=$_GET['today'];

}
//if(isset($_GET['today+x'])){
//$subtoday+x=$_GET['today+x'];
//
//}
if(isset($_GET['tomorrow'])){
$subtomorrow=$_GET['tomorrow'];

}
if(isset($_GET['merchantname'])){
$submerchantname=$_GET['merchantname'];

}
if(isset($_GET['merchanturl'])){
$submerchanturl=$_GET['merchanturl'];

}
if(isset($_GET['merchantemail'])){
$submerchantemail=$_GET['merchantemail'];

}
if(isset($_GET['merchantcompany'])){
$submerchantcompany=$_GET['merchantcompany'];

}
if(isset($_GET['merchantworkphone'])){
$submerchantworkphone=$_GET['merchantworkphone'];

}
if(isset($_GET['merchantaddress'])){
$submerchantaddress=$_GET['merchantaddress'];

}
if(isset($_GET['field1'])){
$subfield1=$_GET['field1'];

}
if(isset($_GET['field2'])){
$subfield2=$_GET['field2'];

}
if(isset($_GET['field3'])){
$subfield3=$_GET['field3'];

}
if(isset($_GET['field4'])){
$subfield4=$_GET['field4'];

}
if(isset($_GET['field5'])){
$subfield5=$_GET['field5'];

}
if(isset($_GET['field6'])){
$subfield6=$_GET['field6'];

}
if(isset($_GET['field7'])){
$subfield7=$_GET['field7'];

}
if(isset($_GET['field8'])){
$subfield8=$_GET['field8'];

}
if(isset($_GET['field9'])){
$subfield9=$_GET['field9'];

}
if(isset($_GET['field10'])){
$subfield10=$_GET['field10'];

}
if(isset($_GET['field11'])){
$subfield11=$_GET['field11'];

}
if(isset($_GET['field12'])){
$subfield12=$_GET['field12'];
}
if(isset($_GET['field13'])){
$subfield13=$_GET['field13'];

}
if(isset($_GET['field14'])){
$subfield14=$_GET['field14'];

}
if(isset($_GET['field15'])){
$subfield15=$_GET['field15'];

}
if(isset($_GET['field16'])){
$subfield16=$_GET['field16'];

}
if(isset($_GET['field17'])){
$subfield17=$_GET['field17'];

}
if(isset($_GET['field18'])){
$subfield18=$_GET['field18'];

}
if(isset($_GET['field19'])){
$subfield19=$_GET['field19'];

}
if(isset($_GET['field20'])){
$subfield20=$_GET['field20'];

}
if(isset($_GET['field21'])){
$subfield21=$_GET['field21'];

}
if(isset($_GET['field22'])){
$subfield22=$_GET['field22'];

}
if(isset($_GET['field23'])){
$subfield23=$_GET['field23'];

}
if(isset($_GET['field24'])){
$subfield24=$_GET['field24'];

}
if(isset($_GET['field25'])){
$subfield25=$_GET['field25'];

}
if(isset($_GET['field26'])){
$subfield26=$_GET['field26'];

}
if(isset($_GET['field27'])){
$subfield27=$_GET['field27'];

}
if(isset($_GET['field28'])){
$subfield28=$_GET['field28'];

}
if(isset($_GET['field29'])){
$subfield29=$_GET['field29'];

}
if(isset($_GET['field30'])){
$subfield30=$_GET['field30'];

}
if(isset($_GET['field31'])){
$subfield31=$_GET['field31'];

}
if(isset($_GET['field32'])){
$subfield32=$_GET['field32'];

}
if(isset($_GET['field33'])){
$subfield33=$_GET['field33'];

}
if(isset($_GET['field34'])){
$subfield34=$_GET['field34'];

}
if(isset($_GET['field35'])){
$subfield35=$_GET['field35'];

}
if(isset($_GET['field36'])){
$subfield36=$_GET['field36'];

}
if(isset($_GET['field37'])){
$subfield37=$_GET['field37'];

}
if(isset($_GET['field38'])){
$subfield38=$_GET['field38'];

}
if(isset($_GET['field39'])){
$subfield39=$_GET['field39'];

}
if(isset($_GET['field40'])){
$subfield40=$_GET['field40'];

}
if(isset($_GET['field41'])){
$subfield41=$_GET['field41'];

}
if(isset($_GET['field42'])){
$subfield42=$_GET['field42'];

}
if(isset($_GET['field43'])){
$subfield43=$_GET['field43'];

}
if(isset($_GET['field44'])){
$subfield44=$_GET['field44'];

}
if(isset($_GET['field45'])){
$subfield45=$_GET['field45'];

}
if(isset($_GET['field46'])){
$subfield46=$_GET['field46'];

}
if(isset($_GET['field47'])){
$subfield47=$_GET['field47'];

}
if(isset($_GET['field48'])){
$subfield48=$_GET['field48'];

}
if(isset($_GET['field49'])){
$subfield49=$_GET['field49'];

}
if(isset($_GET['field50'])){
$subfield50=$_GET['field50'];

}
if(isset($_GET['field51'])){
$subfield51=$_GET['field51'];

}
if(isset($_GET['field52'])){
$subfield52=$_GET['field52'];

}
if(isset($_GET['field53'])){
$subfield53=$_GET['field53'];

}
if(isset($_GET['field54'])){
$subfield54=$_GET['field54'];

}
if(isset($_GET['field55'])){
$subfield55=$_GET['field55'];

}
if(isset($_GET['field56'])){
$subfield56=$_GET['field56'];

}
if(isset($_GET['field57'])){
$subfield57=$_GET['field57'];

}
if(isset($_GET['field58'])){
$subfield58=$_GET['field58'];

}
if(isset($_GET['field59'])){
$subfield59=$_GET['field59'];

}
if(isset($_GET['field60'])){
$subfield60=$_GET['field60'];

}
if(isset($_GET['field61'])){
$subfield61=$_GET['field61'];

}
if(isset($_GET['field62'])){
$subfield62=$_GET['field62'];

}
if(isset($_GET['field63'])){
$subfield63=$_GET['field63'];

}
if(isset($_GET['field64'])){
$subfield64=$_GET['field64'];

}
if(isset($_GET['field65'])){
$subfield65=$_GET['field65'];

}
if(isset($_GET['field66'])){
$subfield66=$_GET['field66'];

}
if(isset($_GET['field67'])){
$subfield67=$_GET['field67'];

}
if(isset($_GET['field68'])){
$subfield68=$_GET['field68'];

}
if(isset($_GET['field69'])){
$subfield69=$_GET['field69'];

}
if(isset($_GET['field70'])){
$subfield70=$_GET['field70'];

}
if(isset($_GET['field71'])){
$subfield71=$_GET['field71'];

}
if(isset($_GET['field72'])){
$subfield72=$_GET['field72'];

}
if(isset($_GET['field73'])){
$subfield73=$_GET['field73'];

}
if(isset($_GET['field74'])){
$subfield74=$_GET['field74'];

}
if(isset($_GET['field75'])){
$subfield75=$_GET['field75'];

}
if(isset($_GET['field76'])){
$subfield76=$_GET['field76'];

}
if(isset($_GET['field77'])){
$subfield77=$_GET['field77'];

}
if(isset($_GET['field78'])){
$subfield78=$_GET['field78'];

}
if(isset($_GET['field79'])){
$subfield79=$_GET['field79'];

}
if(isset($_GET['field80'])){
$subfield80=$_GET['field80'];

}
if(isset($_GET['field81'])){
$subfield81=$_GET['field81'];

}
if(isset($_GET['field82'])){
$subfield82=$_GET['field82'];

}
if(isset($_GET['field83'])){
$subfield83=$_GET['field83'];

}
if(isset($_GET['field84'])){
$subfield84=$_GET['field84'];

}
if(isset($_GET['field85'])){
$subfield85=$_GET['field85'];

}
if(isset($_GET['field86'])){
$subfield86=$_GET['field86'];

}
if(isset($_GET['field87'])){
$subfield87=$_GET['field87'];

}
if(isset($_GET['field88'])){
$subfield88=$_GET['field88'];

}
if(isset($_GET['field89'])){
$subfield89=$_GET['field89'];

}
if(isset($_GET['field90'])){
$subfield90=$_GET['field90'];

}
if(isset($_GET['field91'])){
$subfield91=$_GET['field91'];

}
if(isset($_GET['field92'])){
$subfield92=$_GET['field92'];

}
if(isset($_GET['field93'])){
$subfield93=$_GET['field93'];

}
if(isset($_GET['field94'])){
$subfield94=$_GET['field94'];

}
if(isset($_GET['field95'])){
$subfield95=$_GET['field95'];

}
if(isset($_GET['field96'])){
$subfield96=$_GET['field96'];

}
if(isset($_GET['field97'])){
$subfield97=$_GET['field97'];

}
if(isset($_GET['field98'])){
$subfield98=$_GET['field98'];

}
if(isset($_GET['field99'])){
$subfield99=$_GET['field99'];

}
if(isset($_GET['field100'])){
$subfield100=$_GET['field100'];

}
if(isset($_GET['adname'])){
$subadname=$_GET['adname'];

}

if(isset($_GET['optinlink'])){
$suboptinlink=$_GET['optinlink'];

}
if(isset($_GET['signature'])){
$subsignature=$_GET['signature'];

}
if(isset($_GET['optoutlink'])){
$suboptoutlink=$_GET['optoutlink'];

}
if(isset($_GET['customerportalregister'])){
$subcustomerportalregister=$_GET['customerportalregister'];

}
if(isset($_GET['customerportalsignin'])){
$subcustomerportalsignin=$_GET['customerportalsignin'];

}
if(isset($_GET['referrerid'])){
$subreferrerid=$_GET['referrerid'];

}
if(isset($_GET['referrer'])){
$subreferrer=$_GET['referrer'];

}
if(isset($_GET['client_referrer'])){
$subclient_referrer=$_GET['client_referrer'];

}
if(isset($_GET['afid'])){
$subafid=$_GET['afid'];

}
if(isset($_GET['afusername'])){
$subafusername=$_GET['afusername'];

}
if(isset($_GET['afpassword'])){
$subafpassword=$_GET['afpassword'];

}
if(isset($_GET['userlogin'])){
$subuserlogin=$_GET['userlogin'];

}
if(isset($_GET['form'])){
$form=$_GET['form'];

}
}

// $autocode has already been set to "" (nothing) the template variable ---3 needs to come of the 
// web page whether auto is set or not.  
// If auto=yes then $autocode = the javascript to execute the auto submit

if($auto==="yes"){
$autocode='<script type="text/javascript">
document.getElementById("'.$form_name.'").submit();
</script>';
}

// Get the appropriate web page according to input variable

	$showpage=file_get_contents($location.$html_file);

// String substitutions. Note: these items must be unique in the html file
//				All occurances of for instance, ---1, will be replaced
$showpage=str_replace("%name%",$subname,$showpage);
$showpage=str_replace("%firstname%",$subfirstname,$showpage);
$showpage=str_replace("%lastname%",$sublastname,$showpage);
$showpage=str_replace("%email%",$subemail,$showpage);
$showpage=str_replace("%company%",$subcompany,$showpage);
$showpage=str_replace("%workphone%",$subworkphone,$showpage);
$showpage=str_replace("%homephone%",$subhomephone,$showpage);
$showpage=str_replace("%address1%",$subaddress1,$showpage);
$showpage=str_replace("%address2%",$subaddress2,$showpage);
$showpage=str_replace("%city%",$subcity,$showpage);
$showpage=str_replace("%state%",$substate,$showpage);
$showpage=str_replace("%zip%",$subzip,$showpage);
$showpage=str_replace("%country%",$subcountry,$showpage);
$showpage=str_replace("%fax%",$subfax,$showpage);
$showpage=str_replace("%today%",$subtoday,$showpage);
$showpage=str_replace("%today+x%",$subtoday+x,$showpage);
$showpage=str_replace("%tomorrow%",$subtomorrow,$showpage);
$showpage=str_replace("%merchantname%",$submerchantname,$showpage);
$showpage=str_replace("%merchanturl%",$submerchanturl,$showpage);
$showpage=str_replace("%merchantemail%",$submerchantemail,$showpage);
$showpage=str_replace("%merchantcompany%",$submerchantcompany,$showpage);
$showpage=str_replace("%merchantworkphone%",$submerchantworkphone,$showpage);
$showpage=str_replace("%merchantaddress%",$submerchantaddress,$showpage);
$showpage=str_replace("%field1%",$subfield1,$showpage);
$showpage=str_replace("%field2%",$subfield2,$showpage);
$showpage=str_replace("%field3%",$subfield3,$showpage);
$showpage=str_replace("%field4%",$subfield4,$showpage);
$showpage=str_replace("%field5%",$subfield5,$showpage);
$showpage=str_replace("%field6%",$subfield6,$showpage);
$showpage=str_replace("%field7%",$subfield7,$showpage);
$showpage=str_replace("%field8%",$subfield8,$showpage);
$showpage=str_replace("%field9%",$subfield9,$showpage);
$showpage=str_replace("%field10%",$subfield10,$showpage);
$showpage=str_replace("%field11%",$subfield11,$showpage);
$showpage=str_replace("%field12%",$subfield12,$showpage);
$showpage=str_replace("%field13%",$subfield13,$showpage);
$showpage=str_replace("%field14%",$subfield14,$showpage);
$showpage=str_replace("%field15%",$subfield15,$showpage);
$showpage=str_replace("%field16%",$subfield16,$showpage);
$showpage=str_replace("%field17%",$subfield17,$showpage);
$showpage=str_replace("%field18%",$subfield18,$showpage);
$showpage=str_replace("%field19%",$subfield19,$showpage);
$showpage=str_replace("%field20%",$subfield20,$showpage);
$showpage=str_replace("%field21%",$subfield21,$showpage);
$showpage=str_replace("%field22%",$subfield22,$showpage);
$showpage=str_replace("%field23%",$subfield23,$showpage);
$showpage=str_replace("%field24%",$subfield24,$showpage);
$showpage=str_replace("%field25%",$subfield25,$showpage);
$showpage=str_replace("%field26%",$subfield26,$showpage);
$showpage=str_replace("%field27%",$subfield27,$showpage);
$showpage=str_replace("%field28%",$subfield28,$showpage);
$showpage=str_replace("%field29%",$subfield29,$showpage);
$showpage=str_replace("%field30%",$subfield30,$showpage);
$showpage=str_replace("%field31%",$subfield31,$showpage);
$showpage=str_replace("%field32%",$subfield32,$showpage);
$showpage=str_replace("%field33%",$subfield33,$showpage);
$showpage=str_replace("%field34%",$subfield34,$showpage);
$showpage=str_replace("%field35%",$subfield35,$showpage);
$showpage=str_replace("%field36%",$subfield36,$showpage);
$showpage=str_replace("%field37%",$subfield37,$showpage);
$showpage=str_replace("%field38%",$subfield38,$showpage);
$showpage=str_replace("%field39%",$subfield39,$showpage);
$showpage=str_replace("%field40%",$subfield40,$showpage);
$showpage=str_replace("%field41%",$subfield41,$showpage);
$showpage=str_replace("%field42%",$subfield42,$showpage);
$showpage=str_replace("%field43%",$subfield43,$showpage);
$showpage=str_replace("%field44%",$subfield44,$showpage);
$showpage=str_replace("%field45%",$subfield45,$showpage);
$showpage=str_replace("%field46%",$subfield46,$showpage);
$showpage=str_replace("%field47%",$subfield47,$showpage);
$showpage=str_replace("%field48%",$subfield48,$showpage);
$showpage=str_replace("%field49%",$subfield49,$showpage);
$showpage=str_replace("%field50%",$subfield50,$showpage);
$showpage=str_replace("%field51%",$subfield51,$showpage);
$showpage=str_replace("%field52%",$subfield52,$showpage);
$showpage=str_replace("%field53%",$subfield53,$showpage);
$showpage=str_replace("%field54%",$subfield54,$showpage);
$showpage=str_replace("%field55%",$subfield55,$showpage);
$showpage=str_replace("%field56%",$subfield56,$showpage);
$showpage=str_replace("%field57%",$subfield57,$showpage);
$showpage=str_replace("%field58%",$subfield58,$showpage);
$showpage=str_replace("%field59%",$subfield59,$showpage);
$showpage=str_replace("%field60%",$subfield60,$showpage);
$showpage=str_replace("%field61%",$subfield61,$showpage);
$showpage=str_replace("%field62%",$subfield62,$showpage);
$showpage=str_replace("%field63%",$subfield63,$showpage);
$showpage=str_replace("%field64%",$subfield64,$showpage);
$showpage=str_replace("%field65%",$subfield65,$showpage);
$showpage=str_replace("%field66%",$subfield66,$showpage);
$showpage=str_replace("%field67%",$subfield67,$showpage);
$showpage=str_replace("%field68%",$subfield68,$showpage);
$showpage=str_replace("%field69%",$subfield69,$showpage);
$showpage=str_replace("%field70%",$subfield70,$showpage);
$showpage=str_replace("%field71%",$subfield71,$showpage);
$showpage=str_replace("%field72%",$subfield72,$showpage);
$showpage=str_replace("%field73%",$subfield73,$showpage);
$showpage=str_replace("%field74%",$subfield74,$showpage);
$showpage=str_replace("%field75%",$subfield75,$showpage);
$showpage=str_replace("%field76%",$subfield76,$showpage);
$showpage=str_replace("%field77%",$subfield77,$showpage);
$showpage=str_replace("%field78%",$subfield78,$showpage);
$showpage=str_replace("%field79%",$subfield79,$showpage);
$showpage=str_replace("%field80%",$subfield80,$showpage);
$showpage=str_replace("%field81%",$subfield81,$showpage);
$showpage=str_replace("%field82%",$subfield82,$showpage);
$showpage=str_replace("%field83%",$subfield83,$showpage);
$showpage=str_replace("%field84%",$subfield84,$showpage);
$showpage=str_replace("%field85%",$subfield85,$showpage);
$showpage=str_replace("%field86%",$subfield86,$showpage);
$showpage=str_replace("%field87%",$subfield87,$showpage);
$showpage=str_replace("%field88%",$subfield88,$showpage);
$showpage=str_replace("%field89%",$subfield89,$showpage);
$showpage=str_replace("%field90%",$subfield90,$showpage);
$showpage=str_replace("%field91%",$subfield91,$showpage);
$showpage=str_replace("%field92%",$subfield92,$showpage);
$showpage=str_replace("%field93%",$subfield93,$showpage);
$showpage=str_replace("%field94%",$subfield94,$showpage);
$showpage=str_replace("%field95%",$subfield95,$showpage);
$showpage=str_replace("%field96%",$subfield96,$showpage);
$showpage=str_replace("%field97%",$subfield97,$showpage);
$showpage=str_replace("%field98%",$subfield98,$showpage);
$showpage=str_replace("%field99%",$subfield99,$showpage);
$showpage=str_replace("field100%",$subfield100,$showpage);
$showpage=str_replace("%adname%",$subadname,$showpage);
$showpage=str_replace("%optinlink%",$suboptinlink,$showpage);
$showpage=str_replace("%adname%",$subadname,$showpage);
$showpage=str_replace("%signature%",$subsignature,$showpage);
$showpage=str_replace("%optoutlink%",$suboptoutlink,$showpage);
$showpage=str_replace("%customerportalregister%",$subcustomerportalregister,$showpage);
$showpage=str_replace("%customerportalsignin%",$subcustomerportalsignin,$showpage);
$showpage=str_replace("%referrerid%",$subreferrerid,$showpage);
$showpage=str_replace("%referrer%",$subreferrer,$showpage);
$showpage=str_replace("%client_referrer%",$subclient_referrer,$showpage);
$showpage=str_replace("%afid%",$subafid,$showpage);
$showpage=str_replace("%afusername%",$subafusername,$showpage);
$showpage=str_replace("%afpassword%",$subafpassword,$showpage);
$showpage=str_replace("%userlogin%",$subuserlogin,$showpage);

	// Display the modified web page

echo $showpage;
	exit();
}

if($loc !== false && $file !== false && $formName !== false) {
	getAutoResp($loc, $file, $formName);
} else {
	return "Problem sending form";
	exit();
}

?>

