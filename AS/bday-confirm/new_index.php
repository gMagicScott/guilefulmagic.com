<?php
/*
	Amazing System Confirmation Files
*/

$company='Guileful Magic: The Magic of Scott Lesovic'; //Your Company Name goes here.
$thanks='http://YOUR-DOMAIN.COM/AS/birthday/thanks.php'; //Change the URL to your thank-you page
$merchant='YOUR-MERCHANT-ID'; //Your 1Shop Merchant ID
$autoresp='YOUR-AUTORESPONDER-ID'; //Your Autoresponder ID
$copystart='2005'; //First year of your company copyright



/*
	DO NOT EDIT BELOW THIS LINE
*/
$name=$_GET['name'];
$email1=$_GET['email1'];
$field9=$_GET['field9'];
$auto=$_GET['auto'];

?>
<!DOCTYPE html>
<html lang="en-US">	
	<head>		
		<meta charset="utf-8">
		<title>Confirm your event!</title>
		<link rel="stylesheet" href="styles/style.css" />
		<!--[if IE 6]>
            <link rel="stylesheet" href="styles/ie6.css" />
        <![endif]--> 
        <!--[if IE 7]>
            <link rel="stylesheet" href="styles/ie7.css" />
        <![endif]-->
	</head>
	<body>	
		<div id="wrap">
        	<div id="header">
        		<h1><?php echo $company ?></h1></a>
        		<h2>Event Confirmation</h2>           	
            </div><!--end header-->
            <div id="frontpage-content">      
    			<div id="frontpage-intro">    	
    				<p>If everything is correct in the email we sent you, please press the &quot;confirm&quot; button below.</p>
					<form name="form1" id="form1" method="post" action="http://www.mcssl.com/app/contactsave.asp" />
					<input name="merchantid" type="hidden" id="merchantid" value="<?php echo $merchant ?>" />
					<input name="ARThankyouURL" type="hidden" id="ARThankyouURL" value="<?php echo $thanks ?>" />
					<input name="copyarresponse" type="hidden" id="copyarresponse" value="0" />
					<?php if (isset($_GET['name'])) {echo'<input name="Name" type="hidden" id="custom" value="'; } ?><?php echo $name ?><?php if (isset($_GET['name'])) { echo'" />
					'; } ?><?php if (isset($_GET['field9'])) {echo'<input name="field9" type="hidden" id="custom" value="'; } ?><?php echo $field9 ?><?php if (isset($_GET['field9'])) { echo'" />
					'; } ?><input name="defaultar" type="hidden" id="defaultar" value="<?php echo $autoresp ?>" />
					<input name="visiblefields" type="hidden" id="visiblefields" value="Email1" />
					<input name="requiredfields" type="hidden" id="requiredfields" value="Email1" />
					<div id="the-form">
						<label for="email1">Email Address:</label>
						<input name="Email1" id="email1" value="<?php echo $email1 ?>" type="text" size="31" />
						<input type="submit" name="cmdSubmit" value="CONFIRM!" class="button" />
					</div>
					</form>
    			</div><!--end frontpage-info-->    	
    		</div><!--end frontpage-content--> 
    		<div id="footer">
				<p class="copyright">Copyright &copy; <?php echo $copystart; echo '-'; echo date('Y') ?> &middot; <?php echo $company ?> &middot; All Rights Reserved</p>
			</div><!--end footer-->
    	</div><!--end wrap-->	
		<?php if ($auto !== 'yes') echo "<!--" ?>
		<script type="text/javascript">document.getElementById("form1").submit();</script>
		<?php if ($auto !== 'yes') echo "-->" ?>
	</body>	
</html>